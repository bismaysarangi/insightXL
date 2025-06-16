const router = require('express').Router();

router.post('/login', (req, res) => {
    res.send('Login successful');
});

router.post('/signup', (req, res) => {
    res.send('Signup successful');
});

module.exports = router;
