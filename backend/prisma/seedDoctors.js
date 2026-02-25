const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockDoctors = [
    {
        name: "Dr. Amara Silva",
        specialty: "Pediatrician",
        qualifications: ["MBBS", "MD (Pediatrics)", "MRCPCH"],
        experience: 12,
        price: 3500,
        phone: "+94 77 123 4567",
        email: "amara.silva@healthcare.lk",
        address: "123 Galle Road, Colombo 03",
        availability: [
            { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
            { day: "Tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
            { day: "Wednesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
            { day: "Thursday", startTime: "09:00", endTime: "17:00", isAvailable: true },
            { day: "Friday", startTime: "09:00", endTime: "14:00", isAvailable: true },
            { day: "Saturday", startTime: "09:00", endTime: "12:00", isAvailable: true },
            { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
        ],
        rating: 4.8,
        reviewCount: 156,
        bio: "Dr. Amara Silva is a highly experienced pediatrician with over 12 years of practice. She specializes in child development, vaccinations, and pediatric care. Known for her gentle approach and excellent communication with both children and parents.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
        isActive: true,
    },
    {
        name: "Dr. Rohan Fernando",
        specialty: "Cardiologist",
        qualifications: ["MBBS", "MD (Cardiology)", "FRCP"],
        experience: 18,
        price: 5000,
        phone: "+94 77 234 5678",
        email: "rohan.fernando@healthcare.lk",
        address: "456 Duplication Road, Colombo 04",
        availability: [
            { day: "Monday", startTime: "14:00", endTime: "18:00", isAvailable: true },
            { day: "Tuesday", startTime: "14:00", endTime: "18:00", isAvailable: true },
            { day: "Wednesday", startTime: "14:00", endTime: "18:00", isAvailable: true },
            { day: "Thursday", startTime: "14:00", endTime: "18:00", isAvailable: true },
            { day: "Friday", startTime: "14:00", endTime: "18:00", isAvailable: true },
            { day: "Saturday", startTime: "", endTime: "", isAvailable: false },
            { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
        ],
        rating: 4.9,
        reviewCount: 243,
        bio: "Dr. Rohan Fernando is a renowned cardiologist with extensive experience in treating heart conditions. He specializes in interventional cardiology, cardiac imaging, and preventive cardiology. His patient-centered approach has earned him recognition across the country.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        isActive: true,
    },
    {
        name: "Dr. Nisha Perera",
        specialty: "Dermatologist",
        qualifications: ["MBBS", "MD (Dermatology)", "Dip. in Aesthetic Medicine"],
        experience: 10,
        price: 4000,
        phone: "+94 77 345 6789",
        email: "nisha.perera@healthcare.lk",
        address: "789 Baseline Road, Colombo 09",
        availability: [
            { day: "Monday", startTime: "10:00", endTime: "16:00", isAvailable: true },
            { day: "Tuesday", startTime: "10:00", endTime: "16:00", isAvailable: true },
            { day: "Wednesday", startTime: "", endTime: "", isAvailable: false },
            { day: "Thursday", startTime: "10:00", endTime: "16:00", isAvailable: true },
            { day: "Friday", startTime: "10:00", endTime: "16:00", isAvailable: true },
            { day: "Saturday", startTime: "10:00", endTime: "13:00", isAvailable: true },
            { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
        ],
        rating: 4.7,
        reviewCount: 189,
        bio: "Dr. Nisha Perera is a skilled dermatologist specializing in both medical and cosmetic dermatology. She treats a wide range of skin conditions and offers advanced aesthetic treatments. Her holistic approach ensures comprehensive skin care for all her patients.",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
        isActive: true,
    },
    {
        name: "Dr. Kasun Jayawardena",
        specialty: "Orthopedic",
        qualifications: ["MBBS", "MS (Orthopedics)", "FRCS"],
        experience: 15,
        price: 4500,
        phone: "+94 77 456 7890",
        email: "kasun.jayawardena@healthcare.lk",
        address: "321 Kynsey Road, Colombo 08",
        availability: [
            { day: "Monday", startTime: "08:00", endTime: "12:00", isAvailable: true },
            { day: "Tuesday", startTime: "08:00", endTime: "12:00", isAvailable: true },
            { day: "Wednesday", startTime: "08:00", endTime: "12:00", isAvailable: true },
            { day: "Thursday", startTime: "08:00", endTime: "12:00", isAvailable: true },
            { day: "Friday", startTime: "08:00", endTime: "12:00", isAvailable: true },
            { day: "Saturday", startTime: "08:00", endTime: "11:00", isAvailable: true },
            { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
        ],
        rating: 4.6,
        reviewCount: 134,
        bio: "Dr. Kasun Jayawardena is an experienced orthopedic surgeon specializing in joint replacement, sports injuries, and trauma surgery. With over 15 years of experience, he has performed numerous successful surgeries and helped patients regain mobility and quality of life.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
        isActive: true,
    },
    {
        name: "Dr. Dilini Wickramasinghe",
        specialty: "Psychiatrist",
        qualifications: ["MBBS", "MD (Psychiatry)", "MRCPsych"],
        experience: 9,
        price: 3800,
        phone: "+94 77 567 8901",
        email: "dilini.wickramasinghe@healthcare.lk",
        address: "654 Horton Place, Colombo 07",
        availability: [
            { day: "Monday", startTime: "15:00", endTime: "19:00", isAvailable: true },
            { day: "Tuesday", startTime: "15:00", endTime: "19:00", isAvailable: true },
            { day: "Wednesday", startTime: "15:00", endTime: "19:00", isAvailable: true },
            { day: "Thursday", startTime: "15:00", endTime: "19:00", isAvailable: true },
            { day: "Friday", startTime: "15:00", endTime: "19:00", isAvailable: true },
            { day: "Saturday", startTime: "", endTime: "", isAvailable: false },
            { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
        ],
        rating: 4.9,
        reviewCount: 201,
        bio: "Dr. Dilini Wickramasinghe is a compassionate psychiatrist with expertise in treating anxiety, depression, and other mental health conditions. She provides evidence-based treatments and creates a safe, supportive environment for her patients to heal and grow.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
        isActive: true,
    },
    {
        name: "Dr. Pradeep Gunasekara",
        specialty: "General Physician",
        qualifications: ["MBBS", "MD (Internal Medicine)"],
        experience: 20,
        price: 2500,
        phone: "+94 77 678 9012",
        email: "pradeep.gunasekara@healthcare.lk",
        address: "987 Bauddhaloka Mawatha, Colombo 04",
        availability: [
            { day: "Monday", startTime: "09:00", endTime: "18:00", isAvailable: true },
            { day: "Tuesday", startTime: "09:00", endTime: "18:00", isAvailable: true },
            { day: "Wednesday", startTime: "09:00", endTime: "18:00", isAvailable: true },
            { day: "Thursday", startTime: "09:00", endTime: "18:00", isAvailable: true },
            { day: "Friday", startTime: "09:00", endTime: "18:00", isAvailable: true },
            { day: "Saturday", startTime: "09:00", endTime: "13:00", isAvailable: true },
            { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
        ],
        rating: 4.5,
        reviewCount: 312,
        bio: "Dr. Pradeep Gunasekara is a veteran general physician with two decades of experience. He provides comprehensive primary care services and is known for his thorough diagnostic approach and patient education. His extensive experience makes him a trusted healthcare provider.",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
        isActive: true,
    },
];

async function seedDoctors() {
    console.log('🌱 Seeding doctors...');

    try {
        // Clear existing doctors
        await prisma.doctor.deleteMany({});
        console.log('✅ Cleared existing doctors');

        // Create new doctors
        for (const doctorData of mockDoctors) {
            await prisma.doctor.create({
                data: doctorData
            });
            console.log(`✅ Created doctor: ${doctorData.name}`);
        }

        console.log('🎉 Doctor seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding doctors:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run if called directly
if (require.main === module) {
    seedDoctors()
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}

module.exports = { seedDoctors };
