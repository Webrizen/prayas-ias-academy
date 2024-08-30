const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL of the profile picture
  },
  bio: {
    type: String,
  },
  qualifications: {
    type: [String], // Array of expertise fields
  },
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
  },
  experience: {
    type: [String], // Changed to an array of strings
    required: true,
  },
},{ timestamps: true });

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
