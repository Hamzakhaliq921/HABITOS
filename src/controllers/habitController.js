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

const updateHabit = asyncHandler(async (req, res) => {
  const { name, description, frequency, targetDays, color } = req.body;

  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  if (name !== undefined) {
    habit.name = name.trim();
  }

  if (description !== undefined) {
    habit.description = description;
  }

  if (frequency !== undefined) {
    habit.frequency = frequency;
  }

  if (targetDays !== undefined) {
    habit.targetDays = targetDays;
  }

  if (color !== undefined) {
    habit.color = color;
  }

  await habit.save();

  res.status(200).json({
    success: true,
    message: "Habit updated successfully",
    data: habit
  });
});

const deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  await habit.deleteOne();

  res.status(200).json({
    success: true,
    message: "Habit deleted successfully"
  });
});
