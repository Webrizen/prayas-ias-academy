const Contact = require('../models/Contact');

// Create a new contact form submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message, additionalInfo } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      additionalInfo,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get all contact form submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get a single contact form submission
exports.getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact form not found',
      });
    }

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};