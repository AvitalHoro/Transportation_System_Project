const express = require('express');
const { login, registerUser, logout, getUsers } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT'); 

const router = express.Router();

// Route for login
router.post('/login', login);
// Route for user registration
router.post('/register', registerUser); 
// Route for logout
router.post('/logout', authenticateJWT, logout); 
// Route for get user of specific type
router.get('/getUsers/:typeUser', authenticateJWT, getUsers); 

module.exports = router;