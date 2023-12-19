
const mysql = require("mysql");
const pool = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // "Current-Root-Password"
  database: process.env.MYSQL_DATABASE,
  // socketPath: '/var/run/mysqld/mysqld.sock',
  connectionLimit: 10,
});

module.exports = pool;
