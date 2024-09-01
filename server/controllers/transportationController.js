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
    const query = `
        SELECT 
            T.TransportationID,
            T.Transportation_Date,
            T.Transportation_Time,
            T.Transportation_Status,
            T.DriverID,
            U.Username AS DriverName,
            StartStation.City AS StartCity,
            DestinationStation.City AS DestinationCity
        FROM 
            Transportation T
        JOIN 
            Users U ON T.DriverID = U.UserID
        LEFT JOIN 
            Station_In_Transportation SITStart ON SITStart.TransportationID = T.TransportationID 
            AND SITStart.Station_Type = 'Starting'
        LEFT JOIN 
            Station StartStation ON SITStart.StationID = StartStation.StationID
        LEFT JOIN 
            Station_In_Transportation SITDestination ON SITDestination.TransportationID = T.TransportationID 
            AND SITDestination.Station_Type = 'Destination'
        LEFT JOIN 
            Station DestinationStation ON SITDestination.StationID = DestinationStation.StationID
    `;
    const [results] = await db.query(query);
    return results;
};

//get details about ststions of transportation 
const getStationsTransportation = async (transportationId) => {
    const query = `    
                SELECT 
                    SIT.Station_Type,
                    S.StationID, 
                    S.Address, 
                    S.City
                FROM 
                    Station S
                JOIN 
                    Station_In_Transportation SIT ON S.StationID = SIT.StationID
                WHERE 
                    SIT.TransportationID = ?;`;
    const [stationTransportation] = await db.query(query, [transportationId]);
    return stationTransportation;
};

//get details about passengers registered to transportation 
const get_passengers_registered_transportation = async (transportationId) => {
    const query = `    
                SELECT 
                    U.UserID, 
                    U.Username, 
                    U.Uname,
                    U.UserPhone, 
                    U.UserEmail, 
                    R.PickupStationID, 
                    PickupStation.Address AS PickupStationAddress, 
                    R.DropoffStationID, 
                    DropoffStation.Address AS DropoffStationAddress
                FROM 
                    Users U
                JOIN 
                    Registrations_To_Transportation R ON U.UserID = R.UserID
                JOIN 
                    Station PickupStation ON R.PickupStationID = PickupStation.StationID
                JOIN 
                    Station DropoffStation ON R.DropoffStationID = DropoffStation.StationID
                WHERE 
                    R.TransportationID = ?
                    AND R.Registration_Status = 'Completed';`;
    const [passengers_registered_transportation] = await db.query(query, [transportationId]);
    return passengers_registered_transportation;
};

const getTransportationsOfDriver = async (driverId) => {
    const query = ` 
        SELECT 
            Transportation.TransportationID,
            Transportation.Transportation_Date,
            Transportation.Transportation_Time,
            Transportation.Transportation_Status,
            StartStation.StationID AS StartStationID,
            StartStation.City AS StartStationCity,
            DestinationStation.StationID AS DestinationStationID,
            DestinationStation.City AS DestinationStationCity
        FROM 
            Transportation
        JOIN 
            Users ON Transportation.DriverID = Users.UserID
        LEFT JOIN 
            Station StartStation ON StartStation.StationID = (
                SELECT SIT.StationID
                FROM Station_In_Transportation SIT
                WHERE SIT.TransportationID = Transportation.TransportationID
                AND SIT.Station_Type = 'Starting'
                LIMIT 1
            )
        LEFT JOIN 
            Station DestinationStation ON DestinationStation.StationID = (
                SELECT SIT.StationID
                FROM Station_In_Transportation SIT
                WHERE SIT.TransportationID = Transportation.TransportationID
                AND SIT.Station_Type = 'Destination'
                LIMIT 1
            )
        WHERE 
            Transportation.DriverID = ?
            AND Transportation.Transportation_Date >= CURDATE()
            AND Transportation.Transportation_Status != 'Cancelled';
    `;
    const [transportationsDetails] = await db.query(query, [driverId]);

    const passengersRegisteredDetails = [];
    
    for (const row of transportationsDetails) {
        const stations = await getStationsOfTransportation(row.TransportationID);
        const passengers = await get_passengers_registered_transportation(row.TransportationID);
        passengersRegisteredDetails.push({
            ...row,
            passengers,
            stations
        });
    }
    return passengersRegisteredDetails
};

