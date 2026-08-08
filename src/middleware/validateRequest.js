const mongoose = require("mongoose");

const AppError = require("../utils/AppError");
const { formatDateKey } = require("../utils/dateHelpers");

const validateHabitBody = (req, res, next) => {
  const { name, description, frequency, targetDays, color } = req.body;

  if (req.method === "POST" && (!name || !String(name).trim())) {
    return next(new AppError("Habit name is required", 400));
  }

  if (name !== undefined && !String(name).trim()) {
    return next(new AppError("Habit name cannot be empty", 400));
  }

  if (description !== undefined && typeof description !== "string") {
    return next(new AppError("Description must be a string", 400));
  }

  if (frequency !== undefined && !["daily", "weekly"].includes(frequency)) {
    return next(new AppError("Frequency must be either daily or weekly", 400));
  }

  if (targetDays !== undefined) {
    if (!Array.isArray(targetDays)) {
      return next(new AppError("Target days must be an array", 400));
    }

    const hasInvalidDay = targetDays.some(
      (day) => !Number.isInteger(day) || day < 0 || day > 6
    );

    if (hasInvalidDay) {
      return next(new AppError("Each target day must be a number between 0 and 6", 400));
    }
  }

  if (color !== undefined && typeof color !== "string") {
    return next(new AppError("Color must be a string", 400));
  }

  return next();
};
