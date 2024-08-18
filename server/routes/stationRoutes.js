const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addStation, deleteStation } = require('../controllers/stationController');

const router = express.Router();

// Route for adding a station
router.post('/station/add', authenticateJWT, addStation);
// Route for deleting a station
router.delete('/station/delete/:stationId', authenticateJWT, deleteStation);

module.exports = router;
