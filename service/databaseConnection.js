const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'biodiversity',
});

module.exports = connection;
