var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "ptod"
});

module.exports = con;