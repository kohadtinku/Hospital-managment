// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, registerDoctor } = require('../controllers/authController');
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');

router.post('/login', login);
// only admin can create doctors
router.post('/register-doctor', protect, allowRoles('admin'), registerDoctor);

module.exports = router;
