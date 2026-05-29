import { memo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartPalette = {
  sage: '#6f9068',
  sageDeep: '#455b42',
  sageSoft: '#b3c9ad',
  sageGlow: '#d2e0ce',
};

const gridStroke = 'rgba(69, 91, 66, 0.12)';
const axisStroke = 'rgba(69, 91, 66, 0.34)';

function ChartCard({ eyebrow, title, subtitle, children, action }) {
  return (
    <section className="glass-panel animate-section-rise rounded-[2rem] p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">{eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold text-sage-900">{title}</h3>
          {subtitle ? <p className="mt-2 text-sm text-sage-700">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-6 h-[280px] w-full sm:h-[320px]">{children}</div>
    </section>
  );
}

function GlassTooltip({ active, payload, label, labelFormatter, formatter }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-glass backdrop-blur-xl">
      <p className="text-sm font-semibold text-sage-900">{labelFormatter ? labelFormatter(label, payload) : label}</p>
      <div className="mt-2 space-y-1.5">
        {payload.map((entry) => {
          const formatted = formatter ? formatter(entry.value, entry.name, entry, payload) : entry.value;
          const value = Array.isArray(formatted) ? formatted[0] : formatted;
          const name = Array.isArray(formatted) ? formatted[1] : entry.name;

          return (
            <div key={`${entry.dataKey}-${entry.name}`} className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-sage-700">{name}</span>
              <span className="font-semibold text-sage-900">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartLegend({ payload }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {payload?.map((entry) => (
        <span
          key={entry.value}
          className="rounded-full border border-white/40 bg-white/55 px-3 py-1 text-xs font-semibold text-sage-700"
        >
          <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </span>
      ))}
    </div>
  );
}

export function WeeklyProgressChart({ data }) {
  const average = Math.round(data.reduce((sum, item) => sum + item.completion, 0) / data.length);

  return (
    <ChartCard
      eyebrow="Weekly progress chart"
      title="Daily completion flow"
      subtitle="Hover to compare how your energy and follow-through moved throughout the week."
      action={<span className="rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-sage-700">{average}% avg</span>}
    >
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartPalette.sage} stopOpacity={0.9} />
              <stop offset="95%" stopColor={chartPalette.sageGlow} stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} stroke={axisStroke} />
          <YAxis axisLine={false} tickLine={false} stroke={axisStroke} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip content={<GlassTooltip formatter={(value, name) => [`${value}%`, name]} />} />
          <Area
            type="monotone"
            dataKey="completion"
            stroke={chartPalette.sageDeep}
            strokeWidth={3}
            fill="url(#weeklyGradient)"
            activeDot={{ r: 6, fill: chartPalette.sageDeep, stroke: '#fff', strokeWidth: 2 }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
