const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT'); 
const { addMessageForEveryOne, addTransportationMessage, confirmMessageDelivery, getGeneralMessages, getMessagesForUser } = require('../controllers/messageController');

const router = express.Router();

// Route for send a message to everyone
router.post('/message/add', authenticateJWT, addMessageForEveryOne);
// Route for send a message to passengers of a specific transportation
router.delete('/message/delete/:transportationId', authenticateJWT, addTransportationMessage);
// Route for confirmation of the delivery of the message
router.post('/messages/:messageId/confirm', confirmMessageDelivery);
// Route for getting general messages
router.get('/messages/generals', getGeneralMessages);
// Route for getting transportation messages 
router.get('/messages/passenger', authenticateJWT, getMessagesForUser);

module.exports = router;
