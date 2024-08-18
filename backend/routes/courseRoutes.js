const express = require("express");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, teachers } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourse);

// Protected routes
router.post("/", protect, teachers, createCourse);
router.put("/:id", protect, teachers, updateCourse);
router.delete("/:id", protect, teachers, deleteCourse);

module.exports = router;