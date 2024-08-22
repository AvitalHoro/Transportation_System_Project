const db = require('../config/db');
const { getStationsOfTransportation } = require('./stationController');
const { getPassengersOfTransportation } = require('./registrationController');

// const getAllTransportations = () => {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM Transportation';
//         db.query(query, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         });
//     });
// };

const getAllTransportations = async () => {
    const query = 'SELECT * FROM Transportation';
    const [results] = await db.query(query);
    return results;
};

const getTransportationsOfDriver = async (driverId) => {
    const query = `
    SELECT 
        Transportation.TransportationID,
        Transportation.Transportation_Date,
        Transportation.Transportation_Time,
        Transportation.Transportation_Status,
        Transportation.DriverID,
        Users.Username AS DriverName,
        Transportation.MaxPassengers
    FROM 
        Transportation
    JOIN 
        Users ON Transportation.DriverID = Users.UserID
    WHERE 
        Transportation.DriverID = ?;
    `;
    const [results] = await db.query(query, [driverId]);
    return results;
};

const getTransportationsOfPassenger = async (passengerId) => {
    const query = `SELECT T.TransportationID, T.Transportation_Date, T.Transportation_Time, T.Transportation_Status, T.MaxPassengers, 
                    R.PickupStationID, R.DropoffStationID, R.ExecutionDate, R.Registration_Status
                    FROM Registrations_To_Transportation R
                    JOIN Transportation T ON R.TransportationID = T.TransportationID
                    WHERE R.UserID = ?`;
    const [results] = await db.query(query, [passengerId]);
    return results;
};

const getTransportations = async (req, res) => {
    try { 
        const transportationResults = await getAllTransportations();
        return res.status(200).json({
            transportations: transportationResults
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
}

const getTransportationsDriver = async (req, res) => {
    const { driverId } = req.body;
    const userId = req.userId; //להוסיף בדיקת אימות
    try { 
        const transportationResults = await getTransportationsOfDriver(driverId);
        return res.status(200).json({
            transportations: transportationResults
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
}

const getTransportationsPassenger = async (req, res) => {
    const { passengerId } = req.body;
    const userId = req.userId; //להוסיף בדיקת אימות
    try { 
        const transportationResults = await getTransportationsOfPassenger(passengerId);
        return res.status(200).json({
            transportations: transportationResults
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
}

const addTransportation = (req, res) => {
    const db = req.db;
    const { transportationDate, transportationTime, transportationStatus, driver, maxPassengers } = req.body;
    const userId = req.userId;

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
    const db = req.db;
    const { transportationId } = req.params;
    const userId = req.userId; 

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

// Function to replace the driver of a specific transportation
const replaceDriver = (req, res) => {
    const db = req.db;
    const { transportationId } = req.params;
    const { newDriver } = req.body;
    const userId = req.userId;

    // Check if the current user is a Manager
    const checkUserQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
    db.query(checkUserQuery, [userId], (err, userResults) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (userResults.length === 0 || userResults[0].UserPermission !== 'Manager') {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }

        // Update the driver for the specific transportation
        const updateDriverQuery = 'UPDATE Transportation SET Driver = ? WHERE TransportationID = ?';
        db.query(updateDriverQuery, [newDriver, transportationId], (err, updateResults) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating the driver', error: err });
            }

            if (updateResults.affectedRows === 0) {
                return res.status(404).json({ message: 'Transportation not found' });
            }

            res.status(200).json({ message: 'Driver replaced successfully' });
        });
    });
};

const getDetailsTransportation = async (req, res) => {
    const db = req.db;
    const { transportationId } = req.body;
    const userId = req.userId;

    if (!transportationId) {
        return res.status(400).json({ message: 'transportationId is required' });
    }

    try {
        // Check if the current user has the correct permissions
        const [userResults] = await db.query('SELECT UserPermission FROM Users WHERE UserID = ?', [userId]);

        if (userResults.length === 0 || (userResults[0].UserPermission !== 'Manager' && userResults[0].UserPermission !== 'Driver')) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }

        // Get details of passengers
        const passengersDetails = await getPassengersOfTransportation(transportationId);
        // Get details of stations
        const stationsDetails = await getStationsOfTransportation(transportationId);

        res.status(200).json({ passengers: passengersDetails, stations: stationsDetails });
    } catch (err) {
        res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
};


module.exports = { addTransportation, deleteTransportation, getTransportations, getTransportationsDriver, getTransportationsPassenger, getAllTransportations, getTransportationsOfDriver , getTransportationsOfPassenger, replaceDriver, getDetailsTransportation};
