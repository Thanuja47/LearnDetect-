const prisma = require('../config/database');

// Get all children for a parent
const getChildren = async (req, res) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id }
    });

    const { status, search } = req.query;

    const where = { parentId: parent.id };
    if (status && status !== 'all') {
      where.status = status.toUpperCase().replace('-', '_');
    }
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }

    const children = await prisma.child.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: children
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching children',
      error: error.message
    });
  }
};

// Get single child by ID
const getChildById = async (req, res) => {
  try {
    const child = await prisma.child.findUnique({
      where: { id: req.params.id },
      include: {
        assessments: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        reports: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    res.json({
      success: true,
      data: child
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching child',
      error: error.message
    });
  }
};

// Add new child
const addChild = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, grade, gender } = req.body;

    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id }
    });

    const child = await prisma.child.create({
      data: {
        parentId: parent.id,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        grade,
        gender
      }
    });

    res.status(201).json({
      success: true,
      message: 'Child added successfully',
      data: child
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding child',
      error: error.message
    });
  }
};

// Update child
const updateChild = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, grade, gender } = req.body;

    const child = await prisma.child.update({
      where: { id: req.params.id },
      data: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        grade,
        gender
      }
    });

    res.json({
      success: true,
      message: 'Child updated successfully',
      data: child
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating child',
      error: error.message
    });
  }
};

// Delete child
const deleteChild = async (req, res) => {
  try {
    await prisma.child.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Child deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting child',
      error: error.message
    });
  }
};

// Get child's assessments
const getChildAssessments = async (req, res) => {
  try {
    const assessments = await prisma.childAssessment.findMany({
      where: { childId: req.params.id },
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

// Get child's progress
const getChildProgress = async (req, res) => {
  try {
    const child = await prisma.child.findUnique({
      where: { id: req.params.id },
      include: {
        assessments: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    // Format progress data
    const progressData = child.assessments.map(a => ({
      date: a.createdAt,
      score: a.overallScore,
      type: a.type
    }));

    res.json({
      success: true,
      data: {
        child,
        progressData
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

module.exports = {
  getChildren,
  getChildById,
  addChild,
  updateChild,
  deleteChild,
  getChildAssessments,
  getChildProgress
};
