const express = require('express');
const allowedClasses = require('../serialization/whitelist');
const router = express.Router();

function deserializeUser(className, serializedData) {
    try {
        const userData = JSON.parse(serializedData);
        const Class = allowedClasses[className];

        if (!Class) {
            throw new Error('Unauthorized deserialization attempt');
        }

        if (userData && typeof userData === 'object') {
            return new Class(userData.id, userData.username, userData.email);
        }
    } catch (error) {
        throw new Error('Failed to deserialize user: ' + error.message);
    }
}

router.post('/', (req, res) => {
    try {
        const { className, serializedUser } = req.body;
        const user = deserializeUser(className, serializedUser);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
