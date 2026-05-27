import { AnalyticsCharts } from './charts/AnalyticsCharts';

const toneClasses = {
  emerald: 'from-emerald-300/90 via-emerald-100/70 to-white/30 text-emerald-900',
  sage: 'from-sage-300/90 via-sage-100/80 to-white/30 text-sage-900',
  gold: 'from-amber-200/90 via-amber-50/80 to-white/30 text-amber-900',
  ice: 'from-cyan-100/90 via-white/80 to-sky-50/60 text-slate-900',
};

const dayOptions = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-sage-700">{label}</span>
      {children}
    </label>
  );
}

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'dark'}
      className="theme-toggle rounded-2xl border border-white/40 bg-white/55 px-4 py-3 text-sm font-semibold text-sage-700 transition hover:-translate-y-0.5 hover:bg-white/75"
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

function Sidebar({ navItems, streakSummary, onNavigate }) {
  return (
    <aside className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-5 lg:p-6">
      <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-400 to-sage-600 text-lg font-bold text-white shadow-glow">
          H
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sage-600">HabitOS</p>
          <h1 className="font-display text-2xl text-sage-900">Analytics</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            onClick={() => onNavigate(item.key)}
            aria-current={item.active ? 'page' : undefined}
            className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
              item.active
                ? 'bg-white/60 text-sage-900 shadow-glass'
                : 'text-sage-700 hover:bg-white/45 hover:text-sage-900'
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/40 bg-white/35 text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="glass-panel mt-10 rounded-[1.75rem] p-4">
        <p className="text-sm text-sage-600">Current momentum</p>
        <p className="mt-2 font-display text-3xl text-sage-900">{streakSummary.current} days</p>
        <p className="mt-2 text-sm text-sage-700">Best streak so far: {streakSummary.best} days. Live API updates flow straight into this panel.</p>
      </div>
    </aside>
  );
}

