const express = require("express");
const { registerUser, loginUser, verifyEmail, requestPasswordReset, resetPassword, updatePassword, getUserProfile } = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail)
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/update-password', authMiddleware.protect, updatePassword);
router.get('/profile', authMiddleware.protect, getUserProfile);

module.exports = router;