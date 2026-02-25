import { z } from 'zod';

// Doctor Contact Details
export interface DoctorContactDetails {
    phone: string;
    email: string;
    address?: string;
}

// Doctor Availability
export interface DoctorAvailability {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

// Doctor Review
export interface DoctorReview {
    id: string;
    doctorId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

// Main Doctor Interface
export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    qualifications: string[];
    experience: number; // years
    price: number;
    contactDetails: DoctorContactDetails;
    availability: DoctorAvailability[];
    rating: number;
    reviewCount: number;
    bio: string;
    image?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Appointment Interface
export interface Appointment {
    id: string;
    doctorId: string;
    userId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    appointmentDate: string;
    appointmentTime: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    createdAt: string;
}

// Zod Schemas for Validation
export const doctorContactDetailsSchema = z.object({
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    address: z.string().optional(),
});

export const doctorAvailabilitySchema = z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isAvailable: z.boolean(),
});

export const doctorSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    specialty: z.string().min(2, 'Specialty is required'),
    qualifications: z.array(z.string()).min(1, 'At least one qualification is required'),
    experience: z.number().min(0, 'Experience must be a positive number'),
    price: z.number().min(0, 'Price must be a positive number'),
    contactDetails: doctorContactDetailsSchema,
    availability: z.array(doctorAvailabilitySchema).optional(),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    image: z.string().optional(),
    isActive: z.boolean().optional(),
});

export const appointmentSchema = z.object({
    doctorId: z.string(),
    patientName: z.string().min(2, 'Patient name is required'),
    patientEmail: z.string().email('Invalid email address'),
    patientPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
    appointmentDate: z.string(),
    appointmentTime: z.string(),
    notes: z.string().optional(),
});

export const doctorReviewSchema = z.object({
    rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: z.string().min(10, 'Review must be at least 10 characters'),
});

// Filter Types
export interface DoctorFilters {
    specialty?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    search?: string;
    isAvailable?: boolean;
}

// Type for form data
export type DoctorFormData = z.infer<typeof doctorSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type DoctorReviewFormData = z.infer<typeof doctorReviewSchema>;
