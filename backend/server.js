const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categoryRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const tagRoutes = require("./routes/tagRoutes");
const PORT = process.env.PORT || 5000;


// Connect to database
connectDB();
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());


// Welcome Home route
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Prayas IAS Academy! Your success for Exams.");
});
// Other routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/instructors", instructorRoutes);
app.use("/api/v1/tags", tagRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
