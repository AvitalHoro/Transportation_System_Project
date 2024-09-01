const db = require('../config/db');

//return details stations of specific transportation
const getStationsOfTransportation = async (transportationID) => {
    const db = req.db; 
    const query = `SELECT 
        s.StationID,
        s.Address,
        s.City,
        sit.Station_Status,
        sit.Station_Type
        FROM 
            Station_In_Transportation sit
        JOIN 
            Station s ON sit.StationID = s.StationID
        WHERE 
            sit.TransportationID = ?`;
    const [results] = await db.query(query, [transportationID]);
    return results;
};

const getAllStations = async (req, res) => {
    console.log('get all statnios')
    const db = req.db; 
    const query = 'SELECT * FROM Station';
    
    try {
        const [stations] = await db.query(query);
        console.log('stations')
        return res.status(200).json({
            stations: stations
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error querying stations data', error: err });
    }
};

const addStation = async (req, res) => {
    const db = req.db;
    const { address, city, station_Status, station_Type } = req.body;
    const userId = req.userId;

    try {
        // Validate input
        if (!address || !city || !station_Status || !station_Type) {
            return res.status(400).json({ message: 'All the fields are required' });
        }
        
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

        // Check if station already exists
        const checkStationQuery = 'SELECT * FROM Station WHERE Address = ? AND City = ?';
        const [stationResults] = await db.query(checkStationQuery, [address, city]);

        if (stationResults.length > 0) {
            return res.status(409).json({ message: 'Station already exists' });
        }

        // Insert new station
        const insertStationQuery = 'INSERT INTO Station (Address, City, Station_Status, Station_Type) VALUES (?, ?, ?, ?)';
        const [insertStationResult] = await db.query(insertStationQuery, [address, city, station_Status, station_Type]);

        res.status(201).json({ message: 'Station added successfully', stationId: insertStationResult.insertId });

    } catch (err) {
        res.status(500).json({ message: 'Error adding station', error: err });
    }
};

//addd station to transportation
const addStationTotransporatstion = async (req, res) => {
    const db = req.db;
    const {transportationId, stationId} = req.params;
    const {station_type} = req.body;
    const userId = req.userId; 
    try {
        // Validate input
        if (!station_type) {
            return res.status(400).json({ message: 'All the fields are required' });
        }
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
        const station_status = 'active';

        // Insert new station
        const insertStationQuery = 'INSERT INTO Station_In_Transportation (TransportationID, StationID, Station_Status, Station_Type) VALUES (?, ?, ?, ?)';
        const [insertStation] = await db.query(insertStationQuery, [transportationId, stationId, station_status, station_type]);

        if (insertStation.affectedRows > 0) {
            res.status(201).json({ message: 'Station added successfully'});
        } else {
            res.status(500).json({ message: 'Error adding station'});
        }

    } catch (err) {
        res.status(500).json({ message: 'Error adding station', error: err });
    }
}

const cancelStation = async (req, res) => {
    const db = req.db;
    const { stationId } = req.params;
    const {transportationId} = req.body;
    const userId = req.userId; 

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

        // Canceling station      
        //const deleteStationQuery = 'DELETE FROM Station_In_Transportation WHERE StationID = ? AND TransportationID = ?';
        const deleteStationQuery = `UPDATE Station_In_Transportation 
                                    SET Station_Status = 'Cancelled' 
                                    WHERE StationID = ? AND TransportationID = ?`;

        await db.query(deleteStationQuery, [stationId, transportationId]);
            res.status(200).json({ message: 'Station cancelled successfully' });

    } catch (err){
        return res.status(500).json({ message: 'Error canceling station', error: err });
    }
}

const updateStation = async (req, res) => {
    const db = req.db;
    const { stationId } = req.params;
    const { address, city } = req.body;
    const userId = req.userId;  

    try {
        // Validate input
        if (!address || !city) {
            return res.status(400).json({ message: 'Address and city are required' });
        }
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

        // Update station details
        const updateStationQuery = 'UPDATE Station SET Address = ?, City = ? WHERE StationID = ?';
        const [updateResults] = await db.query(updateStationQuery, [address, city, stationId]);

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Station not found' });
        }

        res.status(200).json({ message: 'Station updated successfully' });

    } catch (err) {
        return res.status(500).json({ message: 'Error updating station', error: err });
    }
};

    
module.exports = {getAllStations,  addStation, cancelStation, getStationsOfTransportation, updateStation, addStationTotransporatstion};
