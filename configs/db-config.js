const mongoose = require("mongoose");
const { DB_URL } = process.env;
// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1
const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/data")
    .then(() => console.log("Database Connection Successfull"))
    .catch((err) =>
      console.log("Failed To Connect With Database, \nReason : " + err.message)
    );
};

module.exports = dbConnection;
