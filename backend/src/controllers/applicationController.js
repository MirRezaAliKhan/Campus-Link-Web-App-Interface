const Application = require('../models/Application');
const StudentProfile = require('../models/StudentProfile');
const RecruiterProfile = require('../models/RecruiterProfile');

// Create application
exports.createApplication = async (req, res) => {
  try {
    const { recruiterId, roleId, roleName, coverLetter } = req.body;

    // Get student profile to get their USS score
    const studentProfile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Check if already applied
    const existingApp = await Application.findOne({
      studentId: studentProfile._id,
      recruiterId,
      roleId
    });

    if (existingApp) {
      return res.status(400).json({ message: 'Already applied to this role' });
    }

    const application = new Application({
      studentId: studentProfile._id,
      recruiterId,
      roleId,
      roleName,
      coverLetter,
      ussScore: studentProfile.uss.score,
      matchScore: calculateMatchScore(studentProfile, recruiterId)
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get student applications
exports.getStudentApplications = async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findOne({ userId: req.user.userId });

    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const applications = await Application.find({ studentId: studentProfile._id })
      .populate('recruiterId');

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get recruiter applications
exports.getRecruiterApplications = async (req, res) => {
  try {
    const recruiterProfile = await RecruiterProfile.findOne({ userId: req.user.userId });

    if (!recruiterProfile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    const applications = await Application.find({ recruiterId: recruiterProfile._id })
      .populate('studentId')
      .sort({ appliedAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { 
        status,
        statusUpdatedAt: new Date()
      },
      { new: true }
    ).populate('studentId');

    res.status(200).json({
      message: 'Application status updated',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to calculate match score
function calculateMatchScore(studentProfile, recruiterId) {
  // Simple match calculation (can be enhanced)
  return Math.min(studentProfile.uss.score + 10, 100);
}
