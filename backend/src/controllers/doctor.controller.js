const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all doctors with filters
exports.getAllDoctors = async (req, res) => {
    try {
        const {
            specialty,
            minPrice,
            maxPrice,
            minRating,
            search,
            isAvailable,
            page = 1,
            limit = 10
        } = req.query;

        // Build filter object
        const where = {};

        if (specialty) {
            where.specialty = specialty;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        if (minRating) {
            where.rating = { gte: parseFloat(minRating) };
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { specialty: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (isAvailable !== undefined) {
            where.isActive = isAvailable === 'true';
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        // Fetch doctors with pagination
        const [doctors, total] = await Promise.all([
            prisma.doctor.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.doctor.count({ where })
        ]);

        // Transform availability from JSON to array
        const transformedDoctors = doctors.map(doctor => ({
            ...doctor,
            contactDetails: {
                phone: doctor.phone,
                email: doctor.email,
                address: doctor.address
            },
            availability: doctor.availability || []
        }));

        res.json({
            success: true,
            data: {
                doctors: transformedDoctors,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get all doctors error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
            error: error.message
        });
    }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await prisma.doctor.findUnique({
            where: { id },
            include: {
                reviews: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Transform response
        const transformedDoctor = {
            ...doctor,
            contactDetails: {
                phone: doctor.phone,
                email: doctor.email,
                address: doctor.address
            },
            availability: doctor.availability || []
        };

        res.json({
            success: true,
            data: transformedDoctor
        });
    } catch (error) {
        console.error('Get doctor by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctor',
            error: error.message
        });
    }
};

// Create new doctor (Admin only)
exports.createDoctor = async (req, res) => {
    try {
        const {
            name,
            specialty,
            qualifications,
            experience,
            price,
            contactDetails,
            availability,
            bio,
            image,
            isActive
        } = req.body;

        // Validate required fields
        if (!name || !specialty || !qualifications || !experience || !price || !contactDetails || !bio) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Create doctor
        const doctor = await prisma.doctor.create({
            data: {
                name,
                specialty,
                qualifications,
                experience: parseInt(experience),
                price: parseFloat(price),
                phone: contactDetails.phone,
                email: contactDetails.email,
                address: contactDetails.address,
                availability: availability || [],
                bio,
                image,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        // Transform response
        const transformedDoctor = {
            ...doctor,
            contactDetails: {
                phone: doctor.phone,
                email: doctor.email,
                address: doctor.address
            },
            availability: doctor.availability || []
        };

        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            data: transformedDoctor
        });
    } catch (error) {
        console.error('Create doctor error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create doctor',
            error: error.message
        });
    }
};

// Update doctor (Admin only)
exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            specialty,
            qualifications,
            experience,
            price,
            contactDetails,
            availability,
            bio,
            image,
            isActive
        } = req.body;

        // Check if doctor exists
        const existingDoctor = await prisma.doctor.findUnique({ where: { id } });
        if (!existingDoctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Build update data
        const updateData = {};
        if (name) updateData.name = name;
        if (specialty) updateData.specialty = specialty;
        if (qualifications) updateData.qualifications = qualifications;
        if (experience) updateData.experience = parseInt(experience);
        if (price) updateData.price = parseFloat(price);
        if (contactDetails) {
            if (contactDetails.phone) updateData.phone = contactDetails.phone;
            if (contactDetails.email) updateData.email = contactDetails.email;
            if (contactDetails.address !== undefined) updateData.address = contactDetails.address;
        }
        if (availability !== undefined) updateData.availability = availability;
        if (bio) updateData.bio = bio;
        if (image !== undefined) updateData.image = image;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update doctor
        const doctor = await prisma.doctor.update({
            where: { id },
            data: updateData
        });

        // Transform response
        const transformedDoctor = {
            ...doctor,
            contactDetails: {
                phone: doctor.phone,
                email: doctor.email,
                address: doctor.address
            },
            availability: doctor.availability || []
        };

        res.json({
            success: true,
            message: 'Doctor updated successfully',
            data: transformedDoctor
        });
    } catch (error) {
        console.error('Update doctor error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update doctor',
            error: error.message
        });
    }
};

// Delete doctor (Admin only)
exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({ where: { id } });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Delete doctor (will cascade delete reviews and appointments)
        await prisma.doctor.delete({ where: { id } });

        res.json({
            success: true,
            message: 'Doctor deleted successfully'
        });
    } catch (error) {
        console.error('Delete doctor error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete doctor',
            error: error.message
        });
    }
};

// Get doctor reviews
exports.getDoctorReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [reviews, total] = await Promise.all([
            prisma.doctorReview.findMany({
                where: { doctorId: id },
                skip,
                take,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.doctorReview.count({ where: { doctorId: id } })
        ]);

        res.json({
            success: true,
            data: {
                reviews,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Get doctor reviews error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews',
            error: error.message
        });
    }
};

// Add doctor review
exports.addDoctorReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;
        const userName = req.user.name;

        // Validate
        if (!rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Rating and comment are required'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({ where: { id } });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Create review
        const review = await prisma.doctorReview.create({
            data: {
                doctorId: id,
                userId,
                userName,
                rating: parseFloat(rating),
                comment
            }
        });

        // Update doctor's average rating and review count
        const allReviews = await prisma.doctorReview.findMany({
            where: { doctorId: id }
        });

        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await prisma.doctor.update({
            where: { id },
            data: {
                rating: avgRating,
                reviewCount: allReviews.length
            }
        });

        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: review
        });
    } catch (error) {
        console.error('Add doctor review error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add review',
            error: error.message
        });
    }
};
