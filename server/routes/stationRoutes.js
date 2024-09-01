const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addStation, cancelStation, updateStation, getAllStations, addStationTotransporatstion } = require('../controllers/stationController');

const router = express.Router();
// Route for get all the stations
router.get('/all', authenticateJWT, getAllStations);
// Route for adding a station
router.post('/add', authenticateJWT, addStation);
// Route for adding a station to transporatstion
router.post('/add/:transportationId/:stationId', authenticateJWT, addStationTotransporatstion);
// Route for deleting a station
router.delete('/delete/:stationId', authenticateJWT, cancelStation);
// Route for updeting a station
router.put('/update/:stationId', authenticateJWT, updateStation);

module.exports = router;
