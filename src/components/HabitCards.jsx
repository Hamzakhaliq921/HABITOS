import { motion } from "framer-motion";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getProgress = (completed = 0, target = 1) => {
  if (!target || target <= 0) {
    return 0;
  }

  return clamp((completed / target) * 100, 0, 100);
};
