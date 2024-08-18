const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categoryRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const tagRoutes = require("./routes/tagRoutes");
const courseRoutes = require("./routes/courseRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");
const uploadRoute = require("./routes/imageRoutes");

// Connect to database
connectDB();
dotenv.config();

const app = express();

// Configure CORS & Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Welcome Home route
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Prayas IAS Academy! Your success for Exams.");
});
// Other routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/instructors", instructorRoutes);
app.use("/api/v1/tags", tagRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);

// Image upload route | Static folder for serving images
app.use("/uploads", express.static(path.join(__dirname, "uploads/files")));
app.use("/api/v1/upload", uploadRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));