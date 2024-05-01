const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // or your host, e.g., '127.0.0.1'
    user: 'root', // your database username
    password: 'admin', // your database password
    database: 'schoolwork' // your database name
});

connection.connect(error => {
    if (error) {
        return console.error('Error connecting to the database: ' + error.message);
    }
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
