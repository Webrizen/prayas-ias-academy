const Instructor = require("../models/Instructor");

// Create a new instructor
exports.createInstructor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      profilePicture,
      experience,
      qualifications,
      socialLinks
    } = req.body;

    const instructor = new Instructor({
      firstName,
      lastName,
      bio,
      profilePicture,
      experience,
      qualifications,
      socialLinks
    });

    await instructor.save();
    res.status(201).json(instructor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.status(200).json(instructor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an instructor
exports.updateInstructor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      profilePicture,
      experience,
      qualifications,
      socialLinks
    } = req.body;

    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, bio, profilePicture, experience, qualifications, socialLinks },
      { new: true }
    );

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
