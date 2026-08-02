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

const getAllHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: habits.length,
    data: habits
  });
});

