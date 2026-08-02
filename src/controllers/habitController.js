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

const markHabitComplete = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  const completionDateKey = req.completionDateKey;
  const alreadyCompleted = habit.completionDates.includes(completionDateKey);

  if (!alreadyCompleted) {
    habit.completionDates.push(completionDateKey);
    habit.completionDates.sort();
    await habit.save();
  }

  res.status(200).json({
    success: true,
    message: alreadyCompleted
      ? "Habit was already marked complete for this date"
      : "Habit marked complete successfully",
    data: habit
  });
});

const getAnalyticsData = asyncHandler(async (req, res) => {
  const habits = await Habit.find();
  const today = formatDateKey();

  const totalHabits = habits.length;
  const completedToday = habits.filter((habit) => habit.completionDates.includes(today)).length;
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completionDates.length,
    0
  );

  const streaks = habits.map((habit) => ({
    currentStreak: calculateCurrentStreak(habit.completionDates),
    longestStreak: calculateLongestStreak(habit.completionDates)
  }));

  const analytics = {
    totalHabits,
    completedToday,
    totalCompletions,
    completionRate: totalHabits === 0 ? 0 : Number(((completedToday / totalHabits) * 100).toFixed(2)),
    longestCurrentStreak: streaks.length ? Math.max(...streaks.map((item) => item.currentStreak)) : 0,
    longestOverallStreak: streaks.length ? Math.max(...streaks.map((item) => item.longestStreak)) : 0
  };

  res.status(200).json({
    success: true,
    data: analytics
  });
});

const getStreakData = asyncHandler(async (req, res) => {
  const habits = await Habit.find().sort({ createdAt: -1 });

  const streakData = habits.map((habit) => ({
    id: habit._id,
    name: habit.name,
    frequency: habit.frequency,
    currentStreak: calculateCurrentStreak(habit.completionDates),
    longestStreak: calculateLongestStreak(habit.completionDates),
    totalCompletions: habit.completionDates.length,
    lastCompletedDate: habit.completionDates.length
      ? habit.completionDates[habit.completionDates.length - 1]
      : null
  }));

  res.status(200).json({
    success: true,
    count: streakData.length,
    data: streakData
  });
});

module.exports = {
  createHabit,
  getAllHabits,
  updateHabit,
  deleteHabit,
  markHabitComplete,
  getAnalyticsData,
  getStreakData
};
