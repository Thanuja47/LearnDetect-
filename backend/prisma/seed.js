const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.achievement.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.childAssessment.deleteMany();
  await prisma.report.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.classStudent.deleteMany();
  await prisma.child.deleteMany();
  await prisma.student.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@learndetect.com',
      password: hashedPassword,
      name: 'System Admin',
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin created');

  // Create Teacher
  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@learndetect.com',
      password: hashedPassword,
      name: 'John Teacher',
      role: 'TEACHER'
    }
  });

  const teacher = await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
      totalStudents: 5
    }
  });

  // Create class students for teacher
  const classStudents = await prisma.classStudent.createMany({
    data: [
      { teacherId: teacher.id, name: 'Student A', studentCode: 'STU001', score: 85, status: 'ON_TRACK', trend: 5 },
      { teacherId: teacher.id, name: 'Student B', studentCode: 'STU002', score: 72, status: 'NEEDS_SUPPORT', trend: -3 },
      { teacherId: teacher.id, name: 'Student C', studentCode: 'STU003', score: 91, status: 'EXCELLENT', trend: 8 },
      { teacherId: teacher.id, name: 'Student D', studentCode: 'STU004', score: 68, status: 'NEEDS_SUPPORT', trend: -2 },
      { teacherId: teacher.id, name: 'Student E', studentCode: 'STU005', score: 79, status: 'ON_TRACK', trend: 3 }
    ]
  });
  console.log('✅ Teacher and class students created');

  // Create Parent
  const parentUser = await prisma.user.create({
    data: {
      email: 'parent@learndetect.com',
      password: hashedPassword,
      name: 'Jane Parent',
      role: 'PARENT'
    }
  });

  const parent = await prisma.parent.create({
    data: {
      userId: parentUser.id
    }
  });

  // Create children for parent
  const child1 = await prisma.child.create({
    data: {
      parentId: parent.id,
      firstName: 'Emma',
      lastName: 'Johnson',
      dateOfBirth: new Date('2016-05-15'),
      grade: '2nd',
      gender: 'female',
      progress: 85,
      testsCompleted: 12,
      averageScore: 82,
      status: 'EXCELLENT',
      lastAssessment: new Date('2024-12-27')
    }
  });

  const child2 = await prisma.child.create({
    data: {
      parentId: parent.id,
      firstName: 'Noah',
      lastName: 'Johnson',
      dateOfBirth: new Date('2014-08-20'),
      grade: '4th',
      gender: 'male',
      progress: 72,
      testsCompleted: 15,
      averageScore: 78,
      status: 'ON_TRACK',
      lastAssessment: new Date('2024-12-25')
    }
  });

  // Create child assessments
  await prisma.childAssessment.createMany({
    data: [
      {
        childId: child1.id,
        type: 'PASSAGE',
        wordAccuracy: 85,
        pronunciation: 80,
        readingSpeed: 82,
        fluency: 85,
        comprehension: 80,
        overallScore: 82.4,
        feedback: ['Good reading speed', 'Clear pronunciation'],
        suggestions: ['Practice complex words']
      },
      {
        childId: child2.id,
        type: 'WORD',
        wordAccuracy: 78,
        pronunciation: 75,
        readingSpeed: 80,
        fluency: 76,
        comprehension: 78,
        overallScore: 77.4,
        feedback: ['Consistent pace', 'Good effort'],
        suggestions: ['Work on pronunciation']
      }
    ]
  });

  // Create reports
  await prisma.report.createMany({
    data: [
      {
        childId: child1.id,
        title: 'Monthly Assessment Summary - December',
        type: 'Summary',
        content: 'Emma has shown excellent progress this month...'
      },
      {
        childId: child2.id,
        title: 'Detailed Pronunciation Analysis',
        type: 'Detailed',
        content: 'Noah has been working on pronunciation skills...'
      }
    ]
  });
  console.log('✅ Parent and children created');

  // Create Student
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@learndetect.com',
      password: hashedPassword,
      name: 'Sarah Student',
      role: 'STUDENT'
    }
  });

  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      age: 12,
      grade: '6th',
      streak: 7,
      totalTests: 25,
      averageScore: 82,
      status: 'ON_TRACK'
    }
  });

  // Create assessments for student
  const assessmentTypes = ['PHONEME', 'WORD', 'PASSAGE', 'COMPREHENSION'];
  for (let i = 0; i < 5; i++) {
    await prisma.assessment.create({
      data: {
        studentId: student.id,
        type: assessmentTypes[i % 4],
        wordAccuracy: 75 + Math.random() * 15,
        pronunciation: 70 + Math.random() * 20,
        readingSpeed: 75 + Math.random() * 15,
        fluency: 72 + Math.random() * 18,
        comprehension: 70 + Math.random() * 20,
        overallScore: 75 + Math.random() * 15,
        recognizedText: 'Sample recognized text...',
        feedback: ['Good effort', 'Keep practicing'],
        suggestions: ['Practice daily', 'Focus on fluency']
      }
    });
  }

  // Create achievements for student
  await prisma.achievement.createMany({
    data: [
      {
        studentId: student.id,
        name: 'First Steps',
        description: 'Completed your first reading assessment',
        icon: '🎯'
      },
      {
        studentId: student.id,
        name: 'Getting Started',
        description: 'Completed 5 reading assessments',
        icon: '📚'
      },
      {
        studentId: student.id,
        name: 'Week Warrior',
        description: '7-day streak achieved',
        icon: '🔥'
      }
    ]
  });

  // Create progress records
  const skills = ['pronunciation', 'fluency', 'wordAccuracy', 'readingSpeed', 'comprehension'];
  for (const skill of skills) {
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      await prisma.progress.create({
        data: {
          studentId: student.id,
          skill,
          score: 70 + Math.random() * 20,
          date
        }
      });
    }
  }
  console.log('✅ Student and assessments created');

  // Create schedules for teacher
  const students = await prisma.classStudent.findMany({ where: { teacherId: teacher.id } });
  await prisma.schedule.createMany({
    data: [
      {
        teacherId: teacher.id,
        date: new Date('2024-12-15'),
        time: '14:00',
        duration: 30,
        type: 'PASSAGE',
        notes: 'Focus on comprehension',
        studentIds: students.slice(0, 2).map(s => s.id)
      },
      {
        teacherId: teacher.id,
        date: new Date('2024-12-16'),
        time: '10:00',
        duration: 45,
        type: 'WORD',
        notes: 'Remedial session',
        studentIds: students.slice(2, 4).map(s => s.id)
      }
    ]
  });
  console.log('✅ Schedules created');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📧 Test accounts:');
  console.log('   Admin:   admin@learndetect.com / password123');
  console.log('   Teacher: teacher@learndetect.com / password123');
  console.log('   Parent:  parent@learndetect.com / password123');
  console.log('   Student: student@learndetect.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
