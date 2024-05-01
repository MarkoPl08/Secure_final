const jwt = require('jsonwebtoken'); // Use require instead of import
const express = require('express');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer

    if (token == null) return res.sendStatus(401); // No token found

    jwt.verify(token, 'access_secret', (err, user) => {
        if (err) return res.sendStatus(403); // Token verification failed
        req.user = user;
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = authenticateToken;
