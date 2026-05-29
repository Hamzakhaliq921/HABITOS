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

function createHabitId() {
  return `habit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateHabitPayload(payload) {
  if (!payload?.name || !String(payload.name).trim()) {
    throw new Error('Habit name is required.');
  }

  if (payload.frequency && !['daily', 'weekly'].includes(payload.frequency)) {
    throw new Error('Frequency must be daily or weekly.');
  }
}
