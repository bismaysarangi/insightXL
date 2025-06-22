const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ 
            error: 'Unauthorized, JWT token is required',
            success: false 
        });
    }
    
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ 
            error: 'Unauthorized, JWT token wrong or expired',
            success: false 
        });
    }
};

module.exports = ensureAuthenticated;