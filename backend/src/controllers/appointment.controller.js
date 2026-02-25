const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const userId = req.user.id;

        const where = { userId };
        if (status) {
            where.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({
                where,
                include: {
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            specialty: true,
                            image: true
                        }
                    }
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.appointment.count({ where })
        ]);

        res.json({
            success: true,
            data: {
                appointments,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
            error: error.message
        });
    }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.findUnique({
            where: { id },
            include: {
                doctor: true
            }
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.json({
            success: true,
            data: appointment
        });
    } catch (error) {
        console.error('Get appointment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointment',
            error: error.message
        });
    }
};

// Create appointment
exports.createAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            patientName,
            patientEmail,
            patientPhone,
            appointmentDate,
            appointmentTime,
            notes
        } = req.body;

        // Validate required fields
        if (!doctorId || !patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                doctorId,
                userId: req.user?.id,
                patientName,
                patientEmail,
                patientPhone,
                appointmentDate: new Date(appointmentDate),
                appointmentTime,
                notes,
                status: 'pending'
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialty: true,
                        image: true
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            data: appointment
        });
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create appointment',
            error: error.message
        });
    }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointmentDate, appointmentTime, status, notes } = req.body;

        // Check if appointment exists
        const existingAppointment = await prisma.appointment.findUnique({ where: { id } });
        if (!existingAppointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Build update data
        const updateData = {};
        if (appointmentDate) updateData.appointmentDate = new Date(appointmentDate);
        if (appointmentTime) updateData.appointmentTime = appointmentTime;
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        // Update appointment
        const appointment = await prisma.appointment.update({
            where: { id },
            data: updateData,
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialty: true,
                        image: true
                    }
                }
            }
        });

        res.json({
            success: true,
            message: 'Appointment updated successfully',
            data: appointment
        });
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update appointment',
            error: error.message
        });
    }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status: 'cancelled' }
        });

        res.json({
            success: true,
            message: 'Appointment cancelled successfully',
            data: appointment
        });
    } catch (error) {
        console.error('Cancel appointment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel appointment',
            error: error.message
        });
    }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.appointment.delete({ where: { id } });

        res.json({
            success: true,
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        console.error('Delete appointment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete appointment',
            error: error.message
        });
    }
};
