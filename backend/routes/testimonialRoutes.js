const express = require('express');
const router = express.Router();
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middlewares/authMiddleware');

// Create a new testimonial
router.post('/', protect, createTestimonial);

// Get all testimonials
router.get('/', getAllTestimonials);

// Get a single testimonial by ID
router.get('/:id', getTestimonialById);

// Update a testimonial by ID
router.put('/:id', protect, updateTestimonial);

// Delete a testimonial by ID
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;