function Header({ onRefresh, isRefreshing, exportReport, theme, toggleTheme, currentPage }) {
  const content = currentPage === 'prayers'
    ? {
        eyebrow: 'Prayer tracker',
        title: 'Stay steady with your five daily prayers and extra worship.',
      }
    : {
        eyebrow: 'Personal performance',
        title: 'A calmer view of your routines, streaks, and momentum.',
      };

  return (
    <header className="glass-panel-strong animate-dashboard-enter flex flex-col gap-5 rounded-[2rem] p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <div>
        <p className="section-title">{content.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-tight text-sage-900 md:text-5xl">
          {content.title}
        </h2>
      </div>

      <div className="flex items-center gap-3 self-start md:self-center">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <button
          type="button"
          onClick={exportReport}
          className="rounded-2xl border border-white/40 bg-white/50 px-4 py-3 text-sm font-semibold text-sage-700 transition hover:-translate-y-0.5 hover:bg-white/70"
        >
          Export Report
        </button>
        <button
          type="button"
          onClick={() => onRefresh()}
          aria-busy={isRefreshing}
          className="rounded-2xl bg-gradient-to-r from-sage-600 to-sage-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          {isRefreshing ? 'Refreshing...' : 'Sync Habits'}
        </button>
      </div>
    </header>
  );
}

function PrayerStatusBadge({ completed }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        completed ? 'bg-emerald-200/80 text-emerald-900' : 'bg-white/60 text-sage-700'
      }`}
    >
      {completed ? 'Completed' : 'Pending'}
    </span>
  );
}

function PrayerTracker({
  dailyPrayers,
  extraPrayers,
  extraPrayerDraft,
  setExtraPrayerDraft,
  togglePrayerCompletion,
  updatePrayerNotes,
  addExtraPrayer,
  removeExtraPrayer,
  prayerSummary,
}) {
  const rows = [...dailyPrayers, ...extraPrayers];

  return (
    <section className="grid gap-4 xl:gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Completed Today', value: String(prayerSummary.completedCount), detail: `${prayerSummary.totalCount} total prayers` },
          { label: 'Completion Rate', value: `${prayerSummary.completionRate}%`, detail: 'Across fard and extra prayers' },
          { label: 'Daily Obligatory', value: '5', detail: 'Fajr, Dhuhr, Asr, Maghrib, Isha' },
          { label: 'Extra Prayers', value: String(prayerSummary.extraCount), detail: 'Tahajjud, Witr, Duha and more' },
        ].map((item, index) => (
          <div key={item.label} className="animate-rise" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="glass-panel rounded-[1.75rem] p-5">
              <p className="text-sm font-medium text-sage-600">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-sage-900">{item.value}</p>
              <p className="mt-2 text-sm text-sage-700">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.7fr)] xl:gap-6">
        <section className="glass-panel animate-section-rise overflow-hidden rounded-[2rem] p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-title">Prayer table</p>
              <h3 className="mt-2 text-2xl font-semibold text-sage-900">Track your daily salah and optional prayers</h3>
            </div>
            <span className="rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-sage-700">Saved in your browser</span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full table-auto border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-sage-600">
                  <th className="px-4 py-2 font-semibold">Prayer</th>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Rakats</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                  <th className="px-4 py-2 font-semibold">Notes</th>
                  <th className="px-4 py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((prayer) => (
                  <tr key={prayer.id} className="rounded-[1.4rem] bg-white/40 shadow-sm">
                    <td className="rounded-l-[1.2rem] px-4 py-4 text-sm font-semibold text-sage-900">{prayer.name}</td>
                    <td className="px-4 py-4 text-sm text-sage-700">{prayer.category}</td>
                    <td className="px-4 py-4 text-sm text-sage-700">{prayer.rakats || 'Flexible'}</td>
                    <td className="px-4 py-4">
                      <PrayerStatusBadge completed={prayer.completed} />
                    </td>
                    <td className="px-4 py-4">
                      <input
                        value={prayer.notes}
                        onChange={(event) => updatePrayerNotes(prayer.id, event.target.value)}
                        placeholder="Add a note"
                        className="w-full min-w-[180px] rounded-2xl border border-white/40 bg-white/60 px-3 py-2 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
                      />
                    </td>
                    <td className="rounded-r-[1.2rem] px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => togglePrayerCompletion(prayer.id)}
                          className="rounded-full bg-sage-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sage-700"
                        >
                          {prayer.completed ? 'Mark pending' : 'Mark done'}
                        </button>
                        {prayer.category !== 'Obligatory' ? (
                          <button
                            type="button"
                            onClick={() => removeExtraPrayer(prayer.id)}
                            className="rounded-full border border-rose-200/60 bg-rose-50/70 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100/80"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel-strong animate-section-rise rounded-[2rem] p-5 md:p-6">
          <p className="section-title">Add extra prayer</p>
          <h3 className="mt-2 text-2xl font-semibold text-sage-900">Record Sunnah, Witr, Tahajjud, Duha, or personal nawafil</h3>

          <div className="mt-6 grid gap-4">
            <FormField label="Prayer name">
              <input
                value={extraPrayerDraft.name}
                onChange={(event) => setExtraPrayerDraft((current) => ({ ...current, name: event.target.value }))}
                placeholder="Tahajjud"
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
              />
            </FormField>

            <FormField label="Category">
              <input
                value={extraPrayerDraft.category}
                onChange={(event) => setExtraPrayerDraft((current) => ({ ...current, category: event.target.value }))}
                placeholder="Extra"
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
              />
            </FormField>

            <FormField label="Rakats">
              <input
                value={extraPrayerDraft.rakats}
                onChange={(event) => setExtraPrayerDraft((current) => ({ ...current, rakats: event.target.value }))}
                placeholder="2 Sunnah"
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
              />
            </FormField>

            <button
              type="button"
              onClick={addExtraPrayer}
              className="rounded-2xl bg-gradient-to-r from-sage-600 to-sage-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Add prayer to table
            </button>

            <div className="rounded-[1.5rem] border border-white/35 bg-white/40 p-4">
              <p className="text-sm font-semibold text-sage-800">Suggested extras</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Witr', 'Tahajjud', 'Duha', 'Ishraq', 'Awwabin'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setExtraPrayerDraft((current) => ({ ...current, name: item }))}
                    className="rounded-full border border-white/40 bg-white/55 px-3 py-2 text-xs font-semibold text-sage-700 transition hover:bg-white/75"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function StatCard({ stat, index }) {
  return (
    <div
      className="glass-panel rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/60"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className={`rounded-[1.4rem] bg-gradient-to-br p-4 ${toneClasses[stat.tone]}`}>
        <p className="text-sm font-medium opacity-75">{stat.label}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <span className="text-3xl font-bold">{stat.value}</span>
          <span className="rounded-full bg-white/55 px-3 py-1 text-xs font-semibold">{stat.trend}</span>
        </div>
      </div>
    </div>
  );
}

function HabitCard({ habit }) {
  return (
    <div className="glass-panel group animate-section-rise rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/60">
      <div className={`rounded-[1.5rem] bg-gradient-to-br ${habit.accent} p-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-sage-900">{habit.name}</p>
            <p className="mt-1 text-sm text-sage-700">{habit.cadence}</p>
            {habit.description ? <p className="mt-3 text-sm leading-6 text-sage-700/85">{habit.description}</p> : null}
          </div>
          <span className="rounded-full border border-white/50 bg-white/50 px-3 py-1 text-xs font-semibold text-sage-700">
            {habit.streak} day streak
          </span>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-sage-700">
            <span>Progress</span>
            <span>{habit.progress}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/40">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-sage-600 to-emerald-400 shadow-md transition-all duration-500 group-hover:brightness-105"
              style={{ width: `${habit.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HabitManager({
  draft,
  editingHabitId,
  setDraft,
  resetDraft,
  submitHabit,
  isSubmitting,
  error,
}) {
  const toggleTargetDay = (value) => {
    setDraft((current) => ({
      ...current,
      targetDays: current.targetDays.includes(value)
        ? current.targetDays.filter((day) => day !== value)
        : [...current.targetDays, value].sort((a, b) => a - b),
    }));
  };

  return (
    <section id="habit-manager" className="glass-panel-strong animate-section-rise rounded-[2rem] p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Habit manager</p>
          <h3 className="mt-2 text-2xl font-semibold text-sage-900">{editingHabitId ? 'Edit habit' : 'Create habit'}</h3>
        </div>
        {editingHabitId ? (
          <button
            type="button"
            onClick={resetDraft}
            className="rounded-2xl border border-white/40 bg-white/50 px-4 py-2 text-sm font-semibold text-sage-700 transition hover:bg-white/70"
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4">
        <FormField label="Habit name">
          <input
            value={draft.name}
            onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
            placeholder="Morning stretch"
            className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={draft.description}
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={3}
            placeholder="A short reminder for why this habit matters."
            className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
          />
        </FormField>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Frequency">
            <select
              value={draft.frequency}
              onChange={(event) => setDraft((current) => ({ ...current, frequency: event.target.value }))}
              className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </FormField>

          <FormField label="Color token">
            <input
              value={draft.color}
              onChange={(event) => setDraft((current) => ({ ...current, color: event.target.value }))}
              placeholder="sage"
              className="w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-sage-900 outline-none transition focus:border-sage-300 focus:bg-white/75"
            />
          </FormField>
        </div>

        {draft.frequency === 'weekly' ? (
          <div>
            <p className="mb-3 text-sm font-semibold text-sage-700">Target days</p>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((day) => {
                const active = draft.targetDays.includes(day.value);

                return (
                  <button
                    type="button"
                    key={day.value}
                    onClick={() => toggleTargetDay(day.value)}
                    aria-pressed={active}
                    className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? 'bg-sage-600 text-white shadow-glow'
                        : 'border border-white/40 bg-white/55 text-sage-700 hover:bg-white/75'
                    }`}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {error ? <p className="rounded-2xl bg-rose-50/80 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}

        <button
          type="button"
          onClick={submitHabit}
          disabled={isSubmitting}
          className="rounded-2xl bg-gradient-to-r from-sage-600 to-sage-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : editingHabitId ? 'Update habit' : 'Create habit'}
        </button>
      </div>
    </section>
  );
}

function HabitCollection({ habits, pendingHabitIds, beginEditHabit, removeHabit, markHabitComplete }) {
  if (!habits.length) {
    return (
      <section className="glass-panel empty-state animate-section-rise relative overflow-hidden rounded-[2rem] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-sage-500 to-emerald-300 text-lg font-bold text-white shadow-glow">
          H
        </div>
        <p className="section-title mt-5">Habit cards</p>
        <h3 className="mt-3 text-3xl font-semibold text-sage-900">Build your first ritual</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-sage-700">
          Create a habit to unlock achievements, streak tracking, live analytics, exportable reports, and a dashboard that feels like a polished SaaS product.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['Live analytics', 'Achievement badges', 'Progress exports'].map((pill) => (
            <span key={pill} className="rounded-full border border-white/40 bg-white/60 px-3 py-2 text-xs font-semibold text-sage-700">
              {pill}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => document.getElementById('habit-manager')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="mt-8 rounded-2xl bg-gradient-to-r from-sage-600 to-sage-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
        >
          Create first habit
        </button>
      </section>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {habits.map((habit) => {
        const isPending = pendingHabitIds.includes(habit._id);

        return (
          <div key={habit._id} className={`${isPending ? 'opacity-70' : ''}`}>
            <HabitCard habit={habit} />
            <div className="mt-3 flex flex-wrap gap-2 px-2">
              <button
                type="button"
                onClick={() => markHabitComplete(habit._id)}
                disabled={isPending || habit.completedToday}
                className="rounded-full bg-sage-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sage-700 disabled:cursor-not-allowed disabled:bg-sage-300"
              >
                {habit.completedToday ? 'Completed today' : 'Mark complete'}
              </button>
              <button
                type="button"
                onClick={() => beginEditHabit(habit)}
                disabled={isPending}
                className="rounded-full border border-white/40 bg-white/55 px-3 py-2 text-xs font-semibold text-sage-700 transition hover:bg-white/75 disabled:cursor-not-allowed"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => removeHabit(habit._id)}
                disabled={isPending}
                className="rounded-full border border-rose-200/60 bg-rose-50/70 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100/80 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AchievementBadges({ achievements }) {
  return (
    <section className="glass-panel animate-section-rise rounded-[2rem] p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Achievement badges</p>
          <h3 className="mt-2 text-2xl font-semibold text-sage-900">Milestones worth showing off</h3>
        </div>
        <span className="rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-sage-700">
          {achievements.filter((badge) => badge.earned).length}/{achievements.length} earned
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {achievements.map((badge, index) => (
          <article
            key={badge.title}
            className={`rounded-[1.6rem] border p-4 transition duration-300 ${
              badge.earned
                ? 'border-emerald-200/70 bg-gradient-to-br from-emerald-100/80 via-white/70 to-sage-100/70 shadow-glass'
                : 'border-white/35 bg-white/35'
            }`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-bold ${badge.earned ? 'bg-sage-700 text-white' : 'bg-white/60 text-sage-600'}`}>
                {badge.icon}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-sage-900">{badge.title}</h4>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${badge.earned ? 'bg-emerald-200/70 text-emerald-900' : 'bg-white/60 text-sage-600'}`}>
                    {badge.earned ? 'Unlocked' : 'In progress'}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-sage-700">{badge.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivityPanel({ activityFeed }) {
  return (
    <section className="glass-panel animate-section-rise rounded-[2rem] p-5 md:p-6">
      <p className="section-title">Experience layer</p>
      <h3 className="mt-2 text-2xl font-semibold text-sage-900">What makes this feel premium</h3>
      <div className="mt-6 grid gap-4">
        {activityFeed.map((item) => (
          <article key={item.label} className="rounded-[1.5rem] border border-white/35 bg-white/45 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-sage-600">{item.label}</p>
              <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-semibold text-sage-700">{item.value}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-sage-700">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AnalyticsSection({ insights }) {
  return (
    <section className="glass-panel animate-section-rise rounded-[2rem] p-5 md:p-6">
      <p className="section-title">Analytics section</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold text-sage-900">Insights that feel actionable</h3>
        <span className="hidden rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-sage-700 md:inline-flex">
          Live interactions enabled
        </span>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {insights.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.6rem] border border-white/35 bg-white/40 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/55"
          >
            <p className="text-sm font-medium text-sage-600">{item.label}</p>
            <h4 className="mt-3 text-xl font-semibold text-sage-900">{item.value}</h4>
            <p className="mt-3 text-sm leading-6 text-sage-700">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StreakCounter({ streakSummary }) {
  return (
    <section className="glass-panel-strong animate-section-rise relative overflow-hidden rounded-[2rem] p-5 md:p-6">
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-10 translate-x-8 rounded-full bg-emerald-200/60 blur-3xl" />
      <p className="section-title">Streak counter</p>
      <div className="mt-3 flex flex-wrap items-end gap-4">
        <span className="font-display text-6xl leading-none text-sage-900">{streakSummary.current}</span>
        <div className="pb-2">
          <p className="text-lg font-semibold text-sage-800">days in flow</p>
          <p className="text-sm text-sage-700">Best recorded streak: {streakSummary.best} days. Every completion updates this card immediately.</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <span
            key={index}
            className={`h-3 flex-1 rounded-full ${
              index < Math.min(streakSummary.current, 7) ? 'bg-gradient-to-r from-sage-500 to-emerald-300' : 'bg-white/45'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <section className="grid gap-4 xl:grid-cols-2 xl:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="glass-panel skeleton-card rounded-[2rem] p-5 md:p-6">
          <div className="skeleton-line h-4 w-24 rounded-full" />
          <div className="skeleton-line mt-4 h-8 w-2/3 rounded-full" />
          <div className="skeleton-line mt-3 h-4 w-5/6 rounded-full" />
          <div className="skeleton-chart mt-8 h-[220px] rounded-[1.5rem]" />
          <div className="mt-6 flex gap-3">
            <div className="skeleton-line h-10 flex-1 rounded-2xl" />
            <div className="skeleton-line h-10 w-24 rounded-2xl" />
          </div>
        </div>
      ))}
    </section>
  );
}

export function DashboardShell({
  navItems,
  currentPage,
  onNavigate,
  draft,
  editingHabitId,
  isBootstrapping,
  isRefreshing,
  isSubmitting,
  pendingHabitIds,
  error,
  setDraft,
  resetDraft,
  beginEditHabit,
  submitHabit,
  removeHabit,
  markHabitComplete,
  refreshHabits,
  exportReport,
  theme,
  toggleTheme,
  stats,
  habits,
  analyticsDatasets,
  streakSummary,
  insights,
  achievements,
  activityFeed,
  dailyPrayers,
  extraPrayers,
  extraPrayerDraft,
  setExtraPrayerDraft,
  togglePrayerCompletion,
  updatePrayerNotes,
  addExtraPrayer,
  removeExtraPrayer,
  prayerSummary,
}) {
  return (
    <div className="page-shell relative min-h-screen overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute left-10 top-16 h-40 w-40 rounded-full bg-white/50 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-16 right-12 h-56 w-56 rounded-full bg-sage-200/50 blur-3xl animate-pulseSoft" />

      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-6">
        <Sidebar navItems={navItems} streakSummary={streakSummary} onNavigate={onNavigate} />

        <main className="grid gap-4 xl:gap-6" role="main">
          <Header
            onRefresh={refreshHabits}
            isRefreshing={isRefreshing}
            exportReport={exportReport}
            theme={theme}
            toggleTheme={toggleTheme}
            currentPage={currentPage}
          />

          {currentPage === 'prayers' ? (
            <PrayerTracker
              dailyPrayers={dailyPrayers}
              extraPrayers={extraPrayers}
              extraPrayerDraft={extraPrayerDraft}
              setExtraPrayerDraft={setExtraPrayerDraft}
              togglePrayerCompletion={togglePrayerCompletion}
              updatePrayerNotes={updatePrayerNotes}
              addExtraPrayer={addExtraPrayer}
              removeExtraPrayer={removeExtraPrayer}
              prayerSummary={prayerSummary}
            />
          ) : (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="animate-rise">
                    <StatCard stat={stat} index={index} />
                  </div>
                ))}
              </section>

              <section className="grid gap-4 xl:gap-6">
                <div className="flex items-end justify-between gap-4 px-1">
                  <div>
                    <p className="section-title">Habit cards</p>
                    <h3 className="mt-2 text-2xl font-semibold text-sage-900">Your core routines</h3>
                  </div>
                  <span className="hidden text-sm font-medium text-sage-600 md:inline">
                    {isRefreshing ? 'Syncing with API...' : `${habits.length} active habits`}
                  </span>
                </div>

                <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.7fr)] xl:gap-6">
                  <HabitCollection
                    habits={habits}
                    pendingHabitIds={pendingHabitIds}
                    beginEditHabit={beginEditHabit}
                    removeHabit={removeHabit}
                    markHabitComplete={markHabitComplete}
                  />
                  <HabitManager
                    draft={draft}
                    editingHabitId={editingHabitId}
                    setDraft={setDraft}
                    resetDraft={resetDraft}
                    submitHabit={submitHabit}
                    isSubmitting={isSubmitting}
                    error={error}
                  />
                </div>

                <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] xl:gap-6">
                  {isBootstrapping ? <LoadingState /> : <AnalyticsCharts datasets={analyticsDatasets} />}
                  <div className="grid gap-4 xl:gap-6">
                    <StreakCounter streakSummary={streakSummary} />
                    <AchievementBadges achievements={achievements} />
                    <ActivityPanel activityFeed={activityFeed} />
                    <AnalyticsSection insights={insights} />
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
