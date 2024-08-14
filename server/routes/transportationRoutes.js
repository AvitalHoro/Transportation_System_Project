const express = require('express');
const { addTransportationת, deleteTransportation, getAllTransportations } = require('../controllers/transportationController'); 

const router = express.Router();

// Route for adding new transportation
router.post('/add', addTransportation);
// Route for deleting a transportation
router.delete('/transportation', deleteTransportation);
// Route for getting all transportations
router.get('/all', getAllTransportations);


module.exports = router;
