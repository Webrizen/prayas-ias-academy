const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      enum: ['General Enquiry', 'Business', 'Support', 'Course Enquiry'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;