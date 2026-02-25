const prisma = require('../config/database');

// Get all schedules for teacher
const getSchedules = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id }
    });

    const { upcoming } = req.query;

    const where = { teacherId: teacher.id };
    if (upcoming === 'true') {
      where.date = { gte: new Date() };
    }

    const schedules = await prisma.schedule.findMany({
      where,
      orderBy: { date: 'asc' }
    });

    res.json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching schedules',
      error: error.message
    });
  }
};

// Get single schedule
const getScheduleById = async (req, res) => {
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: req.params.id }
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching schedule',
      error: error.message
    });
  }
};

// Create new schedule
const createSchedule = async (req, res) => {
  try {
    const { date, time, duration, type, notes, studentIds } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id }
    });

    const schedule = await prisma.schedule.create({
      data: {
        teacherId: teacher.id,
        date: new Date(date),
        time,
        duration: parseInt(duration),
        type: type.toUpperCase(),
        notes,
        studentIds: studentIds || []
      }
    });

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating schedule',
      error: error.message
    });
  }
};

// Update schedule
const updateSchedule = async (req, res) => {
  try {
    const { date, time, duration, type, notes, studentIds } = req.body;

    const schedule = await prisma.schedule.update({
      where: { id: req.params.id },
      data: {
        date: date ? new Date(date) : undefined,
        time,
        duration: duration ? parseInt(duration) : undefined,
        type: type?.toUpperCase(),
        notes,
        studentIds
      }
    });

    res.json({
      success: true,
      message: 'Schedule updated successfully',
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating schedule',
      error: error.message
    });
  }
};

// Delete schedule
const deleteSchedule = async (req, res) => {
  try {
    await prisma.schedule.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting schedule',
      error: error.message
    });
  }
};

// Get schedules for a student (scheduled assessments assigned to them)
const getStudentSchedules = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Find all schedules where this student is included
    const allSchedules = await prisma.schedule.findMany({
      where: {
        date: { gte: new Date() } // Only upcoming schedules
      },
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { date: 'asc' }
    });

    // Filter schedules that include this student and format response
    const studentSchedules = allSchedules
      .filter(schedule => 
        schedule.studentIds && schedule.studentIds.includes(student.id)
      )
      .map(schedule => ({
        id: schedule.id,
        title: schedule.title,
        type: schedule.type,
        scheduledDate: schedule.date,
        scheduledTime: schedule.time,
        teacher: schedule.teacher
      }));

    res.json({
      success: true,
      data: studentSchedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student schedules',
      error: error.message
    });
  }
};

module.exports = {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getStudentSchedules
};
