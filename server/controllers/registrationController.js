const db = require('../config/db');

//return details passengers of specific transportation
const getPassengersOfTransportation = (transportationID) => {
    return new Promise((resolve, reject) => {
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
        db.query(query, [transportationID], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const registerForTransportation = async (req, res) => {
    const { transportationId, pickupStationId, dropoffStationId, executionDate } = req.body;
    const userId = req.userId;

    // Validate input
    if ( !transportationId || !pickupStationId || !dropoffStationId || !executionDate ) {
        return res.status(400).json({ message: 'These fields are required' });
    }

    try {
        // Insert registration details
        const insertRegistrationQuery = `
            INSERT INTO Registrations_To_Transportation 
            (UserID, TransportationID, PickupStationID, DropoffStationID, ExecutionDate, Registration_Status) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        await new Promise((resolve, reject) => {
            db.query(insertRegistrationQuery, [userId, transportationId, pickupStationId, dropoffStationId, executionDate, 'Confirmed'], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        res.status(201).json({ message: 'User registered for transportation successfully' });

        // Update registration status to Completed
        const updateStatusQuery = `
            UPDATE Registrations_To_Transportation 
            SET Registration_Status = 'Completed' 
            WHERE UserID = ? AND TransportationID = ?
        `;
        
        await new Promise((resolve, reject) => {
            db.query(updateStatusQuery, [userId, transportationId], (err, results) => {
                if (err) {
                    console.error('Error updating registration status', err);
                }
                resolve(results);
            });
        });

    } catch (err) {
        res.status(500).json({ message: 'Error registering user for transportation', error: err });
    }
};

const deleteRegistration = (req, res) => {
    const { transportationID } = req.params;
    const userId = req.userId; 

    // Validate input
    if (!transportationID) {
        return res.status(400).json({ message: 'transportationID is required' });
    }

    // Delete registration
    const deleteRegistrationQuery = 'DELETE FROM Registrations_To_Transportation WHERE UserID = ? AND TransportationID = ?';
    db.query(deleteRegistrationQuery, [userId, transportationID], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting registration', error: err });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    });
};

const updateStation = (req, res) => {
    const { transportationID, stationID } = req.params;
    const { typeStation } = req.body;
    const userId = req.userId; 

    // Validate input
    if (!transportationID || !stationID || !typeStation) {
        return res.status(400).json({ message: 'transportationID, stationID, and typeStation are required' });
    }

    if (typeStation != '' && typeStation != '') {
        return res.status(400).json({ message: 'Invalid typeStation value' });
    }

    // Update station
    const updateStationQuery = `
        UPDATE Registrations_To_Transportation 
        SET ${typeStation} = ?
        WHERE UserID = ? AND TransportationID = ?
    `;
    db.query(updateStationQuery, [typeStation, stationID, userId, transportationID], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating staion', error: err });
        }
        res.status(200).json({ message: 'The staion updated successfully' });
    });
};

module.exports = { registerForTransportation, deleteRegistration, updateStation, getPassengersOfTransportation };

