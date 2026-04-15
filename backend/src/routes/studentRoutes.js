const express = require('express');
const studentController = require('../controllers/studentController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authMiddleware, roleMiddleware('student'), studentController.getProfile);
router.put('/profile', authMiddleware, roleMiddleware('student'), studentController.updateProfile);
router.post('/skills', authMiddleware, roleMiddleware('student'), studentController.addSkill);
router.post('/projects', authMiddleware, roleMiddleware('student'), studentController.addProject);
router.post('/internships', authMiddleware, roleMiddleware('student'), studentController.addInternship);
router.get('/uss-suggestions', authMiddleware, roleMiddleware('student'), studentController.getUssSuggestions);
router.get('/career-plan', authMiddleware, roleMiddleware('student'), studentController.getCareerPlan);
router.post('/career-goals', authMiddleware, roleMiddleware('student'), studentController.updateCareerGoals);
router.get('/roles', authMiddleware, roleMiddleware('student'), studentController.getAvailableRoles);
router.post('/mentor-requests', authMiddleware, roleMiddleware('student'), studentController.createMentorRequest);
router.get('/mentor-requests', authMiddleware, roleMiddleware('student'), studentController.getMentorRequests);

module.exports = router;
