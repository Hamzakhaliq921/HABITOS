const MS_PER_DAY = 24 * 60 * 60 * 1000;

const formatDateKey = (dateInput = new Date()) => {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().split("T")[0];
};

