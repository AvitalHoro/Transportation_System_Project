const express = require('express');
const { login, registerUser, logout } = require('../controllers/userController');

const router = express.Router();

// Route for login
router.post('/login', login);
// Route for user registration
router.post('/register', registerUser); 
// Route for logout
router.post('/logout', logout); 

module.exports = router;
