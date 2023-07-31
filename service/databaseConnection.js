const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'biodiversity.tipnl.com',
  user: 'tipn3594_biodiversity',
  password: 'Ezas4531@@',
  database: 'tipn3594_biodiversity',
  port: '3306',
});

module.exports = connection;
