const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

// Route for fetching analytics
router.get("/", protect, getAnalytics);

module.exports = router;