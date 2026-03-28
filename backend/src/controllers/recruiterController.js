const RecruiterProfile = require('../models/RecruiterProfile');
const StudentProfile = require('../models/StudentProfile');
const Application = require('../models/Application');
const USSCalculator = require('../utils/USSCalculator');

const calculator = new USSCalculator();

// Get recruiter profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update recruiter profile
exports.updateProfile = async (req, res) => {
  try {
    const { companyName, industry, companySize, location, companyWebsite, description } = req.body;

    let profile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    if (companyName) profile.companyName = companyName;
    if (industry) profile.industry = industry;
    if (companySize) profile.companySize = companySize;
    if (location) profile.location = location;
    if (companyWebsite) profile.companyWebsite = companyWebsite;
    if (description !== undefined) profile.description = description;

    await profile.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update scoring weights
exports.updateScoringWeights = async (req, res) => {
  try {
    const { academics, skills, projects, experience, achievements, verificationBonus } = req.body;

    let profile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    profile.scoringWeights = {
      academics: academics || profile.scoringWeights.academics,
      skills: skills || profile.scoringWeights.skills,
      projects: projects || profile.scoringWeights.projects,
      experience: experience || profile.scoringWeights.experience,
      achievements: achievements || profile.scoringWeights.achievements,
      verificationBonus: verificationBonus || profile.scoringWeights.verificationBonus
    };

    await profile.save();

    res.status(200).json({
      message: 'Scoring weights updated successfully',
      weights: profile.scoringWeights
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update filter preferences
exports.updateFilterPreferences = async (req, res) => {
  try {
    const { minimumUssScore, minimumCgpa, preferredSkills, verifiedOnly, preferredBranches, preferredYears } = req.body;

    let profile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    profile.filterPreferences = {
      minimumUssScore: minimumUssScore !== undefined ? minimumUssScore : profile.filterPreferences.minimumUssScore,
      minimumCgpa: minimumCgpa !== undefined ? minimumCgpa : profile.filterPreferences.minimumCgpa,
      preferredSkills: preferredSkills || profile.filterPreferences.preferredSkills,
      verifiedOnly: verifiedOnly !== undefined ? verifiedOnly : profile.filterPreferences.verifiedOnly,
      preferredBranches: preferredBranches || profile.filterPreferences.preferredBranches,
      preferredYears: preferredYears || profile.filterPreferences.preferredYears
    };

    await profile.save();

    res.status(200).json({
      message: 'Filter preferences updated successfully',
      preferences: profile.filterPreferences
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get ranked candidates with custom weights
exports.getCandidates = async (req, res) => {
  try {
    const recruiterProfile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!recruiterProfile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    // Convert weights from 0-100 to 0-1 scale
    const weights = {
      academics: recruiterProfile.scoringWeights.academics / 100,
      skills: recruiterProfile.scoringWeights.skills / 100,
      projects: recruiterProfile.scoringWeights.projects / 100,
      experience: recruiterProfile.scoringWeights.experience / 100,
      achievements: recruiterProfile.scoringWeights.achievements / 100,
      verificationBonus: recruiterProfile.scoringWeights.verificationBonus / 100
    };

    // Get all student profiles
    let students = await StudentProfile.find()
      .populate('userId', 'firstName lastName email profileImage')
      .select('-__v');

    // Filter based on preferences
    students = students.filter(student => {
      if (student.uss.score < recruiterProfile.filterPreferences.minimumUssScore) return false;
      if (student.cgpa < recruiterProfile.filterPreferences.minimumCgpa) return false;

      if (recruiterProfile.filterPreferences.verifiedOnly && student.uss.verificationPercentage < 50) {
        return false;
      }

      if (recruiterProfile.filterPreferences.preferredBranches.length > 0) {
        if (!recruiterProfile.filterPreferences.preferredBranches.includes(student.branch)) return false;
      }

      if (recruiterProfile.filterPreferences.preferredYears.length > 0) {
        if (!recruiterProfile.filterPreferences.preferredYears.includes(student.currentYear)) return false;
      }

      return true;
    });

    // Recalculate scores with recruiter's weights
    const rankedStudents = students
      .map(student => {
        const customUss = calculator.calculateUSS(
          {
            cgpa: student.cgpa,
            skills: student.skills,
            projects: student.projects,
            internships: student.internships,
            achievements: student.achievements
          },
          weights
        );

        // Check for skill matches
        const matchedSkills = student.skills
          .filter(skill => recruiterProfile.filterPreferences.preferredSkills.includes(skill.name))
          .length;

        return {
          ...student.toObject(),
          customUss,
          matchedSkillsCount: matchedSkills,
          matchPercentage: Math.round((matchedSkills / recruiterProfile.filterPreferences.preferredSkills.length) * 100) || 0
        };
      })
      .sort((a, b) => b.customUss.score - a.customUss.score);

    res.status(200).json(rankedStudents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single candidate details
exports.getCandidateDetail = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await StudentProfile.findById(studentId).populate('userId', 'firstName lastName email profileImage');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Log viewed candidate
    const recruiterProfile = await RecruiterProfile.findOne({ userId: req.user.userId });
    if (recruiterProfile) {
      recruiterProfile.viewedCandidates.push({
        studentId: student._id,
        viewedAt: new Date(),
        score: student.uss.score
      });
      await recruiterProfile.save();
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add hiring role
exports.addHiringRole = async (req, res) => {
  try {
    const { title, description, requiredSkills, minimumUss, salary, location, positions } = req.body;

    let profile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    profile.hiringRoles.push({
      title,
      description,
      requiredSkills,
      minimumUss,
      salary,
      location,
      positions
    });

    await profile.save();

    res.status(200).json({
      message: 'Hiring role added successfully',
      role: profile.hiringRoles[profile.hiringRoles.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
