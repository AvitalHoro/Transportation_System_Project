const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addTransportation, deleteTransportation, getAllTransportations, getTransportationsOfDriver, getTransportationsOfPassenger, replaceDriver, getDetailsTransportation} = require('../controllers/transportationController'); 

const router = express.Router();

// Route for adding new transportation
router.post('transportation/add', authenticateJWT, addTransportation);
// Route for deleting a transportation
router.delete('/transportation/delete/:transportationId', authenticateJWT, deleteTransportation);
// Route for getting all transportations
router.get('/transportation/all', getAllTransportations);
// Route for getting driver transportations
router.get('/transportation/driver', getTransportationsOfDriver);
// Route for getting passenger transportations
router.get('/transportation/passenger', getTransportationsOfPassenger);
// Route for replacing driver
router.put('/transportation/replace-driver/:transportationId', authenticateJWT, replaceDriver);
// Route for getting details transportation
router.get('/transportation/:transportationId', authenticateJWT, getDetailsTransportation);

module.exports = router;
