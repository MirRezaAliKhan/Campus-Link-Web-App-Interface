const express = require('express');
const applicationController = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, applicationController.createApplication);
router.get('/student', authMiddleware, applicationController.getStudentApplications);
router.get('/recruiter', authMiddleware, applicationController.getRecruiterApplications);
router.put('/:applicationId/status', authMiddleware, applicationController.updateApplicationStatus);

module.exports = router;
