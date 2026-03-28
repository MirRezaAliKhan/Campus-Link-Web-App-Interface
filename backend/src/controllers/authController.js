const bcrypt = require('bcryptjs');
const prisma = require('../config/prismaClient');
const { generateToken } = require('../utils/tokenUtils');

// Register
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role
      }
    });

    if (role === 'student') {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          university: '',
          degree: '',
          branch: '',
          currentYear: 1,
          cgpa: 0,
          skills: [],
          projects: [],
          internships: [],
          achievements: [],
          uss: { score: 0, confidence: 0, breakdown: {} }
        }
      });
    } else if (role === 'recruiter') {
      await prisma.recruiterProfile.create({
        data: {
          userId: user.id,
          companyName: '',
          industry: '',
          companySize: 'medium',
          location: '',
          scoringWeights: {
            academics: 20,
            skills: 30,
            projects: 25,
            experience: 15,
            achievements: 10,
            verificationBonus: 5
          },
          filterPreferences: {
            minimumUssScore: 50,
            minimumCgpa: 0,
            preferredSkills: [],
            verifiedOnly: false,
            preferredBranches: [],
            preferredYears: []
          },
          viewedCandidates: [],
          hiringRoles: []
        }
      });
    }

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        profileImage: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = null;

    if (user.role === 'student') {
      profile = await prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });
    } else if (user.role === 'recruiter') {
      profile = await prisma.recruiterProfile.findUnique({
        where: { userId: user.id }
      });
    }

    res.status(200).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, profileImage } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(req.user.userId) },
      data: { firstName, lastName, profileImage }
    });

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profileImage: user.profileImage,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
