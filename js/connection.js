const mysql = require("mysql2");
const util = require("util");
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

db.connect();
db.query = util.promisify(db.query);

module.exports = {
    db
}