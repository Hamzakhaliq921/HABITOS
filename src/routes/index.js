const express = require("express");

const healthRoutes = require("./healthRoutes");
const habitRoutes = require("./habitRoutes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/habits", habitRoutes);

module.exports = router;
