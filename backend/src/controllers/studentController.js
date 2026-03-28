const prisma = require('../config/prismaClient');
const USSCalculator = require('../utils/USSCalculator');
const calculator = new USSCalculator();

function parseStudentProfile(profile) {
  const result = { ...profile };
  try { result.skills = JSON.parse(profile.skills || '[]'); } catch { result.skills = []; }
  try { result.projects = JSON.parse(profile.projects || '[]'); } catch { result.projects = []; }
  try { result.internships = JSON.parse(profile.internships || '[]'); } catch { result.internships = []; }
  try { result.achievements = JSON.parse(profile.achievements || '[]'); } catch { result.achievements = []; }
  try { result.uss = JSON.parse(profile.uss || '{}'); } catch { result.uss = {}; }
  return result;
}

async function recalcAndSave(profile) {
  const parsedProfile = parseStudentProfile(profile);
  const ussData = calculator.calculateUSS({
    cgpa: parsedProfile.cgpa,
    skills: parsedProfile.skills,
    projects: parsedProfile.projects,
    internships: parsedProfile.internships,
    achievements: parsedProfile.achievements
  });

  return await prisma.studentProfile.update({
    where: { id: profile.id },
    data: {
      uss: JSON.stringify({
        ...ussData,
        lastCalculated: new Date().toISOString()
      })
    }
  });
}

exports.getProfile = async (req, res) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: Number(req.user.userId) }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.status(200).json(parseStudentProfile(profile));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      university,
      degree,
      branch,
      currentYear,
      cgpa,
      about,
      linkedinUrl,
      portfolioUrl,
      githubUsername
    } = req.body;

    const existingProfile = await prisma.studentProfile.findUnique({
      where: { userId: Number(req.user.userId) }
    });

    if (!existingProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const profileUpdate = {
      university: university ?? existingProfile.university,
      degree: degree ?? existingProfile.degree,
      branch: branch ?? existingProfile.branch,
      currentYear: currentYear ?? existingProfile.currentYear,
      cgpa: cgpa ?? existingProfile.cgpa,
      about: about !== undefined ? about : existingProfile.about,
      linkedinUrl: linkedinUrl ?? existingProfile.linkedinUrl,
      portfolioUrl: portfolioUrl ?? existingProfile.portfolioUrl,
      githubUsername: githubUsername ?? existingProfile.githubUsername
    };

    const profile = await prisma.studentProfile.update({
      where: { id: existingProfile.id },
      data: profileUpdate
    });

    const updatedProfile = await recalcAndSave(profile);

    res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;

    const profile = await prisma.studentProfile.findUnique({
      where: { userId: Number(req.user.userId) }
    });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const parsedProfile = parseStudentProfile(profile);
    const updatedSkills = [...parsedProfile.skills, { name, proficiency, verified: false }];

    const updatedProfile = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: { skills: JSON.stringify(updatedSkills) }
    });

    const recalculated = await recalcAndSave(updatedProfile);

    res.status(200).json({ message: 'Skill added successfully', profile: parseStudentProfile(recalculated) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { title, description, technologies, link, githubLink, startDate, endDate } = req.body;

    const profile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const parsedProfile = parseStudentProfile(profile);
    const updatedProjects = [
      ...parsedProfile.projects,
      { title, description, technologies, link, githubLink, startDate, endDate, verified: false }
    ];

    const updatedProfile = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: { projects: JSON.stringify(updatedProjects) }
    });

    const recalculated = await recalcAndSave(updatedProfile);

    res.status(200).json({ message: 'Project added successfully', profile: parseStudentProfile(recalculated) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addInternship = async (req, res) => {
  try {
    const { company, position, duration, description, startDate, endDate } = req.body;

    const profile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const parsedProfile = parseStudentProfile(profile);
    const updatedInternships = [
      ...parsedProfile.internships,
      { company, position, duration, description, startDate, endDate, verified: false }
    ];

    const updatedProfile = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: { internships: JSON.stringify(updatedInternships) }
    });

    const recalculated = await recalcAndSave(updatedProfile);

    res.status(200).json({ message: 'Internship added successfully', profile: parseStudentProfile(recalculated) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUssSuggestions = async (req, res) => {
  try {
    const profileRecord = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profileRecord) return res.status(404).json({ message: 'Student profile not found' });

    const profile = parseStudentProfile(profileRecord);
    const suggestions = [];
    const breakdown = profile.uss?.breakdown || {};

    if ((breakdown.academicsScore ?? 0) < 70) {
      suggestions.push({ category: 'Academics', current: breakdown.academicsScore ?? 0, suggestion: 'Aim to improve your CGPA. Each 1 point increase can boost your USS by 2 points.', impact: 'High' });
    }

    if ((breakdown.skillsScore ?? 0) < 70) {
      suggestions.push({ category: 'Skills', current: breakdown.skillsScore ?? 0, suggestion: `You have ${profile.skills.length} skills. Add 2-3 more in-demand skills like JavaScript, Python, or React.`, impact: 'High' });
    }

    if ((breakdown.projectsScore ?? 0) < 70) {
      suggestions.push({ category: 'Projects', current: breakdown.projectsScore ?? 0, suggestion: `You have ${profile.projects.length} projects. Add 1-2 more projects showcasing full-stack development.`, impact: 'High' });
    }

    if ((breakdown.experienceScore ?? 0) < 70 && (profile.internships.length ?? 0) === 0) {
      suggestions.push({ category: 'Experience', current: breakdown.experienceScore ?? 0, suggestion: 'Take up an internship or freelance project. Even 1 internship can improve your USS by 15 points.', impact: 'Very High' });
    }

    if ((profile.uss?.verificationPercentage ?? 0) < 50) {
      suggestions.push({ category: 'Verification', current: profile.uss?.verificationPercentage ?? 0, suggestion: 'Verify your skills through assessments. Verified data increases your confidence score and weight in recruiter rankings.', impact: 'Medium' });
    }

    res.status(200).json({ currentUss: profile.uss?.score ?? 0, suggestions, potentialUss: Math.min((profile.uss?.score ?? 0) + 15, 100) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
