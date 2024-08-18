const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const { registerForTransportation, deleteRegistration, updateStation } = require('../controllers/registrationController');

const router = express.Router();

// Route for registering a user for transportation
router.post('/registration/register', authenticateJWT, registerForTransportation);
// Route for deleting a registration
router.delete('/Registration/delete/:transportationID', authenticateJWT, deleteRegistration);
// Route for updating station details
router.patch('/Registration/update/:transportationID/:stationID', authenticateJWT, updateStation);

module.exports = router;
