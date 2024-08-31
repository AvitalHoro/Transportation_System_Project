const jwt = require('jsonwebtoken');
const { addToBlacklist } = require('../middleware/authUtils');
const { getAllTransportations, getTransportationsOfDriver, getTransportationsOfPassenger } = require('./transportationController');

const login = async (req, res) => {
    console.log('login')
    const { email, password } = req.body;
    const db = req.db;

    try {
        const [userResults] = await db.query('SELECT * FROM Users WHERE UserEmail = ? AND UserPassword = ?', [email, password]);

        if (userResults.length > 0) {
            const user = userResults[0];
            const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

            let transportationResults;
            if (user.UserPermission === 'admin') {
                transportationResults = await getAllTransportations();
            } else if (user.UserPermission === 'driver') {
                transportationResults = await getTransportationsOfDriver(user.UserID);
            } else if (user.UserPermission === 'user') {
                transportationResults = await getTransportationsOfPassenger(user.UserID);
            }
            console.log('login successfully')

            return res.status(200).json({
                token, 
                user,
                transportations: transportationResults
            });
        } else {
            console.log('User not found')
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log('error in login')
        return res.status(500).json({ message: 'Error querying the database', error: err });
    }
};

const registerUser = async (req, res) => {
    console.log('register')
    const { username, password, phone, permission, email } = req.body;
    const db = req.db;

    console.log(username, password, phone, permission, email);

    // Validate input
    if (!username || !password || !phone || !permission || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        console.log('try')
        // Check if email already exists
        const [results] = await db.query('SELECT * FROM Users WHERE UserEmail = ?', [email]);
        console.log('try1')
        if (results.length > 0) {
            console.log('The user already exists')
            return res.status(400).json({ message: 'The user already exists' });
        }
        console.log('try2')
        // Insert new user into the database
        const [insertResults] = await db.query(
            'INSERT INTO Users (Username, UserPassword, UserPhone, UserPermission, UserEmail) VALUES (?, ?, ?, ?, ?)',
            [username, password, phone, permission, email]
        );
        console.log('User registered successfully')
        res.status(201).json({ message: 'User registered successfully', userId: insertResults.insertId });
    } catch (err) {
        console.log('error in register')
        res.status(500).json({ message: 'Error querying the database', error: err });
    }
};

const logout = async (req, res) => {
    console.log('logout')
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        await addToBlacklist(token);
        console.log('Logout successful')

        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.log('error in logout')
        res.status(500).json({ message: 'Failed to logout', error: err.message });
    }
};


const getUsers = async (req, res) => {
    const db = req.db;
    const userId = req.userId;
    const { typeUser } = req.params; 

    // Check if the current user has the correct permissions
    try {
        const [userResults] = await db.query('SELECT UserPermission FROM Users WHERE UserID = ?', [userId]);
        if (userResults.length === 0 || (userResults[0].UserPermission !== 'admin')) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        const [users] = await db.query(`SELECT userID, Username
                                          FROM Users
                                          WHERE UserPermission = ?`, [typeUser]);
        console.log(users)
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({ message: 'Error querying drivers data', error: err });
    }      
};


module.exports = { login, registerUser, logout, getUsers };
