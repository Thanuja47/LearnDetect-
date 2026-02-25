const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all assessment materials
const getMaterials = async (req, res) => {
  try {
    const { type, grade, difficulty } = req.query;
    
    const where = { isActive: true };
    
    if (type) {
      where.type = type.toUpperCase();
    }
    if (grade) {
      where.grade = grade;
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }

    const materials = await prisma.assessmentMaterial.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: materials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment materials',
      error: error.message
    });
  }
};

// Get materials by type
const getMaterialsByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    const materials = await prisma.assessmentMaterial.findMany({
      where: {
        type: type.toUpperCase(),
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: materials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment materials',
      error: error.message
    });
  }
};

// Get single material by ID
const getMaterialById = async (req, res) => {
  try {
    const material = await prisma.assessmentMaterial.findUnique({
      where: { id: req.params.id }
    });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Assessment material not found'
      });
    }

    res.json({
      success: true,
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment material',
      error: error.message
    });
  }
};

// Create new assessment material (teacher/admin only)
const createMaterial = async (req, res) => {
  try {
    const { title, type, content, difficulty, grade, duration } = req.body;

    if (!title || !type || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, type, and content are required'
      });
    }

    const material = await prisma.assessmentMaterial.create({
      data: {
        title,
        type: type.toUpperCase(),
        content,
        difficulty: difficulty || 'medium',
        grade: grade || null,
        duration: duration || 5,
        createdBy: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Assessment material created successfully',
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating assessment material',
      error: error.message
    });
  }
};

// Update assessment material
const updateMaterial = async (req, res) => {
  try {
    const { title, type, content, difficulty, grade, duration, isActive } = req.body;

    const existingMaterial = await prisma.assessmentMaterial.findUnique({
      where: { id: req.params.id }
    });

    if (!existingMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Assessment material not found'
      });
    }

    const material = await prisma.assessmentMaterial.update({
      where: { id: req.params.id },
      data: {
        title: title || existingMaterial.title,
        type: type ? type.toUpperCase() : existingMaterial.type,
        content: content || existingMaterial.content,
        difficulty: difficulty || existingMaterial.difficulty,
        grade: grade !== undefined ? grade : existingMaterial.grade,
        duration: duration || existingMaterial.duration,
        isActive: isActive !== undefined ? isActive : existingMaterial.isActive
      }
    });

    res.json({
      success: true,
      message: 'Assessment material updated successfully',
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating assessment material',
      error: error.message
    });
  }
};

// Delete assessment material
const deleteMaterial = async (req, res) => {
  try {
    await prisma.assessmentMaterial.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Assessment material deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting assessment material',
      error: error.message
    });
  }
};

