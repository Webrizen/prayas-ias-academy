const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 5000;


// Connect to database
connectDB();
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());


// Welcome route
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Prayas IAS Academy! Your success for Exams.");
});
// Auth routes
app.use("/api/v1/auth", authRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
