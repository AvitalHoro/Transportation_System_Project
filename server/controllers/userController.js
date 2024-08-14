const db = require('../config/db');

const login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM Users WHERE UserEmail = ?'; 
    //Maybe check in a different way, because there may be duplicates in the email
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database', error: err });
        }

        if (results.length > 0) {
            // User found, return user details
            res.status(200).json(results[0]);
        } else {
            // User not found
            res.status(404).json({ message: 'User not found' });
        }
    });
};

const registerUser = (req, res) => {
    const { username, password, phone, permission, email } = req.body;

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

module.exports = { login, registerUser };
