const express = require('express');
const recruiterController = require('../controllers/recruiterController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authMiddleware, roleMiddleware('recruiter'), recruiterController.getProfile);
router.put('/profile', authMiddleware, roleMiddleware('recruiter'), recruiterController.updateProfile);
router.put('/weights', authMiddleware, roleMiddleware('recruiter'), recruiterController.updateScoringWeights);
router.put('/filters', authMiddleware, roleMiddleware('recruiter'), recruiterController.updateFilterPreferences);
router.get('/candidates', authMiddleware, roleMiddleware('recruiter'), recruiterController.getCandidates);
router.get('/candidates/:studentId', authMiddleware, roleMiddleware('recruiter'), recruiterController.getCandidateDetail);
router.post('/roles', authMiddleware, roleMiddleware('recruiter'), recruiterController.addHiringRole);

module.exports = router;
