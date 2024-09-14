const mongoose = require("mongoose");
const { DB_URL } = process.env;

const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://vshalsha1234:Y3esiUoPLSKNvOy4@cluster0.snveb.mongodb.net/data"
    )
    .then(() => console.log("Database Connection Successfull"))
    .catch((err) =>
      console.log("Failed To Connect With Database, \nReason : " + err.message)
    );
};

module.exports = dbConnection;
