const router = require('express').Router();
const { verifyToken } = require('../Middlewares/Auth');

router.get('/dashboard', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Welcome to your dashboard',
        success: true,
        user: req.user
    });
});

router.post('/upload', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'File upload endpoint',
        success: true,
        user: req.user
    });
});

router.get('/history', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'User upload history',
        success: true,
        user: req.user
    });
});

router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'User profile data',
        success: true,
        user: req.user
    });
});

module.exports = router;