require("dotenv").config();
const mongoose = require("mongoose");

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const domain = process.env.MONGODB_DOMAIN;

const dbConfig = {
  url: `mongodb+srv://${username}:${password}@${domain}.mongodb.net/backend`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url, dbConfig.options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;