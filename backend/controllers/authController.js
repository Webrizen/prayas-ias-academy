const User = require("../models/User");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const crypto = require('crypto');

// Function to generate an email verification token
function generateVerificationToken() {
  const tokenLength = 32;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

// Function to generate the verification link
function generateVerificationLink(emailVerificationToken) {
  return `https://${process.env.DOMAIN}/auth/verify-email?token=${emailVerificationToken}`;
}

// Register a new user
exports.registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    gender,
    phoneNumber,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
      phoneNumber,
    });

    const emailVerificationToken = generateVerificationToken();

    user.verificationToken = emailVerificationToken;

    await user.save();

    const mailOptions = {
      from: `${process.env.SENDER_EMAIL}`,
      to: user.email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: ${generateVerificationLink(
        emailVerificationToken
      )}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send verification email." });
      } else {
        console.log("Verification email sent:", info.response);
        return res
          .status(201)
          .json({ message: "User registered. Verification email sent." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    });

    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (user.emailVerificationExpire && user.emailVerificationExpire < Date.now()) {
      return res.status(400).json({ message: "Token has expired" });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password Request
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist.' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;

    await user.save();

    // Send password reset email
    const resetLink = `${process.env.DOMAIN}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `${process.env.SENDER_EMAIL}`,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
        return res.status(500).json({ message: 'Failed to send password reset email.' });
      } else {
        console.log('Password reset email sent:', info.response);
        return res.status(200).json({ message: 'Password reset email sent.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  try {
    // Find the user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and save
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update Password
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
