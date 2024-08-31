const db = require('../config/db');

const dbConnection = async (req, res, next) => {
    try {
        req.db = db;
        console.log('connect to db')
        next();
    } catch (error) {
        console.log('can not connect to db')
        res.status(500).json({ message: 'Error connecting to the database', error });
    }
};

module.exports = dbConnection;
