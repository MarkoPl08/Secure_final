const express = require('express');
const User = require('../serialization/User');
const router = express.Router();

router.post('/', (req, res) => {
    const newUser = new User(req.body.id, req.body.username, req.body.email);
    const serializedUser = JSON.stringify(newUser); // Automatically calls newUser.toJSON()
    res.send(serializedUser);
});

module.exports = router;
