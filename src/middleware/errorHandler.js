const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
