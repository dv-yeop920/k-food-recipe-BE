const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
