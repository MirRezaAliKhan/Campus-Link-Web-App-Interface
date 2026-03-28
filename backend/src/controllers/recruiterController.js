const prisma = require('../config/prismaClient');
const USSCalculator = require('../utils/USSCalculator');
const calculator = new USSCalculator();

function parseRecruiterProfile(profile) {
  const result = { ...profile };
  try { result.scoringWeights = JSON.parse(profile.scoringWeights || '{}'); } catch { result.scoringWeights = {}; }
  try { result.filterPreferences = JSON.parse(profile.filterPreferences || '{}'); } catch { result.filterPreferences = {}; }
  try { result.viewedCandidates = JSON.parse(profile.viewedCandidates || '[]'); } catch { result.viewedCandidates = []; }
  try { result.hiringRoles = JSON.parse(profile.hiringRoles || '[]'); } catch { result.hiringRoles = []; }
  return result;
}

exports.getProfile = async (req, res) => {
  try {
    const profile = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });

    if (!profile) return res.status(404).json({ message: 'Recruiter profile not found' });

    res.status(200).json(parseRecruiterProfile(profile));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { companyName, industry, companySize, location, companyWebsite, description } = req.body;
    const existing = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!existing) return res.status(404).json({ message: 'Recruiter profile not found' });

    const profile = await prisma.recruiterProfile.update({
      where: { id: existing.id },
      data: {
        companyName: companyName ?? existing.companyName,
        industry: industry ?? existing.industry,
        companySize: companySize ?? existing.companySize,
        location: location ?? existing.location,
        companyWebsite: companyWebsite ?? existing.companyWebsite,
        description: description !== undefined ? description : existing.description
      }
    });

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateScoringWeights = async (req, res) => {
  try {
    const { academics, skills, projects, experience, achievements, verificationBonus } = req.body;
    const existing = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!existing) return res.status(404).json({ message: 'Recruiter profile not found' });

    const parsedExisting = parseRecruiterProfile(existing);
    const scoringWeights = { ...parsedExisting.scoringWeights };
    if (academics !== undefined) scoringWeights.academics = academics;
    if (skills !== undefined) scoringWeights.skills = skills;
    if (projects !== undefined) scoringWeights.projects = projects;
    if (experience !== undefined) scoringWeights.experience = experience;
    if (achievements !== undefined) scoringWeights.achievements = achievements;
    if (verificationBonus !== undefined) scoringWeights.verificationBonus = verificationBonus;

    const profile = await prisma.recruiterProfile.update({
      where: { id: existing.id },
      data: { scoringWeights: JSON.stringify(scoringWeights) }
    });

    res.status(200).json({ message: 'Scoring weights updated successfully', weights: profile.scoringWeights });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateFilterPreferences = async (req, res) => {
  try {
    const { minimumUssScore, minimumCgpa, preferredSkills, verifiedOnly, preferredBranches, preferredYears } = req.body;
    const existing = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!existing) return res.status(404).json({ message: 'Recruiter profile not found' });

    const parsedExisting = parseRecruiterProfile(existing);
    const filterPreferences = { ...parsedExisting.filterPreferences };
    if (minimumUssScore !== undefined) filterPreferences.minimumUssScore = minimumUssScore;
    if (minimumCgpa !== undefined) filterPreferences.minimumCgpa = minimumCgpa;
    if (preferredSkills !== undefined) filterPreferences.preferredSkills = preferredSkills;
    if (verifiedOnly !== undefined) filterPreferences.verifiedOnly = verifiedOnly;
    if (preferredBranches !== undefined) filterPreferences.preferredBranches = preferredBranches;
    if (preferredYears !== undefined) filterPreferences.preferredYears = preferredYears;

    const profile = await prisma.recruiterProfile.update({
      where: { id: existing.id },
      data: { filterPreferences: JSON.stringify(filterPreferences) }
    });

    res.status(200).json({ message: 'Filter preferences updated successfully', preferences: profile.filterPreferences });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const recruiterProfileRecord = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!recruiterProfileRecord) return res.status(404).json({ message: 'Recruiter profile not found' });

    const recruiterProfile = parseRecruiterProfile(recruiterProfileRecord);

    const weights = {
      academics: (recruiterProfile.scoringWeights.academics ?? 0) / 100,
      skills: (recruiterProfile.scoringWeights.skills ?? 0) / 100,
      projects: (recruiterProfile.scoringWeights.projects ?? 0) / 100,
      experience: (recruiterProfile.scoringWeights.experience ?? 0) / 100,
      achievements: (recruiterProfile.scoringWeights.achievements ?? 0) / 100,
      verificationBonus: (recruiterProfile.scoringWeights.verificationBonus ?? 0) / 100
    };

    const students = await prisma.studentProfile.findMany({
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true, profileImage: true }
        }
      }
    });

    const parsedStudents = students.map(student => ({
      ...student,
      skills: JSON.parse(student.skills || '[]'),
      projects: JSON.parse(student.projects || '[]'),
      internships: JSON.parse(student.internships || '[]'),
      achievements: JSON.parse(student.achievements || '[]'),
      uss: JSON.parse(student.uss || '{}')
    }));

    const filtered = parsedStudents.filter(student => {
      if ((student.uss?.score ?? 0) < (recruiterProfile.filterPreferences.minimumUssScore ?? 0)) return false;
      if (student.cgpa < (recruiterProfile.filterPreferences.minimumCgpa ?? 0)) return false;

      if (recruiterProfile.filterPreferences.verifiedOnly && (student.uss?.verificationPercentage ?? 0) < 50) return false;
      if (recruiterProfile.filterPreferences.preferredBranches?.length > 0 && !recruiterProfile.filterPreferences.preferredBranches.includes(student.branch)) return false;
      if (recruiterProfile.filterPreferences.preferredYears?.length > 0 && !recruiterProfile.filterPreferences.preferredYears.includes(student.currentYear)) return false;
      return true;
    });

    const rankedStudents = filtered
      .map(student => {
        const customUss = calculator.calculateUSS({
          cgpa: student.cgpa,
          skills: student.skills || [],
          projects: student.projects || [],
          internships: student.internships || [],
          achievements: student.achievements || []
        }, weights);

        const matchedSkills = (student.skills || []).filter(skill => recruiterProfile.filterPreferences.preferredSkills?.includes(skill.name)).length;
        const matchPercentage = recruiterProfile.filterPreferences.preferredSkills?.length > 0
          ? Math.round((matchedSkills / recruiterProfile.filterPreferences.preferredSkills.length) * 100)
          : 0;

        return { ...student, customUss, matchedSkillsCount: matchedSkills, matchPercentage };
      })
      .sort((a, b) => (b.customUss?.score ?? 0) - (a.customUss?.score ?? 0));

    res.status(200).json(rankedStudents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCandidateDetail = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await prisma.studentProfile.findUnique({
      where: { id: Number(studentId) },
      include: { user: { select: { firstName: true, lastName: true, email: true, profileImage: true } } }
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const recruiterProfile = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (recruiterProfile) {
      const parsedRecruiter = parseRecruiterProfile(recruiterProfile);
      const viewedCandidates = [
        ...parsedRecruiter.viewedCandidates,
        { studentId: student.id, viewedAt: new Date().toISOString(), score: student.uss?.score ?? 0 }
      ];
      await prisma.recruiterProfile.update({ where: { id: recruiterProfile.id }, data: { viewedCandidates: JSON.stringify(viewedCandidates) } });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addHiringRole = async (req, res) => {
  try {
    const { title, description, requiredSkills, minimumUss, salary, location, positions } = req.body;
    const profile = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Recruiter profile not found' });

    const parsedProfile = parseRecruiterProfile(profile);
    const hiringRoles = [
      ...parsedProfile.hiringRoles,
      { title, description, requiredSkills, minimumUss, salary, location, positions }
    ];

    const updated = await prisma.recruiterProfile.update({
      where: { id: profile.id },
      data: { hiringRoles: JSON.stringify(hiringRoles) }
    });

    res.status(200).json({ message: 'Hiring role added successfully', role: hiringRoles[hiringRoles.length - 1] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
