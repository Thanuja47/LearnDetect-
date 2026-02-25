const prisma = require('../config/database');

// Get admin dashboard stats
const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalParents,
      totalTeachers,
      totalAssessments,
      totalChildAssessments
    ] = await Promise.all([
      prisma.user.count(),
      prisma.student.count(),
      prisma.parent.count(),
      prisma.teacher.count(),
      prisma.assessment.count(),
      prisma.childAssessment.count()
    ]);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentAssessments = await prisma.assessment.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    });

    const recentUsers = await prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    });

    // Weekly activity data
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const [users, assessments] = await Promise.all([
        prisma.user.count({
          where: { createdAt: { gte: startOfDay, lte: endOfDay } }
        }),
        prisma.assessment.count({
          where: { createdAt: { gte: startOfDay, lte: endOfDay } }
        })
      ]);

      weeklyData.push({
        date: startOfDay.toLocaleDateString('en-US', { weekday: 'short' }),
        users,
        assessments
      });
    }

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalStudents,
          totalParents,
          totalTeachers,
          totalAssessments: totalAssessments + totalChildAssessments,
          recentAssessments,
          recentUsers
        },
        weeklyData
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

// Get all users with filters
const getUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;

    const where = {};
    if (role) where.role = role.toUpperCase();
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        },
        skip: (page - 1) * limit,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        users,
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
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get system analytics
const getAnalytics = async (req, res) => {
  try {
    // Get assessment type distribution
    const assessmentTypes = await prisma.assessment.groupBy({
      by: ['type'],
      _count: { type: true }
    });

    // Get user role distribution
    const userRoles = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    });

    // Get monthly registration trend
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await prisma.user.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true }
    });

    // Group by month
    const monthlyData = {};
    monthlyUsers.forEach(u => {
      const month = u.createdAt.toLocaleDateString('en-US', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        assessmentTypes: assessmentTypes.map(t => ({
          type: t.type,
          count: t._count.type
        })),
        userRoles: userRoles.map(r => ({
          role: r.role,
          count: r._count.role
        })),
        monthlyRegistrations: Object.entries(monthlyData).map(([month, count]) => ({
          month,
          count
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
};

// Get audit logs (simplified)
const getAuditLogs = async (req, res) => {
  try {
    // For simplicity, we'll return recent user activities
    const recentUsers = await prisma.user.findMany({
      take: 50,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const logs = recentUsers.map(u => ({
      id: u.id,
      user: u.name,
      email: u.email,
      action: u.createdAt.getTime() === u.updatedAt.getTime() ? 'User registered' : 'User updated',
      timestamp: u.updatedAt
    }));

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching audit logs',
      error: error.message
    });
  }
};

module.exports = {
  getDashboard,
  getUsers,
  getAnalytics,
  getAuditLogs
};
