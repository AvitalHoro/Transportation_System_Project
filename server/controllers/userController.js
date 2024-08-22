const jwt = require('jsonwebtoken');
const addToBlacklist = require('../middleware/authUtils');
const { getAllTransportations, getTransportationsOfDriver, getTransportationsOfPassenger } = require('./transportationController');

const login = async (req, res) => {
    const { email, password } = req.body;
    const db = req.db;

    const query = 'SELECT * FROM Users WHERE UserEmail = ? AND UserPassword = ?';
    db.query(query, [email, password], async (err, userResults) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (userResults.length > 0) {
            const user = userResults[0];
            const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

            try {
                let transportationResults;

                if (user.UserPermission === 'Manager') {
                    transportationResults = await getAllTransportations();
                } else if (user.UserPermission === 'Driver') {
                    transportationResults = await getTransportationsOfDriver(user.UserID);
                } else if (user.UserPermission === 'Passenger') {
                    transportationResults = await getTransportationsOfPassenger(user.UserID);
                }
                return res.status(200).json({
                    token, 
                    user,
                    transportations: transportationResults
                });

            } catch (err) {
                return res.status(500).json({ message: 'Error querying transportation data', error: err });
            }

        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
};

const registerUser = (req, res) => {
    const { username, password, phone, permission, email } = req.body;
    const db = req.db;

    // Validate input
    if (!username || !password || !phone || !permission || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM Users WHERE UserEmail = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'The user already exists' });
        }

        // Insert new user into the database
        const insertUserQuery = 'INSERT INTO Users (Username, UserPassword, UserPhone, UserPermission, UserEmail) VALUES (?, ?, ?, ?, ?)';
        db.query(insertUserQuery, [username, password, phone, permission, email], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting user into the database', error: err });
            }
            res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
        });
    });
};

const logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    if (token) {
        addToBlacklist(token);
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
};


module.exports = { login, registerUser, logout };
