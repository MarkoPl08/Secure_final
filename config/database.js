const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'schoolwork'
});

connection.connect(error => {
    if (error) {
        return console.error('Error connecting to the database: ' + error.message);
    }
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
