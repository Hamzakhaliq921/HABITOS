const MS_PER_DAY = 24 * 60 * 60 * 1000;

const formatDateKey = (dateInput = new Date()) => {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().split("T")[0];
};

const differenceInDays = (laterDateKey, earlierDateKey) => {
  const later = new Date(`${laterDateKey}T00:00:00.000Z`);
  const earlier = new Date(`${earlierDateKey}T00:00:00.000Z`);

  return Math.round((later - earlier) / MS_PER_DAY);
};

const calculateCurrentStreak = (completionDates) => {
  if (!completionDates.length) {
    return 0;
  }

  const uniqueSortedDates = [...new Set(completionDates)].sort().reverse();
  const today = formatDateKey();

  if (uniqueSortedDates[0] !== today) {
    return 0;
  }

  let streak = 1;

  for (let index = 1; index < uniqueSortedDates.length; index += 1) {
    const dayDifference = differenceInDays(uniqueSortedDates[index - 1], uniqueSortedDates[index]);

    if (dayDifference === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
};
