const express = require("express");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug
} = require("../controllers/courseController");
const { protect, teachers } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourse);
router.get("/slug/:slug", getCourseBySlug);

// Protected routes
router.post("/", protect, teachers, createCourse);
router.put("/:id", protect, teachers, updateCourse);
router.delete("/:id", protect, teachers, deleteCourse);

module.exports = router;