// Seed default materials
const seedDefaultMaterials = async (req, res) => {
  try {
    const existingCount = await prisma.assessmentMaterial.count();
    
    if (existingCount > 0) {
      return res.json({
        success: true,
        message: 'Default materials already exist',
        count: existingCount
      });
    }

    const defaultMaterials = [
      // Phoneme materials
      {
        title: 'Basic Letter Sounds',
        type: 'PHONEME',
        content: 'Read these sounds aloud: /b/, /d/, /g/, /p/, /t/, /k/, /m/, /n/, /s/, /f/',
        difficulty: 'easy',
        grade: '1',
        duration: 3
      },
      {
        title: 'Vowel Sounds Practice',
        type: 'PHONEME',
        content: 'Read these vowel sounds: /a/ as in cat, /e/ as in bed, /i/ as in sit, /o/ as in hot, /u/ as in cup',
        difficulty: 'easy',
        grade: '1',
        duration: 3
      },
      {
        title: 'Consonant Blends',
        type: 'PHONEME',
        content: 'Read these blends: /bl/, /br/, /cl/, /cr/, /dr/, /fl/, /fr/, /gl/, /gr/, /pl/, /pr/, /sl/, /sm/, /sn/, /sp/, /st/, /sw/, /tr/',
        difficulty: 'medium',
        grade: '2',
        duration: 4
      },
      
      // Word materials
      {
        title: 'Simple Words',
        type: 'WORD',
        content: 'cat, dog, run, jump, play, happy, sun, moon, tree, book',
        difficulty: 'easy',
        grade: '1',
        duration: 3
      },
      {
        title: 'Common Words',
        type: 'WORD',
        content: 'beautiful, wonderful, elephant, butterfly, celebrate, adventure, important, different, together, tomorrow',
        difficulty: 'medium',
        grade: '2',
        duration: 5
      },
      {
        title: 'Advanced Vocabulary',
        type: 'WORD',
        content: 'photograph, encyclopedia, enthusiasm, responsibility, communication, extraordinary, determination, imagination, accomplishment, independence',
        difficulty: 'hard',
        grade: '4',
        duration: 7
      },
      
      // Passage materials
      {
        title: 'The Friendly Dog',
        type: 'PASSAGE',
        content: 'Max is a friendly dog. He likes to play in the park. He runs fast and jumps high. Max loves to chase balls. He is a good dog.',
        difficulty: 'easy',
        grade: '1',
        duration: 5
      },
      {
        title: 'The Magic Garden',
        type: 'PASSAGE',
        content: 'In a small village, there was a magic garden. The flowers could talk and the trees could dance. Every morning, the garden would wake up with the sun. Children loved to visit and listen to the flowers sing beautiful songs.',
        difficulty: 'medium',
        grade: '2',
        duration: 7
      },
      {
        title: 'The Quick Brown Fox',
        type: 'PASSAGE',
        content: 'The quick brown fox jumps over the lazy dog. This is a famous pangram that contains every letter of the English alphabet. Reading is one of the most important skills a student can develop. It opens doors to new worlds, ideas, and opportunities for learning and growth.',
        difficulty: 'medium',
        grade: '3',
        duration: 8
      },
      {
        title: 'The Ocean Adventure',
        type: 'PASSAGE',
        content: 'Deep beneath the ocean waves, a world of wonder awaits discovery. Colorful fish swim through coral reefs while dolphins play in the currents. Scientists explore these mysterious waters to learn about marine life. The ocean holds many secrets that we are only beginning to understand. Protecting our oceans is important for the future of our planet.',
        difficulty: 'hard',
        grade: '4',
        duration: 10
      },
      
      // Comprehension materials
      {
        title: 'The Lost Kitten',
        type: 'COMPREHENSION',
        content: 'Sarah found a small kitten in her backyard. It was cold and hungry. She gave it milk and a warm blanket. The next day, she put up posters to find its owner. A week later, an old lady came to get her kitten. She was very happy and thanked Sarah.\n\nQuestions:\n1. Where did Sarah find the kitten?\n2. What did Sarah give the kitten?\n3. How did Sarah try to find the owner?\n4. Who came to get the kitten?',
        difficulty: 'easy',
        grade: '1',
        duration: 8
      },
      {
        title: 'The Science Fair',
        type: 'COMPREHENSION',
        content: 'Tom wanted to win the science fair. He decided to build a volcano that could erupt. He used baking soda and vinegar to make the eruption. His teacher helped him understand how the chemicals react. On the day of the fair, his volcano worked perfectly. Tom won first place and felt very proud.\n\nQuestions:\n1. What did Tom want to do?\n2. What did he build for the science fair?\n3. What materials made the volcano erupt?\n4. What place did Tom win?',
        difficulty: 'medium',
        grade: '2',
        duration: 10
      },
      {
        title: 'The Mystery Door',
        type: 'COMPREHENSION',
        content: 'A young girl named Emma discovered a mysterious door in her garden that had never been there before. Beyond it lay a forest of ancient trees with glowing leaves that lit up the night like tiny stars. She stepped through and discovered a hidden village where friendly creatures lived in harmony with nature. The creatures told her she was chosen to help protect their magical world from darkness.\n\nQuestions:\n1. What did Emma discover in her garden?\n2. What was special about the trees in the forest?\n3. What did Emma find after stepping through the door?\n4. Why was Emma chosen by the creatures?',
        difficulty: 'hard',
        grade: '4',
        duration: 12
      }
    ];

    await prisma.assessmentMaterial.createMany({
      data: defaultMaterials
    });

    res.json({
      success: true,
      message: 'Default materials seeded successfully',
      count: defaultMaterials.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding default materials',
      error: error.message
    });
  }
};

module.exports = {
  getMaterials,
  getMaterialsByType,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  seedDefaultMaterials
};
