const db = require('../config/db');

const addTransportation = (req, res) => {
    const { transportationDate, transportationTime, transportationStatus, driver, maxPassengers, userId } = req.body;

    if (!transportationDate || !transportationTime || !transportationStatus || !maxPassengers || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const checkUserPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
    db.query(checkUserPermissionQuery, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (results.length === 0 || results[0].UserPermission !== 'Manager') {
            return res.status(403).json({ message: 'You do not have permission to add a transportation' });
        }

        const insertTransportationQuery = 'INSERT INTO Transportation (Transportation_Date, Transportation_Time, Transportation_Status, Driver, MaxPassengers) VALUES (?, ?, ?, ?, ?)';
        db.query(insertTransportationQuery, [transportationDate, transportationTime, transportationStatus, driver, maxPassengers], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting transportation into the database', error: err });
            }

            res.status(201).json({ message: 'Transportation added successfully', transportationId: results.insertId });
        });
    });
};

const deleteTransportation = (req, res) => {
    const { transportationId , userId} = req.body; 

    // Validate input
    if (!transportationId) {
        return res.status(400).json({ message: 'TransportationID is required' });
    }

    //check permission user
    const checkUserPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
    db.query(checkUserPermissionQuery, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (results.length === 0 || results[0].UserPermission !== 'Manager') {
            return res.status(403).json({ message: 'You do not have permission to delete transportation' });
        }

        //Delete the transportation
        const deleteTransportationQuery = 'DELETE FROM Transportation WHERE TransportationID = ?';
        db.query(deleteTransportationQuery, [transportationId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting transportation from the database', error: err });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Transportation not found' });
            }

            res.status(200).json({ message: 'Transportation deleted successfully' });
        });
    });
};

module.exports = { addTransportation, deleteTransportation };
