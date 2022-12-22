const mysql = require("mysql2");
const util = require("util");
require('dotenv').config({ path: "./.env" });
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
);

db.connect();
db.query = util.promisify(db.query);

module.exports = {
    db
}