const db = require('../config/db');
const { getStationsOfTransportation } = require('./stationController');
//const { getPassengersOfTransportation } = require('./registrationController');

//כל הנסיעות. נוסעים רושמים+תחנות עליה וירידה שלהם

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
                    AND R.Registration_Status = 'active';`;
    const [passengers_registered_transportation] = await db.query(query, [transportationId]);
    return passengers_registered_transportation;
};

const getAllTransportations = async () => {
    const query = `
        SELECT 
            T.TransportationID,
            T.Transportation_Date,
            T.Transportation_Time,
            T.Transportation_Status,
            T.DriverID,
            T.MaxPassengers,
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
        WHERE
            T.Transportation_Date >= CURDATE() 
    `;
    const [transportations] = await db.query(query);

    const transportationsDetails = [];
    
    for (const row of transportations) {
        const stations = await getStationsTransportation(row.TransportationID);
        const passengers = await get_passengers_registered_transportation(row.TransportationID);
        transportationsDetails.push({
            ...row,
            passengers,
            stations
        });
    }
    return transportationsDetails
};

const getTransportationsOfDriver = async (driverId) => {
    const query = ` 
        SELECT 
            Transportation.TransportationID,
            Transportation.Transportation_Date,
            Transportation.Transportation_Time,
            Transportation.Transportation_Status,
            Transportation.MaxPassengers,
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
            AND Transportation.Transportation_Status != 'cancel';
    `;
    const [transportations] = await db.query(query, [driverId]);

    const transportationsDetails = [];
    
    for (const row of transportations) {
        const stations = await getStationsTransportation(row.TransportationID);
        const passengers = await get_passengers_registered_transportation(row.TransportationID);
        transportationsDetails.push({
            ...row,
            passengers,
            stations
        });
    }
    return transportationsDetails
};

//all the transporttions of passenger
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

const getTransportationsForAdmin = async (req, res) => {
    try { 
        const transportations= await getAllTransportations();
        console.log(transportations);
        return res.status(200).json({
            transportations: transportations
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error querying transportation data', error: err });
    }
}

const getTransportationsDriver = async (req, res) => {
    const { driverId } = req.params;
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
                                            WHERE T.Transportation_Status != 'cancel'
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
        console.log('getTransportationsForUser')
        console.log(transportations)

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

const addTransportation = async (req, res) => {
    const db = req.db;
    const { transportationDate, transportationTime, transportationStatus, driver, maxPassengers } = req.body;
    const userId = req.userId;

    console.log(transportationDate, transportationTime, transportationStatus, driver, maxPassengers, userId);

    if (!transportationDate || !transportationTime || !transportationStatus || !maxPassengers || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check user permissions
        const [results] = await db.query('SELECT UserPermission FROM Users WHERE UserID = ?', [userId]);

        if (results.length === 0 || results[0].UserPermission !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to add a transportation' });
        }

        const formatDateForMySQL = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
        
            return `${year}-${month}-${day}`;
        };

        const formatTimeForMySQL = (dateString) => {
            const date = new Date(dateString);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
        
            return `${hours}:${minutes}:${seconds}`;
        };
        
        const transportationDateSQL = formatDateForMySQL(transportationDate);
        const transportationTimeSQL = formatTimeForMySQL(transportationTime);
        console.log(transportationDateSQL, transportationTimeSQL, transportationStatus, driver, maxPassengers)
                // Insert new transportation
                
        const [insertResults] = await db.query(
            'INSERT INTO Transportation (Transportation_Date, Transportation_Time, Transportation_Status, DriverID, MaxPassengers) VALUES (?, ?, ?, ?, ?)',
            [transportationDateSQL, transportationTimeSQL, transportationStatus, driver, maxPassengers]
        );

        res.status(201).json({ message: 'Transportation added successfully', transportationId: insertResults.insertId });

    } catch (err) {
        res.status(500).json({ message: 'Error querying the database', error: err });
    }
};

const deleteTransportation = async (req, res) => {
    const db = req.db;
    const { transportationId } = req.params;
    const userId = req.userId;

    if (!transportationId) {
        return res.status(400).json({ message: 'TransportationID is required' });
    }

    try {
        // Check user permissions
        const [results] = await db.query('SELECT UserPermission FROM Users WHERE UserID = ?', [userId]);

        if (results.length === 0 || results[0].UserPermission !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to delete transportation' });
        }

        // Delete transportation
        const [deleteResults] = await db.query('DELETE FROM Transportation WHERE TransportationID = ?', [transportationId]);

        if (deleteResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        res.status(200).json({ message: 'Transportation deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error querying the database', error: err });
    }
};


// Function to replace the driver of a specific transportation
const replaceDriver = async (req, res) => {
    const db = req.db;
    const { transportationId } = req.params;
    const { newDriver } = req.body;
    const userId = req.userId;

    try {
        // Check user permissions
        const [userResults] = await db.query('SELECT UserPermission FROM Users WHERE UserID = ?', [userId]);

        if (userResults.length === 0 || userResults[0].UserPermission !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        if(!newDriver){
            return res.status(400).json({ message: 'New driver is required' });
        }

        // Update driver
        const [updateResults] = await db.query('UPDATE Transportation SET DriverID = ? WHERE TransportationID = ?', [newDriver, transportationId]);

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        res.status(200).json({ message: 'Driver replaced successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error querying the database', error: err });
    }
};


// Function to update the status of transportation
const updateStatus = async (req, res) => {
    const db = req.db;
    const { transportationId } = req.params;
    const { newStatus } = req.body;
    const userId = req.userId;

    try {
        // Validate input
        if (!newStatus) {
            return res.status(400).json({ message: 'New status is required' });
        }

        // Check user permissions
        const [userResults] = await db.query('SELECT UserPermission FROM Users WHERE UserID = ?', [userId]);

        if (userResults.length === 0 || userResults[0].UserPermission !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }

        // Update status
        const [updateResults] = await db.query('UPDATE Transportation SET Transportation_Status = ? WHERE TransportationID = ?', [newStatus, transportationId]);

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        res.status(200).json({ message: `Status updated successfully for transportation ID ${transportationId}` });

    } catch (err) {
        res.status(500).json({ message: 'Error querying the database', error: err });
    }
};


module.exports = { addTransportation, deleteTransportation, getTransportationsForAdmin, getTransportationsDriver, getTransportationsPassenger, getAllTransportations, getTransportationsOfDriver , getTransportationsOfPassenger, replaceDriver, getTransportationsForUser, updateStatus};
