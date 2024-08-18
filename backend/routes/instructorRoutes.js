const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const { protect, admin } = require('../middlewares/authMiddleware');

router.post("/",protect, admin, instructorController.createInstructor);
router.get("/", instructorController.getAllInstructors);
router.get("/:id", instructorController.getInstructorById);
router.put("/:id", protect, admin, instructorController.updateInstructor);
router.delete("/:id", protect, admin, instructorController.deleteInstructor);

module.exports = router;