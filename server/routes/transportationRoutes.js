const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addTransportation, deleteTransportation, getTransportations, getTransportationsDriver, getTransportationsPassenger, replaceDriver, getDetailsTransportation} = require('../controllers/transportationController'); 

const router = express.Router();

// Route for adding new transportation
router.post('/add', authenticateJWT, addTransportation);
// Route for deleting a transportation
router.delete('/delete/:transportationId', authenticateJWT, deleteTransportation);
// Route for getting all transportations
router.get('/all',authenticateJWT, getTransportations);
// Route for getting driver transportations
router.get('/driver',authenticateJWT, getTransportationsDriver);
// Route for getting passenger transportations
router.get('/passenger',authenticateJWT, getTransportationsPassenger);
// Route for replacing driver
router.put('/replace-driver/:transportationId', authenticateJWT, replaceDriver);
// Route for getting details transportation
router.get('/:transportationId', authenticateJWT, getDetailsTransportation);

module.exports = router;
