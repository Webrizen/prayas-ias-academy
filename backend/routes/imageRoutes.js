const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const path = require("path");

// Upload endpoint
router.post("/", (req, res) => {
  upload(req, res, (err) => {
    console.log("Upload Error:", err);
    console.log("Uploaded File:", req.file);
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    res.json({
      success: true,
      message: "File uploaded successfully!",
      fileUrl: `http://localhost:5000/uploads/files/${req.file.filename}`,
    });
  });
});

router.get("/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "uploads/files", filename));
});

module.exports = router;