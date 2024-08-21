const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addStation, cancelStation, updateStation } = require('../controllers/stationController');

const router = express.Router();

// Route for adding a station
router.post('/add/:transportationId', authenticateJWT, addStation);
// Route for deleting a station
router.delete('/delete/:stationId', authenticateJWT, cancelStation);
// Route for updeting a station
router.put('/delete/:stationId', authenticateJWT, updateStation);

module.exports = router;
