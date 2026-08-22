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
