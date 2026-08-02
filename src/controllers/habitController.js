const Habit = require("../models/Habit");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const {
  formatDateKey,
  calculateCurrentStreak,
  calculateLongestStreak
} = require("../utils/dateHelpers");

const createHabit = asyncHandler(async (req, res) => {
  const { name, description, frequency, targetDays, color } = req.body;

  const habit = await Habit.create({
    name: name.trim(),
    description: description || "",
    frequency: frequency || "daily",
    targetDays: targetDays || [],
    color: color || "sage"
  });

  res.status(201).json({
    success: true,
    message: "Habit created successfully",
    data: habit
  });
});
