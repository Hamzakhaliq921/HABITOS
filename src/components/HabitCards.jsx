import { motion } from "framer-motion";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getProgress = (completed = 0, target = 1) => {
  if (!target || target <= 0) {
    return 0;
  }

  return clamp((completed / target) * 100, 0, 100);
};

const ringCircumference = 2 * Math.PI * 42;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};
