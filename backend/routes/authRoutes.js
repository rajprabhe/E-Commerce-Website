const express = require('express');
const { registerUser, loginuser, getUsers } = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginuser);
router.get('/users', protect, admin, getUsers)

module.exports = router