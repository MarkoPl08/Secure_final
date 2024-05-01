const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/me', (req, res) => {
  const userId = req.user.userId;

  db.query('SELECT * FROM students WHERE id = ?', [userId], (error, results) => {
    if (error) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('User not found');

    res.json(results[0]);
  });
  console.log("UserID from JWT:", userId);

});

router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (error, results) => {
    if (error) return res.status(500).send('Database error');
    res.json(results);
  });
});

module.exports = router;
