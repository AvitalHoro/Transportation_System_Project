const db = require('../config/db');

const addStation = (req, res) => {
    const { address, city } = req.body;
    const userId = req.userId;

    // Validate input
    if (!address || !city) {
        return res.status(400).json({ message: 'Address and city are required' });
    }

    // Check user permissions
    const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
    db.query(checkPermissionQuery, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = results[0].UserPermission;

        if (userPermission !== 'Manager' && userPermission !== 'Driver') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Insert new station
        const insertStationQuery = 'INSERT INTO Station (Address, City) VALUES (?, ?)';
        db.query(insertStationQuery, [address, city], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting station', error: err });
            }
            res.status(201).json({ message: 'Station added successfully', stationId: results.insertId });
        });
    });
};

const deleteStation = (req, res) => {
    const { stationId } = req.params;
    const userId = req.userId; 
    
    // Check user permissions
    const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
    db.query(checkPermissionQuery, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userPermission = results[0].UserPermission;

        if (userPermission !== 'Manager' && userPermission !== 'Driver') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Delete station
        const deleteStationQuery = 'DELETE FROM Station WHERE StationID = ?';
        db.query(deleteStationQuery, [stationId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting station', error: err });
            }
            res.status(200).json({ message: 'Station deleted successfully' });
        });
    });
};

module.exports = { addStation, deleteStation };
