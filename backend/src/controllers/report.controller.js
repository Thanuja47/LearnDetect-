const prisma = require('../config/database');

// Get all reports for a child
const getReports = async (req, res) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id },
      include: {
        children: {
          include: {
            reports: {
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    });

    // Flatten reports with child info
    const reports = parent.children.flatMap(child => 
      child.reports.map(report => ({
        ...report,
        childName: `${child.firstName} ${child.lastName}`
      }))
    );

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Get reports for specific child
const getChildReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { childId: req.params.childId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// Get single report
const getReportById = async (req, res) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: req.params.id },
      include: {
        child: true
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching report',
      error: error.message
    });
  }
};

// Generate report for a child
const generateReport = async (req, res) => {
  try {
    const { childId, title, type } = req.body;

    // Get child's assessments for report generation
    const child = await prisma.child.findUnique({
      where: { id: childId },
      include: {
        assessments: {
          orderBy: { createdAt: 'desc' },
          take: type === 'Summary' ? 5 : type === 'Detailed' ? 10 : 20
        }
      }
    });

    // Generate report content based on assessments
    let content = `Report for ${child.firstName} ${child.lastName}\n\n`;
    content += `Grade: ${child.grade}\n`;
    content += `Average Score: ${child.averageScore}%\n`;
    content += `Tests Completed: ${child.testsCompleted}\n`;
    content += `Status: ${child.status}\n\n`;

    if (child.assessments.length > 0) {
      content += 'Recent Assessments:\n';
      child.assessments.forEach(a => {
        content += `- ${a.type}: ${a.overallScore}% (${a.createdAt.toLocaleDateString()})\n`;
      });
    }

    const report = await prisma.report.create({
      data: {
        childId,
        title,
        type,
        content
      }
    });

    res.status(201).json({
      success: true,
      message: 'Report generated successfully',
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating report',
      error: error.message
    });
  }
};

// Delete report
const deleteReport = async (req, res) => {
  try {
    await prisma.report.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting report',
      error: error.message
    });
  }
};

module.exports = {
  getReports,
  getChildReports,
  getReportById,
  generateReport,
  deleteReport
};
