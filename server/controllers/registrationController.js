const db = require('../config/db');

// Return details passengers of specific transportation
const getPassengersOfTransportation = async (transportationID) => {
    const query = `SELECT 
            u.UserID,
            u.Username,
            rtt.PickupStationID,
            rtt.DropoffStationID,
            pickup.Address AS PickupAddress,
            dropoff.Address AS DropoffAddress,
            total_passengers.TotalCount AS TotalPassengers
        FROM 
            Registrations_To_Transportation rtt
        JOIN 
            Users u ON rtt.UserID = u.UserID
        JOIN 
            Station pickup ON rtt.PickupStationID = pickup.StationID
        JOIN 
            Station dropoff ON rtt.DropoffStationID = dropoff.StationID
        JOIN 
            (SELECT COUNT(*) AS TotalCount
            FROM Registrations_To_Transportation
            WHERE TransportationID = ?) total_passengers
        WHERE 
            rtt.TransportationID = ?`;

    try {
        const [results] = await db.query(query, [transportationID, transportationID]);
        return results;
    } catch (err) {
        throw err;
    }
};

//register passenger to transpportation
const registerForTransportation = async (req, res) => {
    const { transportationId, pickupStationId, dropoffStationId, executionDate } = req.body;
    const userId = req.userId;
    const db = req.db;

    // Validate input
    if (!transportationId || !pickupStationId || !dropoffStationId || !executionDate) {
        return res.status(400).json({ message: 'These fields are required' });
    }

    try {
        // Insert registration details
        const insertRegistrationQuery = `
            INSERT INTO Registrations_To_Transportation 
            (UserID, TransportationID, PickupStationID, DropoffStationID, ExecutionDate, Registration_Status) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.query(insertRegistrationQuery, [userId, transportationId, pickupStationId, dropoffStationId, executionDate, 'Confirmed']);

        // Update registration status to Completed
        const updateStatusQuery = `
            UPDATE Registrations_To_Transportation 
            SET Registration_Status = 'Completed' 
            WHERE UserID = ? AND TransportationID = ?
        `;
        await db.query(updateStatusQuery, [userId, transportationId]);

        res.status(201).json({ message: 'User registered for transportation successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error registering user for transportation', error: err });
    }
};

const deleteRegistration = async (req, res) => {
    const { transportationID } = req.params;
    const userId = req.userId;
    const db = req.db;

    // Validate input
    if (!transportationID) {
        return res.status(400).json({ message: 'transportationID is required' });
    }

    try {
        // Delete registration
        const deleteRegistrationQuery = 'DELETE FROM Registrations_To_Transportation WHERE UserID = ? AND TransportationID = ?';
        await db.query(deleteRegistrationQuery, [userId, transportationID]);

        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting registration', error: err });
    }
};

const updateStation = async (req, res) => {
    const { transportationID, stationID } = req.params;
    const { typeStation } = req.body;
    const userId = req.userId;
    const db = req.db;

    // Validate input
    if (!transportationID || !stationID || !typeStation) {
        return res.status(400).json({ message: 'transportationID, stationID, and typeStation are required' });
    }

    if (typeStation !== 'PickupStationID' && typeStation !== 'DropoffStationID') {
        return res.status(400).json({ message: 'Invalid typeStation value' });
    }

    try {
        // Update station
        const updateStationQuery = `
            UPDATE Registrations_To_Transportation 
            SET ${typeStation} = ?
            WHERE UserID = ? AND TransportationID = ?
        `;
        await db.query(updateStationQuery, [stationID, userId, transportationID]);

        res.status(200).json({ message: 'The station updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating station', error: err });
    }
};

const updateStatus = async (req, res) => {
    const db = req.db;
    const { passengerId, transportationId } = req.params;
    const { statusTransportation } = req.body;
    const userId = req.userId;  

    try {
        // Validate input
        if (!statusTransportation) {
            return res.status(400).json({ message: 'passengerId is required' });
        }
         // Check user permissions
         const checkPermissionQuery = 'SELECT UserPermission FROM Users WHERE UserID = ?';
         const [permissionResults] = await db.query(checkPermissionQuery, [userId]);
 
         if (permissionResults.length === 0) {
             return res.status(404).json({ message: 'User not found' });
         }
 
         const userPermission = permissionResults[0].UserPermission;
 
         if (userPermission !== 'Manager') {
             return res.status(403).json({ message: 'Unauthorized' });
         }

        // Update status registratin
        const updateStatusQuery = 'UPDATE Registrations_To_Transportation SET Registrations_Status = ? WHERE UserID = ? AND TransportationID = ?';
        const [updateResults] = await db.query(updateStatusQuery, [statusTransportation, passengerId, transportationId]);

        if (updateResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Registrations_To_Transportation not found' });
        }

        res.status(200).json({ message: 'The status of registration updated successfully' });

    } catch (err) {
        return res.status(500).json({ message: 'Error updating status of registrations', error: err });
    }
};

module.exports = { registerForTransportation, deleteRegistration, updateStation, getPassengersOfTransportation, updateStatus };
