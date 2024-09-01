const db = require('../config/db');


const insertMessage = async (db, userId, messageText, sendTime) => {
    console.log('insert message to the database')
    const insertMessageQuery = 'INSERT INTO Message (SenderID, MessageText, Message_Status, SendTime) VALUES (?, ?, ?, ?)';
    
    const [results] = await db.query(insertMessageQuery, [userId, messageText, 'Sent', sendTime]);
    return results.insertId;
};

//update status message to "Delivered"
const updateStatusMessage = async (db, messageId) => {
    const db1 = req.db; 

    const updateMessageStatusQuery = 'UPDATE Message SET Message_Status = ? WHERE MessageID = ?';
    
    const [results] = await db1.query(updateMessageStatusQuery, ['Delivered', messageId]);
    return results;
};

const getRegisteredUsers = async (db, transportationId) => {
    const getRegisteredUsersQuery = `
        SELECT u.UserID
        FROM Users u
        JOIN Registrations_To_Transportation rtt ON u.UserID = rtt.UserID
        WHERE rtt.TransportationID = ?
    `;

    const [results] = await db.query(getRegisteredUsersQuery, [transportationId]);
    return results;
};

const addMessageForEveryOne = async (req, res) => {
    const { messageText, sendTime, attachedFiles } = req.body;
    const userId = req.userId;
    const db = req.db;

    // Validate input
    if (!messageText || !sendTime) {
        return res.status(400).json({ message: 'messageText and sendTime are required' });
    }

    try {
        // Check user permissions
        const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
        const [permissionResults] = await db.query(checkPermissionQuery, [userId]);

        if (permissionResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = permissionResults[0].UserPermission;

        if (userPermission !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Insert new message and general message
        const messageId = await insertMessage(db, userId, messageText, sendTime);
        
        const insertGeneralMessageQuery = 'INSERT INTO General_Message (AttachedFiles, MessageID) VALUES (?, ?)';
        await db.query(insertGeneralMessageQuery, [attachedFiles, messageId]);

        const changeStatus = await updateStatusMessage(db, messageId);

        if (changeStatus.affectedRows === 1) {
            res.status(201).json({ message: 'General Message added successfully', messageId });
        }
        else {
            res.status(500).json({ message: 'Error send message', messageId });
        }

    } catch (err) {
        res.status(500).json({ message: 'Error send message', error: err });
    }
};

const addTransportationMessage = async (req, res) => {
    const { transportationId } = req.params; 
    const { messageText, sendTime } = req.body;
    const userId = req.userId; 
    const db = req.db;

    // Validate input
    if (!messageText || !sendTime || !transportationId) {
        return res.status(400).json({ message: 'transportationId, messageText and sendTime are required' });
    }
    
    try {
        // Check user permissions
        const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
        const [permissionResults] = await db.query(checkPermissionQuery, [userId]);

        if (permissionResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = permissionResults[0].UserPermission;

        if (userPermission !== 'admin' && userPermission !== 'driver') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Insert new message and transportation message
        const messageId = await insertMessage(db, userId, messageText, sendTime);
        
        const insertTransportationMessageQuery = 'INSERT INTO Message_To_Transportation (TransportationID, MessageID) VALUES (?, ?)';
        await db.query(insertTransportationMessageQuery, [transportationId, messageId]);

        const changeStatus = await updateStatusMessage(db, messageId);

        if (!changeStatus.affectedRows) {
            res.status(500).json({ message: 'Error send message', messageId });
        }
        else {
            // Get registered users
            const registeredUsers = await getRegisteredUsers(db, transportationId);

            // Return response with messageId and registered user IDs
            res.status(201).json({ 
                message: 'Transportation Message added successfully', 
                messageId, 
                registeredUsers: registeredUsers.map(user => user.UserID)
            });        
        }

    } catch (err) {
        res.status(500).json({ message: 'Error send message', error: err });
    }
};

// const confirmMessageDelivery = async (req, res) => {
//     const db = req.db;
//     const { messageId } = req.params;
//     const { deliveryConfirmation } = req.body;

//     if (deliveryConfirmation !== 'OK') {
//         return res.status(400).json({ message: 'Invalid confirmation status' });
//     }

//     try {
//         const updateMessageStatusQuery = 'UPDATE Message SET Message_Status = ? WHERE MessageID = ?';
//         await db.query(updateMessageStatusQuery, ['Delivered', messageId]);
//         res.status(200).json({ message: 'Message status updated to Delivered' });

//     } catch (err) {
//         res.status(500).json({ message: 'Error updating message status', error: err });
//     }
// };

const getGeneralMessages = async (req, res) => {
    const db = req.db;

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

// const getMessagesForUser = async (req, res) => {
//     const db = req.db;
//     const userId = req.userId;

//     try {
//         // Get the transportation IDs the user is registered for
//         const transportations = await getTransportationsOfPassenger(userId);
        
//         if (transportations.length === 0) {
//             return res.status(404).json({ message: 'No trips found for this user' });
//         }
//         // Extract transportation IDs
//         const transportationIds = transportations.map(t => t.TransportationID);

//         const getMessagesQuery = `
//             SELECT 
//                 m.MessageID,
//                 m.SenderID,
//                 m.MessageText,
//                 m.Message_Status,
//                 m.SendTime,
//                 mto.TransportationID
//             FROM 
//                 Message m
//             JOIN 
//                 Message_To_Transportation mto ON m.MessageID = mto.MessageID
//             WHERE 
//                 mto.TransportationID IN (?)
//         `;
        
//         const [messagesResults] = await db.query(getMessagesQuery, [transportationIds]);

//         res.status(200).json({ messages: messagesResults });
//     } catch (err) {
//         res.status(500).json({ message: 'Error retrieving messages', error: err });
//     }
// };

const getMessagesOfTransportation = async (req, res) => {
    const { transportationId } = req.params; 
    const userId = req.userId; 
    const db = req.db;
    
    try {
        // Check user permissions
        const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
        const [permissionResults] = await db.query(checkPermissionQuery, [userId]);

        if (permissionResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = permissionResults[0].UserPermission;

        if (userPermission !== 'admin' && userPermission !== 'driver') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // return the messges of this transportationId
        
        const message_of_transportation_query = `SELECT 
                                                    m.MessageID, m.SenderID, u.UserPermission, m.MessageText, m.Message_Status, m.SendTime
                                                FROM 
                                                    Message_To_Transportation mt
                                                JOIN 
                                                    Message m ON mt.MessageID = m.MessageID
                                                JOIN 
                                                    Users u ON m.SenderID = u.UserID
                                                WHERE 
                                                    mt.TransportationID = ?;
                                                    `;
        await db.query(message_of_transportation_query, [transportationId]);

        // Get registered users
        const messagesOfTransportation = await getRegisteredUsers(db, transportationId);

        // Return ok response with the messages
        res.status(200).json({ messages: messagesOfTransportation });

    } catch (err) {
        res.status(500).json({ message: 'Error inserting message', error: err });
    }
};

module.exports = { addMessageForEveryOne, addTransportationMessage, getGeneralMessages, getMessagesOfTransportation};
