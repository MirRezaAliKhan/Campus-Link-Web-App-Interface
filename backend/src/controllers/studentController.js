const prisma = require('../config/prismaClient');
const USSCalculator = require('../utils/USSCalculator');
const calculator = new USSCalculator();

function parseStudentProfile(profile) {
  const result = { ...profile };
  try { result.skills = JSON.parse(profile.skills || '[]'); } catch { result.skills = []; }
  try { result.projects = JSON.parse(profile.projects || '[]'); } catch { result.projects = []; }
  try { result.internships = JSON.parse(profile.internships || '[]'); } catch { result.internships = []; }
  try { result.achievements = JSON.parse(profile.achievements || '[]'); } catch { result.achievements = []; }
  try { result.careerGoals = JSON.parse(profile.careerGoals || '[]'); } catch { result.careerGoals = []; }
  try { result.readinessMetrics = JSON.parse(profile.readinessMetrics || '{}'); } catch { result.readinessMetrics = {}; }
  try { result.uss = JSON.parse(profile.uss || '{}'); } catch { result.uss = {}; }
  return result;
}

function parseCareerPlan(plan) {
  const result = { ...plan };
  try { result.goals = JSON.parse(plan.goals || '[]'); } catch { result.goals = []; }
  try { result.nextActions = JSON.parse(plan.nextActions || '[]'); } catch { result.nextActions = []; }
  return result;
}

function calculateCareerReadiness(profile) {
  const ussData = calculator.calculateUSS(profile);
  const hasGoals = Array.isArray(profile.careerGoals) && profile.careerGoals.length > 0;
  const hasBranding = !!(profile.linkedinUrl || profile.portfolioUrl || profile.githubUsername);
  const goalAlignment = hasGoals ? 85 : 45;
  const brandingScore = hasBranding ? 80 : 40;
  const mentorReadiness = (ussData.verificationPercentage ?? 0) > 50 ? 85 : 55;
  const readinessScore = Math.min(
    ussData.score * 0.65 + goalAlignment * 0.18 + brandingScore * 0.12 + mentorReadiness * 0.05,
    100
  );

  return {
    readinessScore: Math.round(readinessScore * 100) / 100,
    components: {
      ussScore: ussData.score,
      goalAlignment: Math.round(goalAlignment),
      professionalBranding: Math.round(brandingScore),
      mentorReadiness: Math.round(mentorReadiness)
    }
  };
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
  const readinessMetrics = calculateCareerReadiness({
    ...parsedProfile,
    uss: ussData
  });

  return await prisma.studentProfile.update({
    where: { id: profile.id },
    data: {
      uss: JSON.stringify({
        ...ussData,
        lastCalculated: new Date().toISOString()
      }),
      readinessMetrics: JSON.stringify(readinessMetrics)
    }
  });
}

async function getOrCreateCareerPlan(studentId) {
  const existing = await prisma.careerPlan.findUnique({ where: { studentId } });
  if (existing) return existing;
  return await prisma.careerPlan.create({
    data: {
      studentId,
      goals: JSON.stringify([]),
      nextActions: JSON.stringify([])
    }
  });
}

exports.getProfile = async (req, res) => {
  try {
    const profileRecord = await prisma.studentProfile.findUnique({
      where: { userId: Number(req.user.userId) }
    });

    if (!profileRecord) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const profile = parseStudentProfile(profileRecord);
    const careerPlan = await getOrCreateCareerPlan(profile.id);

    res.status(200).json({
      ...profile,
      careerPlan: parseCareerPlan(careerPlan)
    });
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
    const careerPlan = await getOrCreateCareerPlan(existingProfile.id);

    res.status(200).json({ message: 'Profile updated successfully', profile: parseStudentProfile(updatedProfile), careerPlan: parseCareerPlan(careerPlan) });
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

    const readiness = calculateCareerReadiness(profile);
    const roadmap = [
      { action: 'Strengthen your top skills', description: 'Add 1-2 verified skills to improve your Career Readiness Score.', impact: 'High' },
      { action: 'Publish a stronger project', description: 'Add a portfolio project with links and verification to boost recruiter confidence.', impact: 'Medium' },
      { action: 'Add career goals', description: 'Set 2-3 career goals so the platform can recommend better-fit roles and mentorship.', impact: 'High' }
    ];

    res.status(200).json({
      currentUss: profile.uss?.score ?? 0,
      readinessScore: readiness.readinessScore,
      readinessComponents: readiness.components,
      suggestions,
      roadmap,
      potentialUss: Math.min((profile.uss?.score ?? 0) + 15, 100)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCareerPlan = async (req, res) => {
  try {
    const profile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const plan = await getOrCreateCareerPlan(profile.id);
    res.status(200).json(parseCareerPlan(plan));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCareerGoals = async (req, res) => {
  try {
    const { goals, nextActions } = req.body;
    const profile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const plan = await getOrCreateCareerPlan(profile.id);
    const updatedPlan = await prisma.careerPlan.update({
      where: { id: plan.id },
      data: {
        goals: JSON.stringify(goals || []),
        nextActions: JSON.stringify(nextActions || [])
      }
    });

    const updatedProfile = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: { careerGoals: JSON.stringify(goals || []) }
    });

    await recalcAndSave(updatedProfile);

    res.status(200).json({ message: 'Career goals updated', careerPlan: parseCareerPlan(updatedPlan) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createMentorRequest = async (req, res) => {
  try {
    const { subject, message, mentorUserId } = req.body;
    const profile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const request = await prisma.mentorRequest.create({
      data: {
        studentId: profile.id,
        subject,
        message,
        mentorUserId: mentorUserId ? Number(mentorUserId) : null
      }
    });

    res.status(201).json({ message: 'Mentor request created', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMentorRequests = async (req, res) => {
  try {
    const profile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!profile) return res.status(404).json({ message: 'Student profile not found' });

    const requests = await prisma.mentorRequest.findMany({
      where: { studentId: profile.id },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
