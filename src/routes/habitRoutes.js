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

const router = express.Router();

router.get("/analytics", getAnalyticsData);
router.get("/streaks", getStreakData);
router.route("/").post(validateHabitBody, createHabit).get(getAllHabits);
router.put("/:id", validateObjectId, validateHabitBody, updateHabit);
router.delete("/:id", validateObjectId, deleteHabit);
router.patch("/:id/complete", validateObjectId, validateCompletionBody, markHabitComplete);

module.exports = router;
