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

