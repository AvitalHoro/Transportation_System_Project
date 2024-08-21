const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const { registerForTransportation, deleteRegistration, updateStation } = require('../controllers/registrationController');

const router = express.Router();

// Route for registering a user for transportation
router.post('/register', authenticateJWT, registerForTransportation);
// Route for deleting a registration
router.delete('/delete/:transportationID', authenticateJWT, deleteRegistration);
// Route for updating station details
router.patch('/update/:transportationID/:stationID', authenticateJWT, updateStation);

module.exports = router;
