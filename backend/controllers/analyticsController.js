const Course = require("../models/Course");
const Testimonial = require("../models/Testimonial");
const Contact = require("../models/Contact");
const Instructor = require("../models/Instructor");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

exports.getAnalytics = async (req, res) => {
  try {
    // Fetch counts from the database
    const courseCount = await Course.countDocuments();
    const testimonialCount = await Testimonial.countDocuments();
    const contactCount = await Contact.countDocuments();
    const instructorCount = await Instructor.countDocuments();
    const categoryCount = await Category.countDocuments();
    const tagCount = await Tag.countDocuments();

    // Respond with the statistics
    res.json({
      success: true,
      data: {
        totalCourses: courseCount,
        totalTestimonials: testimonialCount,
        totalContacts: contactCount,
        totalInstructors: instructorCount,
        totalCategories: categoryCount,
        totalTags: tagCount,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};