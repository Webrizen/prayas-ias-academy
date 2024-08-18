const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const { protect, admin } = require('../middlewares/authMiddleware');

router.post("/", protect, admin, tagController.createTag);
router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getTagById);
router.put("/:id", protect, admin, tagController.updateTag);
router.delete("/:id", protect, admin, tagController.deleteTag);

module.exports = router;