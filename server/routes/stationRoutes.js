const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addStation, cancelStation, updateStation, getAllStations } = require('../controllers/stationController');

const router = express.Router();
// Route for get all the stations
router.get('/all', authenticateJWT, getAllStations);
// Route for adding a station
router.post('/add/:transportationId', authenticateJWT, addStation);
// Route for deleting a station
router.delete('/delete/:stationId', authenticateJWT, cancelStation);
// Route for updeting a station
router.put('/update/:stationId', authenticateJWT, updateStation);

module.exports = router;
