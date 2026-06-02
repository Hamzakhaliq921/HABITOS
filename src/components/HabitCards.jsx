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

function ProgressRing({ progress, label }) {
  const strokeDashoffset = ringCircumference - (progress / 100) * ringCircumference;

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg
        viewBox="0 0 100 100"
        className="-rotate-90 h-full w-full drop-shadow-[0_8px_24px_rgba(91,122,92,0.2)]"
      >
        <circle
          cx="50"
          cy="50"
          r="42"
          className="fill-transparent stroke-white/20"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          className="fill-transparent stroke-[#dff3df]"
          strokeLinecap="round"
          strokeWidth="8"
          initial={{ strokeDashoffset: ringCircumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            strokeDasharray: ringCircumference,
            filter: "drop-shadow(0 0 10px rgba(218, 242, 218, 0.45))"
          }}
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold tracking-tight text-white">
          {Math.round(progress)}%
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/60">
          {label}
        </span>
      </div>
    </div>
  );
}


function HabitCard({ habit, index, onComplete }) {
  const progress = getProgress(habit.completedToday, habit.dailyGoal);
  const isComplete = progress >= 100;

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/20 bg-white/12 p-6 shadow-[0_18px_50px_rgba(44,72,45,0.18)] backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,244,229,0.32),transparent_42%),linear-gradient(135deg,rgba(116,153,120,0.34),rgba(57,84,61,0.18))]" />
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#d9efd7]/20 blur-3xl transition-transform duration-500 group-hover:scale-125" />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-white/20 bg-white/14 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#eef8ee]">
              {habit.category}
            </span>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {habit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                {habit.completedToday}/{habit.dailyGoal} completed today
              </p>
            </div>
          </div>

          <ProgressRing progress={progress} label="Daily" />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/14 bg-black/10 px-4 py-3 text-white/82">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Streak</p>
            <p className="mt-1 text-lg font-semibold">{habit.streakCount} days</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Weekly Goal</p>
            <p className="mt-1 text-lg font-semibold">{habit.weeklyGoal}</p>
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onComplete?.(habit)}
          className={`mt-auto inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            isComplete
              ? "border border-[#d8f0d8]/50 bg-[#e8f6e8] text-[#2f5131]"
              : "bg-[#dff1df] text-[#28432b] shadow-[0_12px_24px_rgba(196,224,196,0.28)] hover:bg-white"
          }`}
        >
          {isComplete ? "Completed Today" : "Mark Complete"}
        </motion.button>
      </div>
    </motion.article>
  );
}

export function HabitCards({ habits = [], onComplete }) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#6d8f72_0%,#52705b_100%)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {habits.map((habit, index) => (
          <HabitCard
            key={habit.id || habit._id || `${habit.title}-${index}`}
            habit={habit}
            index={index}
            onComplete={onComplete}
          />
        ))}
      </div>
    </section>
  );
}
