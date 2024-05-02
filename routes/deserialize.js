const express = require('express');
const User = require('../serialization/User');
const router = express.Router();

function deserializeUser(serializedData) {
    try {
        let userData = JSON.parse(serializedData);
        if (userData && typeof userData === 'object') {
            return new User(userData.id, userData.username, userData.email);
        }
    } catch (error) {
        throw new Error('Failed to deserialize user: ' + error.message);
    }
}

router.post('/', (req, res) => {
    try {
        const user = deserializeUser(req.body.serializedUser);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
