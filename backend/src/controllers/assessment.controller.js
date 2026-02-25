const prisma = require('../config/database');
const nlpService = require('../services/nlp-service');

// Analyze reading from speech recognition
const analyzeReading = async (req, res) => {
  try {
    const { expectedText, recognizedText, duration } = req.body;

    // Validate inputs
    if (!expectedText || !recognizedText) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: expectedText and recognizedText'
      });
    }

    // Call Python NLP service for analysis
    const analysis = await nlpService.analyzeText({
      expectedText,
      recognizedText,
      duration: duration || 0
    });

    // Return analysis results
    res.json({
      success: true,
      message: 'Analysis completed successfully',
      data: {
        wordAccuracy: analysis.metrics.wordAccuracy,
        pronunciation: analysis.metrics.pronunciation,
        readingSpeed: analysis.metrics.readingSpeed,
        fluency: analysis.metrics.fluency,
        comprehension: analysis.metrics.comprehension,
        overallScore: analysis.metrics.overallScore,
        recognizedText: analysis.recognizedText,
        feedback: analysis.feedback,
        suggestions: analysis.suggestions
      }
    });
  } catch (error) {
    console.error('Error analyzing reading:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing reading',
      error: error.message
    });
  }
};

// Submit a new assessment (for students)
const submitAssessment = async (req, res) => {
  try {
    const {
      type,
      wordAccuracy,
      pronunciation,
      readingSpeed,
      fluency,
      comprehension,
      recognizedText,
      feedback,
      suggestions
    } = req.body;

    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const overallScore = (wordAccuracy + pronunciation + readingSpeed + fluency + comprehension) / 5;

    const assessment = await prisma.assessment.create({
      data: {
        studentId: student.id,
        type: type.toUpperCase(),
        wordAccuracy,
        pronunciation,
        readingSpeed,
        fluency,
        comprehension,
        overallScore,
        recognizedText,
        feedback: feedback || [],
        suggestions: suggestions || []
      }
    });

    // Update student stats
    const allAssessments = await prisma.assessment.findMany({
      where: { studentId: student.id }
    });

    const avgScore = allAssessments.reduce((sum, a) => sum + a.overallScore, 0) / allAssessments.length;

    // Determine status based on average score
    let status = 'ON_TRACK';
    if (avgScore >= 85) status = 'EXCELLENT';
    else if (avgScore < 70) status = 'NEEDS_SUPPORT';

    await prisma.student.update({
      where: { id: student.id },
      data: {
        totalTests: { increment: 1 },
        averageScore: Math.round(avgScore),
        status,
        streak: { increment: 1 }
      }
    });

    // Add progress records
    const skills = [
      { skill: 'pronunciation', score: pronunciation },
      { skill: 'fluency', score: fluency },
      { skill: 'wordAccuracy', score: wordAccuracy },
      { skill: 'readingSpeed', score: readingSpeed },
      { skill: 'comprehension', score: comprehension }
    ];

    await prisma.progress.createMany({
      data: skills.map(s => ({
        studentId: student.id,
        skill: s.skill,
        score: s.score
      }))
    });

    // Check for achievements
    await checkAndAwardAchievements(student.id, allAssessments.length + 1, avgScore);

    res.status(201).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting assessment',
      error: error.message
    });
  }
};

// Submit assessment for a child (parent's child)
const submitChildAssessment = async (req, res) => {
  try {
    const { childId } = req.params;
    const {
      type,
      wordAccuracy,
      pronunciation,
      readingSpeed,
      fluency,
      comprehension,
      recognizedText,
      feedback,
      suggestions
    } = req.body;

    const overallScore = (wordAccuracy + pronunciation + readingSpeed + fluency + comprehension) / 5;

    const assessment = await prisma.childAssessment.create({
      data: {
        childId,
        type: type.toUpperCase(),
        wordAccuracy,
        pronunciation,
        readingSpeed,
        fluency,
        comprehension,
        overallScore,
        recognizedText,
        feedback: feedback || [],
        suggestions: suggestions || []
      }
    });

    // Update child stats
    const allAssessments = await prisma.childAssessment.findMany({
      where: { childId }
    });

    const avgScore = allAssessments.reduce((sum, a) => sum + a.overallScore, 0) / allAssessments.length;

    let status = 'ON_TRACK';
    if (avgScore >= 85) status = 'EXCELLENT';
    else if (avgScore < 70) status = 'NEEDS_SUPPORT';

    await prisma.child.update({
      where: { id: childId },
      data: {
        testsCompleted: { increment: 1 },
        averageScore: Math.round(avgScore),
        progress: Math.round(avgScore),
        status,
        lastAssessment: new Date()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting assessment',
      error: error.message
    });
  }
};

// Get assessment by ID
const getAssessmentById = async (req, res) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: req.params.id }
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    res.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment',
      error: error.message
    });
  }
};

// Get all assessments (with filters)
const getAssessments = async (req, res) => {
  try {
    const { type, startDate, endDate, page = 1, limit = 10 } = req.query;

    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const where = { studentId: student.id };
    if (type) where.type = type.toUpperCase();
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [assessments, total] = await Promise.all([
      prisma.assessment.findMany({
        where,
        skip: (page - 1) * limit,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.assessment.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        assessments,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessments',
      error: error.message
    });
  }
};

// Helper function to check and award achievements
async function checkAndAwardAchievements(studentId, totalTests, avgScore) {
  const achievements = [];

  // First test achievement
  if (totalTests === 1) {
    achievements.push({
      studentId,
      name: 'First Steps',
      description: 'Completed your first reading assessment',
      icon: '🎯'
    });
  }

  // 5 tests achievement
  if (totalTests === 5) {
    achievements.push({
      studentId,
      name: 'Getting Started',
      description: 'Completed 5 reading assessments',
      icon: '📚'
    });
  }

  // 10 tests achievement
  if (totalTests === 10) {
    achievements.push({
      studentId,
      name: 'Dedicated Reader',
      description: 'Completed 10 reading assessments',
      icon: '⭐'
    });
  }

  // High score achievement
  if (avgScore >= 90) {
    const existing = await prisma.achievement.findFirst({
      where: { studentId, name: 'Star Performer' }
    });
    if (!existing) {
      achievements.push({
        studentId,
        name: 'Star Performer',
        description: 'Achieved 90% or higher average score',
        icon: '🌟'
      });
    }
  }

  if (achievements.length > 0) {
    await prisma.achievement.createMany({
      data: achievements
    });
  }
}

module.exports = {
  analyzeReading,
  submitAssessment,
  submitChildAssessment,
  getAssessmentById,
  getAssessments
};

