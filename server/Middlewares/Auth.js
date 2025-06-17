const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).json({ 
            error: 'Access denied. No token provided.', 
            success: false 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ 
            error: 'Invalid or expired token', 
            success: false 
        });
    }
};

module.exports = { verifyToken };