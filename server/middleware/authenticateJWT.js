const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('./authUtils');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1]; 
        if (token) {
            if (isBlacklisted(token)) {
                console.log('Unauthorized - Token is blacklisted')
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
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
    } else {
        //next();
        console.log('problam in Authorization')
        return res.status(401).json({ message: 'Unauthorized - No Authorization header' });
    }
};

module.exports = authenticateJWT;




