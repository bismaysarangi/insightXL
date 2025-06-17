const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Products API',
        success: true
    });
});

module.exports = router;