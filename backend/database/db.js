const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const mongooseURL = process.env.CONNECTION_STRING;

const connectToMongo = () => {
  try {
    mongoose.connect(mongooseURL);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongo;
