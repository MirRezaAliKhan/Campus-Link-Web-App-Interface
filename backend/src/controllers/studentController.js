const StudentProfile = require('../models/StudentProfile');
const USSCalculator = require('../utils/USSCalculator');

const calculator = new USSCalculator();

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  try {
    const { university, degree, branch, currentYear, cgpa, about, linkedinUrl, portfolioUrl, githubUsername } = req.body;

    let profile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Update fields
    if (university) profile.university = university;
    if (degree) profile.degree = degree;
    if (branch) profile.branch = branch;
    if (currentYear) profile.currentYear = currentYear;
    if (cgpa) profile.cgpa = cgpa;
    if (about !== undefined) profile.about = about;
    if (linkedinUrl) profile.linkedinUrl = linkedinUrl;
    if (portfolioUrl) profile.portfolioUrl = portfolioUrl;
    if (githubUsername) profile.githubUsername = githubUsername;

    // Recalculate USS
    const ussData = calculator.calculateUSS({
      cgpa: profile.cgpa,
      skills: profile.skills,
      projects: profile.projects,
      internships: profile.internships,
      achievements: profile.achievements
    });

    profile.uss = {
      ...ussData,
      lastCalculated: new Date()
    };

    await profile.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add skill
exports.addSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;

    const profile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    profile.skills.push({
      name,
      proficiency,
      verified: false
    });

    // Recalculate USS
    const ussData = calculator.calculateUSS({
      cgpa: profile.cgpa,
      skills: profile.skills,
      projects: profile.projects,
      internships: profile.internships,
      achievements: profile.achievements
    });

    profile.uss = {
      ...ussData,
      lastCalculated: new Date()
    };

    await profile.save();

    res.status(200).json({
      message: 'Skill added successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add project
exports.addProject = async (req, res) => {
  try {
    const { title, description, technologies, link, githubLink, startDate, endDate } = req.body;

    const profile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    profile.projects.push({
      title,
      description,
      technologies,
      link,
      githubLink,
      startDate,
      endDate,
      verified: false
    });

    // Recalculate USS
    const ussData = calculator.calculateUSS({
      cgpa: profile.cgpa,
      skills: profile.skills,
      projects: profile.projects,
      internships: profile.internships,
      achievements: profile.achievements
    });

    profile.uss = {
      ...ussData,
      lastCalculated: new Date()
    };

    await profile.save();

    res.status(200).json({
      message: 'Project added successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add internship
exports.addInternship = async (req, res) => {
  try {
    const { company, position, duration, description, startDate, endDate } = req.body;

    const profile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    profile.internships.push({
      company,
      position,
      duration,
      description,
      startDate,
      endDate,
      verified: false
    });

    // Recalculate USS
    const ussData = calculator.calculateUSS({
      cgpa: profile.cgpa,
      skills: profile.skills,
      projects: profile.projects,
      internships: profile.internships,
      achievements: profile.achievements
    });

    profile.uss = {
      ...ussData,
      lastCalculated: new Date()
    };

    await profile.save();

    res.status(200).json({
      message: 'Internship added successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get improved USS suggestions
exports.getUssSuggestions = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const suggestions = [];

    // Analyze each component
    const breakdown = profile.uss.breakdown;

    if (breakdown.academicsScore < 70) {
      suggestions.push({
        category: 'Academics',
        current: breakdown.academicsScore,
        suggestion: 'Aim to improve your CGPA. Each 1 point increase can boost your USS by 2 points.',
        impact: 'High'
      });
    }

    if (breakdown.skillsScore < 70) {
      suggestions.push({
        category: 'Skills',
        current: breakdown.skillsScore,
        suggestion: `You have ${profile.skills.length} skills. Add 2-3 more in-demand skills like JavaScript, Python, or React.`,
        impact: 'High'
      });
    }

    if (breakdown.projectsScore < 70) {
      suggestions.push({
        category: 'Projects',
        current: breakdown.projectsScore,
        suggestion: `You have ${profile.projects.length} projects. Add 1-2 more projects showcasing full-stack development.`,
        impact: 'High'
      });
    }

    if (breakdown.experienceScore < 70 && profile.internships.length === 0) {
      suggestions.push({
        category: 'Experience',
        current: breakdown.experienceScore,
        suggestion: 'Take up an internship or freelance project. Even 1 internship can improve your USS by 15 points.',
        impact: 'Very High'
      });
    }

    if (profile.uss.verificationPercentage < 50) {
      suggestions.push({
        category: 'Verification',
        current: profile.uss.verificationPercentage,
        suggestion: 'Verify your skills through assessments. Verified data increases your confidence score and weight in recruiter rankings.',
        impact: 'Medium'
      });
    }

    res.status(200).json({
      currentUss: profile.uss.score,
      suggestions,
      potentialUss: Math.min(profile.uss.score + 15, 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