const getTransportationsOfPassenger = async (passengerId) => {
    const query = `SELECT T.TransportationID, 
                    T.Transportation_Date, 
                    T.Transportation_Time, 
                    T.Transportation_Status, 
                    R.PickupStationID, 
                    R.DropoffStationID, 
                    R.ExecutionDate, 
                    R.Registration_Status,
                    PickupStation.Address AS PickupStationAddress, 
                    DropoffStation.Address AS DropoffStationAddress,
                    StartStation.StationID AS StartStationID,
                    StartStation.City AS StartStationCity,
                    DestinationStation.StationID AS DestinationStationID,
                    DestinationStation.City AS DestinationStationCity
                FROM Registrations_To_Transportation R
                JOIN Transportation T ON R.TransportationID = T.TransportationID
                JOIN Station PickupStation ON R.PickupStationID = PickupStation.StationID
                JOIN Station DropoffStation ON R.DropoffStationID = DropoffStation.StationID
                LEFT JOIN 
                    Station StartStation ON StartStation.StationID = (
                        SELECT SIT.StationID
                        FROM Station_In_Transportation SIT
                        WHERE SIT.TransportationID = R.TransportationID
                        AND SIT.Station_Type = 'Starting'
                        LIMIT 1
                    )
                LEFT JOIN 
                    Station DestinationStation ON DestinationStation.StationID = (
                        SELECT SIT.StationID
                        FROM Station_In_Transportation SIT
                        WHERE SIT.TransportationID = R.TransportationID
                        AND SIT.Station_Type = 'Destination'
                        LIMIT 1
                    )
                WHERE R.UserID = ? AND T.Transportation_Date >= CURDATE();`;

    const [transportationPassenger] = await db.query(query, [passengerId]);

    console.log(transportationPassenger);

    const transportationDetails = [];
    
    for (const row of transportationPassenger) {
        const stations = await getStationsTransportation(row.TransportationID);
        transportationDetails.push({
            ...row,
            stations
        });
    }

    console.log(transportationDetails);
    return transportationDetails
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
    const userId = req.query.userId;

    // Add your authentication and validation logic here
    //wait for ahuva
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try { 
        const transportationResults = await getTransportationsOfPassenger(userId);
        return res.status(200).json({
            transportations: transportationResults
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
}

//return the transportations that the user can to register
const getTransportationsForUser = async (req, res) => {
    try {
        const db = req.db;
        const getTransportationsQuary = `SELECT * 
                                            FROM Transportation T
                                            WHERE T.Transportation_Status != 'Cancelled'
                                            AND T.MaxPassengers > (
                                                SELECT COUNT(*) AS RegisteredCount
                                                FROM Registrations_To_Transportation
                                                WHERE TransportationID = T.TransportationID
                                            )
                                            AND (
                                                T.Transportation_Date > CURDATE()
                                                OR (
                                                    T.Transportation_Date = CURDATE()
                                                    AND T.Transportation_Time > CURRENT_TIME
                                                    AND T.Transportation_Time < DATE_ADD(CURRENT_TIME, INTERVAL 1 HOUR)
                                                )
                                            );`;
        const [transportations] = await db.query(getTransportationsQuary);

        if (transportations.length === 0) {
            return res.status(200).json({ message: 'No available transportations found' });
        }

        const transportationDetails = [];
        
        for (const row of transportations) {
            const stations = await getStationsTransportation(row.TransportationID);
            transportationDetails.push({
                ...row,
                stations
            });
        }
        return res.status(200).json({
            transportations: transportationDetails
        });

    } catch(err) {
        return res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
};


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
        const updateDriverQuery = 'UPDATE Transportation SET DriverID = ? WHERE TransportationID = ?';
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
    const { transportationId } = req.params;
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


module.exports = { addTransportation, deleteTransportation, getTransportations, getTransportationsDriver, getTransportationsPassenger, getAllTransportations, getTransportationsOfDriver , getTransportationsOfPassenger, replaceDriver, getDetailsTransportation, getTransportationsForUser};
