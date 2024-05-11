const express = require('express');
const allowedClasses = require('../serialization/whitelist');
const router = express.Router();

function deserializeUser(className, serializedData) {
    try {
        const userData = JSON.parse(serializedData);
        const classConfig = allowedClasses[className];

        if (!classConfig || !classConfig.validate(userData)) {
            throw new Error('Unauthorized deserialization attempt or data validation failed');
        }

        return classConfig.handle(userData);
    } catch (error) {
        throw new Error('Failed to deserialize object: ' + error.message);
    }
}



router.post('/', (req, res) => {
    try {
        const { className, serializedUser } = req.body;
        const object = deserializeUser(className, serializedUser);
        res.json(object);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
