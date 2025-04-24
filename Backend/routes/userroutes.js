const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/tickets', authMiddleware, requireRole('user'), ticketRoutes);
// router.get('/buses', authMiddleware, requireRole('user'), busRoutes);

module.exports = router;
