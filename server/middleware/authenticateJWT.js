const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('./authUtils');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        if (isBlacklisted(token)) {
            return res.status(401).json({ message: 'Unauthorized - Token is blacklisted' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.userId = decoded.userId; 
            next();
        });
    } else {
        next(); 
    }
};

module.exports = authenticateJWT;


