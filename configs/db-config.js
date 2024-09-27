const mongoose = require("mongoose");
const { DB_URL } = process.env;
// mongodb://vishal:vishal9368@162.240.148.212:27017/data
//
const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://vshalsha1234:xf9Hig6gEFMkSX1q@cluster0.snveb.mongodb.net/data"
    )
    .then(() => console.log("Database Connection Successfull"))
    .catch((err) =>
      console.log("Failed To Connect With Database, \nReason : " + err.message)
    );
};

module.exports = dbConnection;
