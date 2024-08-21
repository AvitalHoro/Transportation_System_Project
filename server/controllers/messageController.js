const db = require('../config/db');

const insertMessage = async (userId, messageText, sendTime) => {
    const insertMessageQuery = 'INSERT INTO Message (SenderID, MessageText, Message_Status, SendTime) VALUES (?, ?, ?, ?)';
    
    return new Promise((resolve, reject) => {
        db.query(insertMessageQuery, [userId, messageText, 'Sent', sendTime], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.insertId);
        });
    });
};

const getRegisteredUsers = async (transportationId) => {
    const getRegisteredUsersQuery = `
        SELECT u.UserID
        FROM Users u
        JOIN Registrations_To_Transportation rtt ON u.UserID = rtt.UserID
        WHERE rtt.TransportationID = ?
    `;

    return new Promise((resolve, reject) => {
        db.query(getRegisteredUsersQuery, [transportationId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const addMessageForEveryOne = async (req, res) => {
    const { messageText, sendTime, attachedFiles } = req.body;
    const userId = req.userId;

    // Validate input
    if (!messageText || !sendTime) {
        return res.status(400).json({ message: 'messageText and sendTime are required' });
    }

    try {
        // Check user permissions
        const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
        const permissionResults = await new Promise((resolve, reject) => {
            db.query(checkPermissionQuery, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (permissionResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = permissionResults[0].UserPermission;

        if (userPermission !== 'Manager') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Insert new message and general message
        const messageId = await insertMessage(userId, messageText, sendTime);
        
        const insertGeneralMessageQuery = 'INSERT INTO General_Message (AttachedFiles, MessageID) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(insertGeneralMessageQuery, [attachedFiles, messageId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        res.status(201).json({ message: 'General Message added successfully', messageId });

    } catch (err) {
        res.status(500).json({ message: 'Error inserting message', error: err });
    }
};

const addTransportationMessage = async (req, res) => {
    const { transportationId } = req.params; 
    const { messageText, sendTime } = req.body;
    const userId = req.userId; 

    // Validate input
    if (!messageText || !sendTime || !transportationId) {
        return res.status(400).json({ message: 'transportationId, messageText and sendTime are required' });
    }
    
    try {
        // Check user permissions
        const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
        const permissionResults = await new Promise((resolve, reject) => {
            db.query(checkPermissionQuery, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (permissionResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = permissionResults[0].UserPermission;

        if (userPermission !== 'Manager' && userPermission !== 'Driver') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Insert new message and transportation message
        const messageId = await insertMessage(userId, messageText, sendTime);
        
        const insertTransportationMessageQuery = 'INSERT INTO Message_To_Transportation (TransportationID, MessageID) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(insertTransportationMessageQuery, [transportationId, messageId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        // Get registered users
        const registeredUsers = await getRegisteredUsers(transportationId);

        // Return response with messageId and registered user IDs
        res.status(201).json({ 
            message: 'Transportation Message added successfully', 
            messageId, 
            registeredUsers: registeredUsers.map(user => user.UserID)
        });

    } catch (err) {
        res.status(500).json({ message: 'Error inserting message', error: err });
    }
};

const confirmMessageDelivery = async (req, res) => {
    const { messageId } = req.params;
    const { deliveryConfirmation } = req.body;

    if (deliveryConfirmation !== 'OK') {
        return res.status(400).json({ message: 'Invalid confirmation status' });
    }

    try {
        const updateMessageStatusQuery = 'UPDATE Message SET Message_Status = ? WHERE MessageID = ?';
        await new Promise((resolve, reject) => {
            db.query(updateMessageStatusQuery, ['Delivered', messageId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        res.status(200).json({ message: 'Message status updated to Delivered' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating message status', error: err });
    }
};

const getGeneralMessages = async (req, res) => {
    try {
        const getGeneralMessagesQuery = `
            SELECT 
                m.MessageID,
                m.SenderID,
                m.MessageText,
                m.Message_Status,
                m.SendTime,
                gm.AttachedFiles
            FROM 
                General_Message gm
            JOIN 
                Message m ON gm.MessageID = m.MessageID
        `;

        const [generalMessagesResults] = await db.query(getGeneralMessagesQuery);

        res.status(200).json({ messages: generalMessagesResults });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving general messages', error: err });
    }
};


const getMessagesForUser = async (req, res) => {
    const userId = req.userId;

    try {
        // Get the transportation IDs the user is registered for
        const transportations = await getTransportationsOfPassenger(userId);
        
        if (transportations.length === 0) {
            return res.status(404).json({ message: 'No trips found for this user' });
        }
        // Extract transportation IDs
        const transportationIds = transportations.map(t => t.TransportationID);

        const getMessagesQuery = `
            SELECT 
                m.MessageID,
                m.SenderID,
                m.MessageText,
                m.Message_Status,
                m.SendTime,
                mto.TransportationID
            FROM 
                Message m
            JOIN 
                Message_To_Transportation mto ON m.MessageID = mto.MessageID
            WHERE 
                mto.TransportationID IN (?)
        `;
        
        const [messagesResults] = await db.query(getMessagesQuery, [transportationIds]);

        res.status(200).json({ messages: messagesResults });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving messages', error: err });
    }
};

module.exports = { addMessageForEveryOne, addTransportationMessage, confirmMessageDelivery, getGeneralMessages, getMessagesForUser};
