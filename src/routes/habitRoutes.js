const express = require("express");

const {
  createHabit,
  getAllHabits,
  updateHabit,
  deleteHabit,
  markHabitComplete,
  getAnalyticsData,
  getStreakData
} = require("../controllers/habitController");
const {
  validateHabitBody,
  validateObjectId,
  validateCompletionBody
} = require("../middleware/validateRequest");

