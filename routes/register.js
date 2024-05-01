const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        return res.status(400).send('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO students (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (error, results) => {
        if (error) return res.status(500).send('Database error');
        res.status(201).send('User registered');
    });
});

module.exports = router;
