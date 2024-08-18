const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContact
} = require('../controllers/contactController');

// Create a new contact form submission
router.post('/', createContact);

// Get all contact form submissions
router.get('/', getContacts);

// Get a single contact form submission by ID
router.get('/:id', getContact);

module.exports = router;