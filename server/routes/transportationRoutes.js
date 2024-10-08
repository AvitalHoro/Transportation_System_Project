const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { updateStatus, getTransportationsForUser, addTransportation, deleteTransportation, getTransportationsForAdmin, getTransportationsDriver, getTransportationsPassenger, replaceDriver} = require('../controllers/transportationController'); 

const router = express.Router();

// Route for adding new transportation
router.post('/add', authenticateJWT, addTransportation);
// Route for deleting a transportation
router.delete('/delete/:transportationId', authenticateJWT, deleteTransportation);
// Route for getting all transportations
router.get('/all',authenticateJWT, getTransportationsForAdmin);
// Route for getting driver transportations
router.get('/driver/:driverId',authenticateJWT, getTransportationsDriver);
// Route for getting passenger transportations
router.get('/passenger/registration',authenticateJWT, getTransportationsPassenger);
// Route for getting transportations that the user can to register them
router.get('/passenger',authenticateJWT, getTransportationsForUser);
// Route for replacing driver
router.put('/replaceDriver/:transportationId', authenticateJWT, replaceDriver);
// Route for update staus transportation
router.put('/updateStatus/:transportationId', authenticateJWT, updateStatus);
// Route for getting details transportation
// router.get('/:transportationId', authenticateJWT, getDetailsTransportation);

module.exports = router;
