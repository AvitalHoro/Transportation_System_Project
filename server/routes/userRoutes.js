const express = require('express');
const { login, registerUser } = require('../controllers/userController');

const router = express.Router();

// Route for login
router.post('/login', login);
// Route for user registration
router.post('/register', registerUser); 

module.exports = router;
