const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addMessageForEveryOne, addTransportationMessage, getGeneralMessages, getMessagesOfTransportation } = require('../controllers/messageController');

const router = express.Router();

// Route for send a message to everyone
router.post('/add', authenticateJWT, addMessageForEveryOne);
// Route for send a message to passengers of a specific transportation
router.post('/add/:transportationId', authenticateJWT, addTransportationMessage);
// Route for getting general messages
router.get('/generals',authenticateJWT, getGeneralMessages);
// Route for getting transportation messages 
router.get('/transportation/:transportationId', authenticateJWT, getMessagesOfTransportation);
// // Route for getting transportation messages 
// router.get('/passenger', authenticateJWT, getMessagesForUser);

// Route for confirmation of the delivery of the message
//router.post('/:messageId/confirm',authenticateJWT, confirmMessageDelivery);

module.exports = router;
