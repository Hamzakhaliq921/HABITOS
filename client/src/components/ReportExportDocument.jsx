function ReportStatCard({ stat }) {
  return (
    <div className="report-stat-card">
      <p className="report-stat-label">{stat.label}</p>
      <p className="report-stat-value">{stat.value}</p>
      <p className="report-stat-trend">{stat.trend}</p>
    </div>
  );
}

function MiniBarChart({ title, data, colorClass }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="report-chart-card">
      <div className="report-chart-header">
        <h4>{title}</h4>
      </div>
      <div className="report-bar-chart">
        {data.map((item) => (
          <div key={item.label} className="report-bar-group">
            <div className="report-bar-track">
              <div
                className={`report-bar-fill ${colorClass}`}
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="report-bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HabitPerformanceChart({ data }) {
  return (
    <section className="report-chart-card">
      <div className="report-chart-header">
        <h4>Habit completion breakdown</h4>
      </div>
      <div className="report-progress-list">
        {data.map((item) => (
          <div key={item.name} className="report-progress-item">
            <div className="report-progress-meta">
              <span>{item.name}</span>
              <strong>{item.value}%</strong>
            </div>
            <div className="report-progress-track">
              <div className="report-progress-fill" style={{ width: `${item.value}%`, background: item.fill }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HeatmapChart({ data }) {
  return (
    <section className="report-chart-card">
      <div className="report-chart-header">
        <h4>Consistency heatmap</h4>
      </div>
      <div className="report-heatmap-grid">
        {data.map((item) => (
          <div
            key={`${item.week}-${item.day}`}
            className="report-heatmap-cell"
            style={{ background: item.fill }}
            title={`${item.label}: ${item.value}%`}
          />
        ))}
      </div>
    </section>
  );
}

function PrayerProgressChart({ prayers }) {
  return (
    <section className="report-chart-card">
      <div className="report-chart-header">
        <h4>Prayer completion status</h4>
      </div>
      <div className="report-progress-list">
        {prayers.map((prayer) => (
          <div key={prayer.id} className="report-progress-item">
            <div className="report-progress-meta">
              <span>{prayer.name}</span>
              <strong>{prayer.completed ? 'Completed' : 'Pending'}</strong>
            </div>
            <div className="report-progress-track">
              <div
                className="report-progress-fill"
                style={{
                  width: prayer.completed ? '100%' : '36%',
                  background: prayer.completed ? 'linear-gradient(90deg, #5e8a67 0%, #8fb189 100%)' : '#d8e7d4',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReportExportDocument({ dashboard, habits, prayers, prayerSummary }) {
  const weeklyBars = dashboard.analyticsDatasets.weeklyProgress.map((item) => ({
    label: item.day,
    value: item.completion,
  }));
  const productivityBars = dashboard.analyticsDatasets.productivity.map((item) => ({
    label: item.day,
    value: item.focusHours,
  }));

  return (
    <div className="report-export-root">
      <section className="report-page">
        <div className="report-hero">
          <div>
            <p className="report-kicker">HabitOS Premium Report</p>
            <h1>Performance overview</h1>
            <p className="report-subtitle">
              A polished snapshot of your routines, completion momentum, and streak health.
            </p>
          </div>
          <div className="report-badge">Generated {new Date().toLocaleDateString()}</div>
        </div>

        <div className="report-stats-grid">
          {dashboard.stats.map((stat) => (
            <ReportStatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="report-chart-grid">
          <MiniBarChart title="Weekly completion rate" data={weeklyBars} colorClass="report-bar-fill-sage" />
          <MiniBarChart title="Focus hours this week" data={productivityBars} colorClass="report-bar-fill-mint" />
          <HabitPerformanceChart data={dashboard.analyticsDatasets.completionRate} />
          <HeatmapChart data={dashboard.analyticsDatasets.heatmapCalendar.slice(-28)} />
        </div>
      </section>

      <section className="report-page">
        <div className="report-hero report-hero-secondary">
          <div>
            <p className="report-kicker">Routine details</p>
            <h1>Habit table and insights</h1>
            <p className="report-subtitle">
              A detailed look at active habits, adherence, and the insights driving the dashboard.
            </p>
          </div>
          <div className="report-badge">Portfolio-ready PDF export</div>
        </div>

        <div className="report-table-card">
          <table className="report-table">
            <thead>
              <tr>
                <th>Habit</th>
                <th>Cadence</th>
                <th>Progress</th>
                <th>Current streak</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id}>
                  <td>{habit.name}</td>
                  <td>{habit.cadence}</td>
                  <td>{habit.progress}%</td>
                  <td>{habit.streak} days</td>
                  <td>{habit.completedToday ? 'Completed today' : 'In progress'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-insights-grid">
          {dashboard.insights.map((insight) => (
            <article key={insight.label} className="report-insight-card">
              <p className="report-insight-label">{insight.label}</p>
              <h4>{insight.value}</h4>
              <p>{insight.note}</p>
            </article>
          ))}
        </div>

        <div className="report-achievements-card">
          <div className="report-chart-header">
            <h4>Achievement badges</h4>
          </div>
          <div className="report-achievements-grid">
            {dashboard.achievements.map((item) => (
              <div key={item.title} className={`report-achievement ${item.earned ? 'earned' : ''}`}>
                <div className="report-achievement-icon">{item.icon}</div>
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="report-page">
        <div className="report-hero report-hero-secondary">
          <div>
            <p className="report-kicker">Prayer companion</p>
            <h1>Daily salah and extra worship</h1>
            <p className="report-subtitle">
              A calm, printable record of your five daily prayers alongside optional prayers and notes.
            </p>
          </div>
          <div className="report-badge">{prayerSummary.completionRate}% prayer completion</div>
        </div>

        <div className="report-stats-grid report-stats-grid-prayer">
          {[
            { label: 'Completed Prayers', value: String(prayerSummary.completedCount), trend: `${prayerSummary.totalCount} total tracked` },
            { label: 'Obligatory Prayers', value: '5', trend: 'Fajr, Dhuhr, Asr, Maghrib, Isha' },
            { label: 'Extra Prayers', value: String(prayerSummary.extraCount), trend: 'Optional prayers added by you' },
            { label: 'Completion Rate', value: `${prayerSummary.completionRate}%`, trend: 'Across daily and extra prayers' },
          ].map((stat) => (
            <ReportStatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="report-chart-grid">
          <PrayerProgressChart prayers={prayers} />
          <section className="report-chart-card">
            <div className="report-chart-header">
              <h4>Prayer notes snapshot</h4>
            </div>
            <div className="report-prayer-notes-list">
              {prayers.filter((prayer) => prayer.notes).length ? (
                prayers
                  .filter((prayer) => prayer.notes)
                  .slice(0, 6)
                  .map((prayer) => (
                    <article key={prayer.id} className="report-prayer-note-item">
                      <div className="report-progress-meta">
                        <span>{prayer.name}</span>
                        <strong>{prayer.category}</strong>
                      </div>
                      <p>{prayer.notes}</p>
                    </article>
                  ))
              ) : (
                <div className="report-prayer-note-item">
                  <p>No notes added yet. Use the prayer table in the app to record reflections or reminders.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="report-table-card">
          <table className="report-table">
            <thead>
              <tr>
                <th>Prayer</th>
                <th>Category</th>
                <th>Rakats</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {prayers.map((prayer) => (
                <tr key={prayer.id}>
                  <td>{prayer.name}</td>
                  <td>{prayer.category}</td>
                  <td>{prayer.rakats || 'Flexible'}</td>
                  <td>{prayer.completed ? 'Completed' : 'Pending'}</td>
                  <td>{prayer.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

