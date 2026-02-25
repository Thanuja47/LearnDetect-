const prisma = require('../config/database');

// Get parent dashboard data
const getDashboard = async (req, res) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: { name: true, email: true }
        },
        children: {
          include: {
            assessments: {
              take: 5,
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    });

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent profile not found'
      });
    }

    // Calculate stats
    const totalChildren = parent.children.length;
    const totalAssessments = parent.children.reduce((sum, child) => sum + child.testsCompleted, 0);
    const avgProgress = parent.children.length > 0
      ? parent.children.reduce((sum, child) => sum + child.progress, 0) / parent.children.length
      : 0;

    res.json({
      success: true,
      data: {
        parent,
        stats: {
          totalChildren,
          totalAssessments,
          averageProgress: Math.round(avgProgress)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard',
      error: error.message
    });
  }
};

// Get progress tracking data
const getProgress = async (req, res) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id },
      include: {
        children: {
          include: {
            assessments: {
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    });

    // Format progress data by month
    const monthlyProgress = {};
    parent.children.forEach(child => {
      child.assessments.forEach(assessment => {
        const month = new Date(assessment.createdAt).toLocaleDateString('en-US', { month: 'short' });
        if (!monthlyProgress[month]) {
          monthlyProgress[month] = { month };
        }
        if (!monthlyProgress[month][child.firstName]) {
          monthlyProgress[month][child.firstName] = [];
        }
        monthlyProgress[month][child.firstName].push(assessment.overallScore);
      });
    });

    // Calculate averages
    const progressData = Object.values(monthlyProgress).map(monthData => {
      const result = { month: monthData.month };
      Object.keys(monthData).forEach(key => {
        if (key !== 'month' && Array.isArray(monthData[key])) {
          result[key] = Math.round(monthData[key].reduce((a, b) => a + b, 0) / monthData[key].length);
        }
      });
      return result;
    });

    res.json({
      success: true,
      data: {
        progressData,
        children: parent.children
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

// Get insights (strengths and areas of focus)
const getInsights = async (req, res) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id },
      include: {
        children: {
          include: {
            assessments: {
              take: 10,
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    });

    // Analyze assessments to generate insights
    const allAssessments = parent.children.flatMap(c => c.assessments);
    
    const avgMetrics = {
      pronunciation: 0,
      fluency: 0,
      wordAccuracy: 0,
      readingSpeed: 0,
      comprehension: 0
    };

    if (allAssessments.length > 0) {
      allAssessments.forEach(a => {
        avgMetrics.pronunciation += a.pronunciation;
        avgMetrics.fluency += a.fluency;
        avgMetrics.wordAccuracy += a.wordAccuracy;
        avgMetrics.readingSpeed += a.readingSpeed;
        avgMetrics.comprehension += a.comprehension;
      });

      Object.keys(avgMetrics).forEach(key => {
        avgMetrics[key] = Math.round(avgMetrics[key] / allAssessments.length);
      });
    }

    // Generate insights based on metrics
    const strengths = [];
    const areasOfFocus = [];

    Object.entries(avgMetrics).forEach(([skill, score]) => {
      if (score >= 80) {
        strengths.push(`Strong ${skill.replace(/([A-Z])/g, ' $1').toLowerCase()} improving`);
      } else if (score < 70) {
        areasOfFocus.push(`${skill.replace(/([A-Z])/g, ' $1')} needs attention`);
      }
    });

    res.json({
      success: true,
      data: {
        strengths,
        areasOfFocus,
        avgMetrics
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching insights',
      error: error.message
    });
  }
};

module.exports = {
  getDashboard,
  getProgress,
  getInsights
};
