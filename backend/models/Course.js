const mongoose = require("mongoose");
const slugify = require('slugify');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    instructors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    mode: {
      type: String,
      enum: ["Online", "Offline", "hybrid"],
      required: true,
    },
    schedule: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    keyFeatures: [
      {
        type: String,
      },
    ],
    feeStructure: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "USD", "EUR", "GBP"],
        default: "INR",
      },
    },
    discounts: {
      type: Number,
      default: 0,
    },
    perks: [
      {
        type: String,
      },
    ],
    liveClasses: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

// Set the slug before validation
courseSchema.pre('validate', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// You can still use the pre-save hook for any additional logic, but slug creation should happen in pre-validate
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
