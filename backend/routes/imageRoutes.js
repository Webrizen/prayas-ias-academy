const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const path = require("path");
const fs = require("fs");

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

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/uploads/files/${req.file.filename}`;

    res.json({
      success: true,
      message: "File uploaded successfully!",
      fileUrl: fileUrl,
    });
  });
});

// Get all assets endpoint
router.get("/all", (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads/files");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Unable to scan files" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileUrls = files.map((file) => `${baseUrl}/uploads/files/${file}`);

    res.json({
      success: true,
      files: fileUrls,
    });
  });
});

// Delete file endpoint
router.delete("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads/files", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File does not exist
        return res.status(404).json({ success: false, message: "File not found" });
      }
      // Other errors
      return res.status(500).json({ success: false, message: "Error deleting file" });
    }

    res.json({
      success: true,
      message: "File deleted successfully!",
    });
  });
});

module.exports = router;