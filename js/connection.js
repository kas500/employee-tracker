const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password123",
    database: "mycompany_db",
  },
);

module.exports = {
    db
}