var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "anerde"
});

module.exports = con;