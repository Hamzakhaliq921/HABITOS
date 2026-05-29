const STORAGE_KEY = 'habit-tracker-habits';

function getStoredHabits() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    throw new Error('Unable to read local habit data.');
  }
}

function saveStoredHabits(habits) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch {
    throw new Error('Unable to save local habit data.');
  }
}
