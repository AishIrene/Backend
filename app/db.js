/* Connection to the MySQL DB where the data is stored */

const mysql = require("mysql");
const dbConfig = require("./config/db.config.js");

/***************************************************************

"../config/db.config.js" = Configuration of the BD 
where the data is stored.

To run this REST API you need to create the file and fill in the 
database parameters:

module.exports = {
  HOST: "...",
  USER: "...",
  PASSWORD: "...",
  DB: "..."
};

****************************************************************/

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;