const db = require('../config/db');

const dbConnection = async (req, res, next) => {
    try {
        req.db = db;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the database', error });
    }
};

module.exports = dbConnection;
