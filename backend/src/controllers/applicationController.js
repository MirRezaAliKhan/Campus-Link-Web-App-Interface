const prisma = require('../config/prismaClient');

exports.createApplication = async (req, res) => {
  try {
    const { recruiterId, roleId, roleName, coverLetter } = req.body;

    const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!studentProfile) return res.status(404).json({ message: 'Student profile not found' });

    const existingApp = await prisma.application.findFirst({
      where: { studentId: studentProfile.id, recruiterId: Number(recruiterId), roleId }
    });

    if (existingApp) return res.status(400).json({ message: 'Already applied to this role' });

    const ussScore = studentProfile.uss?.score ?? 0;
    const application = await prisma.application.create({
      data: {
        studentId: studentProfile.id,
        recruiterId: Number(recruiterId),
        roleId,
        roleName,
        coverLetter,
        ussScore,
        matchScore: Math.min(ussScore + 10, 100)
      }
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStudentApplications = async (req, res) => {
  try {
    const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!studentProfile) return res.status(404).json({ message: 'Student profile not found' });

    const applications = await prisma.application.findMany({
      where: { studentId: studentProfile.id },
      include: { recruiter: { include: { user: true } } },
      orderBy: { appliedAt: 'desc' }
    });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRecruiterApplications = async (req, res) => {
  try {
    const recruiterProfile = await prisma.recruiterProfile.findUnique({ where: { userId: Number(req.user.userId) } });
    if (!recruiterProfile) return res.status(404).json({ message: 'Recruiter profile not found' });

    const applications = await prisma.application.findMany({
      where: { recruiterId: recruiterProfile.id },
      include: { student: { include: { user: true } } },
      orderBy: { appliedAt: 'desc' }
    });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    const application = await prisma.application.update({
      where: { id: Number(applicationId) },
      data: { status, statusUpdatedAt: new Date() },
      include: { student: { include: { user: true } } }
    });

    res.status(200).json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
