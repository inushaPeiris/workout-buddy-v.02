const mysql = require("mysql2");

// Connect to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootPW123",
  database: "workout_buddy",
});

module.exports.connection = connection;
