const { Sequelize } = require("sequelize");
require("dotenv").config();

var database = "Indorama_dev";
var user = "root";
var passwrod = "root";
var host = "localhost";

if (process.env.NODE_ENV == "production") {
  host = process.env.Host;
  if (process.env.SERVER == "D") {
    console.log("development");
    database = process.env.Dev_Database;
    user = process.env.User;
    passwrod = process.env.Password;
  } else {
    console.log("production");
    database = process.env.Database;
    user = process.env.User;
    passwrod = process.env.Password;
  }
}

const sequelize = new Sequelize(database, user, passwrod, {
  host: host,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection Has Been Established Successfully.");
} catch (error) {
  console.error("Unable To Connect To The Database:", error);
}

module.exports = sequelize;
