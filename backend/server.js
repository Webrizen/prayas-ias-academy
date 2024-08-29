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
const contactRoutes = require("./routes/contactRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const cors = require("cors");
const path = require("path");
const uploadRoute = require("./routes/imageRoutes");

dotenv.config();

// Connect to the database
connectDB();

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

// Static folder for serving images (Ensure this is before other routes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Other routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/instructors", instructorRoutes);
app.use("/api/v1/tags", tagRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

// Image upload route
app.use("/api/v1/upload", uploadRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));