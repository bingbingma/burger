// creates a connection to sql
// this one pretty boilerplate
var mysql = require("mysql");

const db = process.env.JAWSDB_URL || {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "burgers_db"
};

var connection = mysql.createConnection(db);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
