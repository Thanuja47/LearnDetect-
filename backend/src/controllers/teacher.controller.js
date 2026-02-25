const prisma = require('../config/database');

// Get teacher dashboard data
const getDashboard = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: { name: true, email: true }
        },
        classStudents: {
          orderBy: { score: 'desc' }
        },
        schedules: {
          where: {
            date: { gte: new Date() }
          },
          orderBy: { date: 'asc' },
          take: 5
        }
      }
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found'
      });
    }

    // Fetch students that match teacher's class/grade
    let gradeStudents = [];
    if (teacher.className) {
      gradeStudents = await prisma.student.findMany({
        where: { grade: teacher.className },
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { averageScore: 'desc' }
      });
    }

    // Combine classStudents and gradeStudents for stats
    const allClassStudents = teacher.classStudents;
    const allGradeStudents = gradeStudents.map(s => ({
      id: s.id,
      name: s.user.name,
      email: s.user.email,
      score: s.averageScore || 0,
      status: s.status,
      trend: 0,
      grade: s.grade,
      totalTests: s.totalTests,
      isRegisteredStudent: true
    }));

    // Calculate stats from both sources
    const totalClassStudents = allClassStudents.length;
    const totalGradeStudents = allGradeStudents.length;
    const totalStudents = totalClassStudents + totalGradeStudents;

    // Combined scores calculation
    const classStudentScores = allClassStudents.reduce((sum, s) => sum + s.score, 0);
    const gradeStudentScores = allGradeStudents.reduce((sum, s) => sum + s.score, 0);
    const avgScore = totalStudents > 0
      ? Math.round((classStudentScores + gradeStudentScores) / totalStudents)
      : 0;

    // Status counts from both sources
    const classNeedsSupport = allClassStudents.filter(s => s.status === 'NEEDS_SUPPORT').length;
    const gradeNeedsSupport = allGradeStudents.filter(s => s.status === 'NEEDS_SUPPORT').length;
    const needsSupport = classNeedsSupport + gradeNeedsSupport;

    const classExcellent = allClassStudents.filter(s => s.status === 'EXCELLENT').length;
    const gradeExcellent = allGradeStudents.filter(s => s.status === 'EXCELLENT').length;
    const excellent = classExcellent + gradeExcellent;

    const classOnTrack = allClassStudents.filter(s => s.status === 'ON_TRACK').length;
    const gradeOnTrack = allGradeStudents.filter(s => s.status === 'ON_TRACK').length;
    const onTrack = classOnTrack + gradeOnTrack;

    res.json({
      success: true,
      data: {
        teacher,
        gradeStudents: allGradeStudents,
        stats: {
          totalStudents,
          avgScore,
          needsSupport,
          testsThisWeek: allGradeStudents.reduce((sum, s) => sum + (s.totalTests || 0), 0),
          performanceData: [
            { name: 'Excellent', value: excellent },
            { name: 'On Track', value: onTrack },
            { name: 'Needs Support', value: needsSupport }
          ]
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

// Get all students for teacher (both classStudents and grade-matched students)
const getStudents = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id }
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found'
      });
    }

    const { status, search } = req.query;

    // Get classStudents (manually added)
    const classWhere = { teacherId: teacher.id };
    if (status && status !== 'all') {
      classWhere.status = status.toUpperCase().replace('-', '_');
    }
    if (search) {
      classWhere.name = { contains: search, mode: 'insensitive' };
    }

    const classStudents = await prisma.classStudent.findMany({
      where: classWhere,
      orderBy: { score: 'desc' }
    });

    // Get students matching teacher's grade/class
    let gradeStudents = [];
    if (teacher.className) {
      const gradeWhere = { grade: teacher.className };
      if (status && status !== 'all') {
        gradeWhere.status = status.toUpperCase().replace('-', '_');
      }

      gradeStudents = await prisma.student.findMany({
        where: gradeWhere,
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { averageScore: 'desc' }
      });

      // Filter by search if provided
      if (search) {
        gradeStudents = gradeStudents.filter(s =>
          s.user.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    // Transform grade students to match classStudent format
    const transformedGradeStudents = gradeStudents.map(s => ({
      id: s.id,
      name: s.user.name,
      studentCode: s.user.email,
      score: s.averageScore || 0,
      status: s.status,
      trend: 0,
      lastAssessment: null,
      isRegisteredStudent: true,
      grade: s.grade,
      totalTests: s.totalTests
    }));

    // Combine both lists
    const allStudents = [...transformedGradeStudents, ...classStudents];

    res.json({
      success: true,
      data: allStudents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Get single student details
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    // First try to find in ClassStudent
    let student = await prisma.classStudent.findUnique({
      where: { id: studentId }
    });

    if (student) {
      return res.json({
        success: true,
        data: student
      });
    }

    // If not found, try to find in Student model (registered students)
    const registeredStudent = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    if (registeredStudent) {
      // Transform to match expected format
      const transformedStudent = {
        id: registeredStudent.id,
        name: registeredStudent.user.name,
        email: registeredStudent.user.email,
        studentCode: registeredStudent.user.email,
        score: registeredStudent.averageScore || 0,
        status: registeredStudent.status,
        trend: 0,
        grade: registeredStudent.grade,
        totalTests: registeredStudent.totalTests,
        lastAssessment: null,
        isRegisteredStudent: true
      };

      return res.json({
        success: true,
        data: transformedStudent
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// Add student to class
const addStudent = async (req, res) => {
  try {
    const { name, studentCode } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id }
    });

    const student = await prisma.classStudent.create({
      data: {
        teacherId: teacher.id,
        name,
        studentCode
      }
    });

    // Update teacher's total students
    await prisma.teacher.update({
      where: { id: teacher.id },
      data: { totalStudents: { increment: 1 } }
    });

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding student',
      error: error.message
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { name, score, status, trend } = req.body;

    const student = await prisma.classStudent.update({
      where: { id: req.params.id },
      data: {
        name,
        score,
        status: status?.toUpperCase().replace('-', '_'),
        trend
      }
    });

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
};

// Remove student from class
const removeStudent = async (req, res) => {
  try {
    const student = await prisma.classStudent.findUnique({
      where: { id: req.params.id }
    });

    await prisma.classStudent.delete({
      where: { id: req.params.id }
    });

    // Update teacher's total students
    await prisma.teacher.update({
      where: { id: student.teacherId },
      data: { totalStudents: { decrement: 1 } }
    });

    res.json({
      success: true,
      message: 'Student removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing student',
      error: error.message
    });
  }
};

// Get class performance data
const getClassPerformance = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
      include: {
        classStudents: true
      }
    });

    const performanceData = teacher.classStudents.map(s => ({
      name: s.name,
      score: s.score,
      status: s.status.toLowerCase().replace('_', '-')
    }));

    res.json({
      success: true,
      data: performanceData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching performance',
      error: error.message
    });
  }
};

// Generate class report
const generateClassReport = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
      include: {
        classStudents: true
      }
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found'
      });
    }

    // Reuse logic to get all students (class + grade)
    let gradeStudents = [];
    if (teacher.className) {
      gradeStudents = await prisma.student.findMany({
        where: { grade: teacher.className },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      });
    }

    const allStudents = [
      ...teacher.classStudents.map(s => ({
        name: s.name,
        score: s.score,
        status: s.status,
      })),
      ...gradeStudents.map(s => ({
        name: s.user.name,
        score: s.averageScore || 0,
        status: s.status,
      }))
    ];

    if (allStudents.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No students found to generate report'
      });
    }

    // Calculate metrics
    const totalStudents = allStudents.length;
    const avgScore = Math.round(allStudents.reduce((sum, s) => sum + s.score, 0) / totalStudents);

    // Status distribution
    const excellentCount = allStudents.filter(s => s.status === 'EXCELLENT' || s.status === 'excellent').length;
    const onTrackCount = allStudents.filter(s => s.status === 'ON_TRACK' || s.status === 'on-track').length;
    const needsSupportCount = allStudents.filter(s => s.status === 'NEEDS_SUPPORT' || s.status === 'needs-support').length;

    // Students needing support
    const studentsNeedingSupport = allStudents
      .filter(s => s.status === 'NEEDS_SUPPORT' || s.status === 'needs-support')
      .map(s => ({ name: s.name, score: s.score }));

    const reportData = {
      generatedAt: new Date(),
      teacherClass: teacher.className,
      teacherSubject: teacher.subject,
      metrics: {
        totalStudents,
        avgScore,
        gradeAverage: 75, // Benchmark
      },
      distribution: {
        excellent: excellentCount,
        onTrack: onTrackCount,
        needsSupport: needsSupportCount
      },
      studentsNeedingSupport
    };

    res.json({
      success: true,
      message: 'Class report generated successfully',
      data: reportData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating class report',
      error: error.message
    });
  }
};

module.exports = {
  getDashboard,
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  removeStudent,
  getClassPerformance,
  generateClassReport
};
