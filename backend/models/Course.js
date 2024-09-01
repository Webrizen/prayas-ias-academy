const mongoose = require("mongoose");

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
        day: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
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
      type: Number, // Percentage discount
      default: 0,
    },
    demoVideos: [
      {
        type: String, // URL to demo video
      },
    ],
    perks: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String, // URL to course video
      },
    ],
    liveClasses: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
