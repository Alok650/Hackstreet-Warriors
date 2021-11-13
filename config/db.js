const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    if (!process.env.MONGOURI) {
      console.log("MONGOURI missing in .env");
      process.exit(0);
    }
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected.");
  } catch (err) {
    console.log(err.toString());
  }
};

module.exports = connectDB;