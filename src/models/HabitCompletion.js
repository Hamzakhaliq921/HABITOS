const mongoose = require("mongoose");

const { Schema } = mongoose;

const habitCompletionSchema = new Schema(
  {
    habit: {
      type: Schema.Types.ObjectId,
      ref: "Habit",
      required: [true, "Habit reference is required"],
      index: true
    },
    completedOn: {
      type: Date,
      required: [true, "Completion date is required"],
      set: (value) => {
        const date = new Date(value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    },
    completedCount: {
      type: Number,
      required: [true, "Completed count is required"],
      min: [1, "Completed count must be at least 1"],
      default: 1
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [250, "Notes cannot exceed 250 characters"],
      default: ""
    }
  },
  {
    timestamps: true
  }
);

