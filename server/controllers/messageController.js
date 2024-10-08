const db = require('../config/db');


const insertMessage = async (db, userId, messageText, sendTime) => {
    console.log('insert message to the database')
    const insertMessageQuery = 'INSERT INTO Message (SenderID, MessageText, Message_Status, SendTime) VALUES (?, ?, ?, ?)';
    
    const [results] = await db.query(insertMessageQuery, [userId, messageText, 'active', sendTime]);
    return results.insertId;
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
    const { messageContent, sendTime, attachedFiles } = req.body;
    const userId = req.userId;
    const db = req.db;
    console.log('addMessageForEveryOne')
    console.log(messageContent, sendTime, attachedFiles)

    // Validate input
    if (!messageContent || !sendTime) {
        return res.status(400).json({ message: 'messageContent and sendTime are required' });
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
        const messageId = await insertMessage(db, userId, messageContent, sendTime);
        
        const insertGeneralMessageQuery = 'INSERT INTO General_Message (AttachedFiles, MessageID) VALUES (?, ?)';
        await db.query(insertGeneralMessageQuery, [attachedFiles, messageId]);
        res.status(201).json({ message: 'General Message added successfully', messageId });

    } catch (err) {
        res.status(500).json({ message: 'Error send message', error: err });
    }
};

const addTransportationMessage = async (req, res) => {
    const { transportationId } = req.params; 
    const { messageContent, sendTime } = req.body;
    const userId = req.userId; 
    const db = req.db;

    console.log(transportationId, messageContent, sendTime, userId);

    // Validate input
    if (!messageContent || !sendTime || !transportationId) {
        return res.status(400).json({ message: 'transportationId, messageContent and sendTime are required' });
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

        const sendTimeSQL = new Date(sendTime);

        console.log('sendTimeSQL:', sendTimeSQL);

        // Insert new message and transportation message
        const messageId = await insertMessage(db, userId, messageContent, sendTimeSQL);
        
        const insertTransportationMessageQuery = 'INSERT INTO Message_To_Transportation (TransportationID, MessageID) VALUES (?, ?)';
        await db.query(insertTransportationMessageQuery, [transportationId, messageId]);

        // const changeStatus = await updateStatusMessage(db, messageId);

        // if (!changeStatus.affectedRows) {
        //     res.status(500).json({ message: 'Error send message', messageId });
        // }
        // else {
            // Get registered users
            const registeredUsers = await getRegisteredUsers(db, transportationId);

            // Return response with messageId and registered user IDs
            res.status(201).json({ 
                message: 'Transportation Message added successfully', 
                messageId, 
                registeredUsers: registeredUsers.map(user => user.UserID)
            });        
        

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
            ORDER BY 
                    m.SendTime DESC
        `;

        const [generalMessagesResults] = await db.query(getGeneralMessagesQuery);

        res.status(200).json({ messages: generalMessagesResults });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving general messages', error: err });
    }
};

const getMessagesOfTransportation = async (req, res) => {
    const { transportationId } = req.params; 
    const db = req.db;
    
    try {
        // Check user permissions
        // const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
        // const [permissionResults] = await db.query(checkPermissionQuery, [userId]);

        // if (permissionResults.length === 0) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // const userPermission = permissionResults[0].UserPermission;

        // if (userPermission !== 'admin' && userPermission !== 'driver') {
        //     return res.status(403).json({ message: 'Unauthorized' });
        // }

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
                                                    mt.TransportationID = ?
                                                ORDER BY 
                                                    m.SendTime DESC
                                                    `;
        const response = await db.query(message_of_transportation_query, [transportationId]);

        // Get registered users
        // const messagesOfTransportation = await getRegisteredUsers(db, transportationId);

        // Return ok response with the messages
        res.status(200).json({ messages: response });

    } catch (err) {
        res.status(500).json({ message: 'Error retrieving messages', error: err });
    }
};

module.exports = { addMessageForEveryOne, addTransportationMessage, getGeneralMessages, getMessagesOfTransportation};
