const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const connectDB = require("./config/db");

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());


// Welcome route
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Prayas IAS Academy! Your success for Exams.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
