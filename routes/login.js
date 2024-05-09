const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    //const unsafeQuery = `SELECT * FROM students WHERE email = '${email}'`;
    db.query('SELECT * FROM students WHERE email = ?', [email], async (error, results) => {
        if (error) return res.status(500).send('Database error');
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send('Unauthorized');
        }

        const user = results[0];
        const accessToken = jwt.sign({ userId: user.id }, 'access_secret', { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, 'refresh_secret', { expiresIn: '7d' });

        db.query('INSERT INTO refresh_tokens (user_id, refresh_token) VALUES (?, ?)', [user.id, refreshToken], err => {
            if (err) return res.status(500).send('Database error on token save');
            res.json({ accessToken, refreshToken });
        });
    });
});

router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).send('Refresh Token Required');

    db.query('SELECT * FROM refresh_tokens WHERE refresh_token = ?', [refreshToken], (error, results) => {
        if (error || results.length === 0) return res.status(403).send('Invalid Refresh Token');

        jwt.verify(refreshToken, 'refresh_secret', (err, decoded) => {
            if (err) return res.status(403).send('Invalid Refresh Token');
            const newAccessToken = jwt.sign({ userId: decoded.userId }, 'access_secret', { expiresIn: '15m' });
            res.json({ accessToken: newAccessToken });
        });
    });
});

module.exports = router;
