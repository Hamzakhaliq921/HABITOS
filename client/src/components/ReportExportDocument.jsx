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
