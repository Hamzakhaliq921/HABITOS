const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Habit name is required"],
      trim: true,
      maxlength: [100, "Habit name cannot exceed 100 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"],
      default: ""
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily"
    },
    targetDays: {
      type: [Number],
      default: [],
      validate: {
        validator(days) {
          return days.every((day) => Number.isInteger(day) && day >= 0 && day <= 6);
        },
        message: "Target days must be numbers between 0 and 6"
      }
    },
    color: {
      type: String,
      trim: true,
      default: "sage"
    },
    completionDates: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

