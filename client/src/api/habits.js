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

export function getHabitStorageKey() {
  return STORAGE_KEY;
}

export async function fetchHabits() {
  return getStoredHabits().sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
}

export async function createHabit(payload) {
  validateHabitPayload(payload);

  const habits = getStoredHabits();
  const timestamp = new Date().toISOString();
  const habit = {
    _id: createHabitId(),
    name: payload.name.trim(),
    description: payload.description || '',
    frequency: payload.frequency || 'daily',
    targetDays: payload.targetDays || [],
    color: payload.color || 'sage',
    completionDates: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  saveStoredHabits([habit, ...habits]);
  return habit;
}

export async function updateHabit(id, payload) {
  validateHabitPayload(payload);

  const habits = getStoredHabits();
  const habitIndex = habits.findIndex((habit) => habit._id === id);

  if (habitIndex === -1) {
    throw new Error('Habit not found.');
  }

  const updatedHabit = {
    ...habits[habitIndex],
    name: payload.name.trim(),
    description: payload.description || '',
    frequency: payload.frequency || 'daily',
    targetDays: payload.targetDays || [],
    color: payload.color || 'sage',
    updatedAt: new Date().toISOString(),
  };

  habits[habitIndex] = updatedHabit;
  saveStoredHabits(habits);
  return updatedHabit;
}

export async function deleteHabit(id) {
  const habits = getStoredHabits();
  saveStoredHabits(habits.filter((habit) => habit._id !== id));
}

export async function completeHabit(id, date) {
  const habits = getStoredHabits();
  const habitIndex = habits.findIndex((habit) => habit._id === id);

  if (habitIndex === -1) {
    throw new Error('Habit not found.');
  }

  const completionDate = date || new Date().toISOString().split('T')[0];
  const completionDates = Array.from(new Set([...(habits[habitIndex].completionDates || []), completionDate])).sort();
  const updatedHabit = {
    ...habits[habitIndex],
    completionDates,
    updatedAt: new Date().toISOString(),
  };

  habits[habitIndex] = updatedHabit;
  saveStoredHabits(habits);
  return updatedHabit;
}
