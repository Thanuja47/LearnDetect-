const prisma = require('../config/database');

// Get student dashboard data
const getDashboard = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: { name: true, email: true }
        },
        assessments: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        achievements: true,
        progressRecords: {
          take: 10,
          orderBy: { date: 'desc' }
        }
      }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard',
      error: error.message
    });
  }
};

// Get student profile
const getProfile = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// Update student profile
const updateProfile = async (req, res) => {
  try {
    const { age, grade } = req.body;

    const student = await prisma.student.update({
      where: { userId: req.user.id },
      data: { age, grade }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// Get student's assessments history
const getAssessments = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const assessments = await prisma.assessment.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: assessments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessments',
      error: error.message
    });
  }
};

// Get student progress
const getProgress = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const progress = await prisma.progress.findMany({
      where: { studentId: student.id },
      orderBy: { date: 'desc' }
    });

    // Group by skill
    const skillProgress = {};
    progress.forEach(p => {
      if (!skillProgress[p.skill]) {
        skillProgress[p.skill] = [];
      }
      skillProgress[p.skill].push({
        date: p.date,
        score: p.score
      });
    });

    res.json({
      success: true,
      data: {
        progress,
        skillProgress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
};

// Get achievements
const getAchievements = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const achievements = await prisma.achievement.findMany({
      where: { studentId: student.id },
      orderBy: { earnedAt: 'desc' }
    });

    res.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching achievements',
      error: error.message
    });
  }
};

// Get quick stats
const getQuickStats = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const recentAssessments = await prisma.assessment.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const stats = {
      streak: student.streak,
      totalTests: student.totalTests,
      averageScore: student.averageScore,
      status: student.status,
      recentScores: recentAssessments.map(a => ({
        date: a.createdAt,
        score: a.overallScore
      }))
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message
    });
  }
};

module.exports = {
  getDashboard,
  getProfile,
  updateProfile,
  getAssessments,
  getProgress,
  getAchievements,
  getQuickStats
};
