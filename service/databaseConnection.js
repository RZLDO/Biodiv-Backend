const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'biodiversity-api.tipnl.com',
  user: 'tipn3594_biodiversity',
  password: 'Ezas4531@@',
  database: 'tipn3594_biodiversity',
  port: '3306',
  connectionLimit: 10,
});

module.exports = connection;
