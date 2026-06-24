import { TrendingUp, TrendingDown, Search, CheckCircle, HelpCircle, Star } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '@/components/common/PageHeader';
import ChartCard from '@/components/common/ChartCard';
import { ANALYTICS_KPIS, TOP_CATEGORIES_DATA, QUERY_TREND_DATA } from '@/data/analyticsData';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search, CheckCircle, HelpCircle, Star
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#e2eedd] rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-[#1a2e14] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.08) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function AnalyticsPage() {
  return (
    <div data-testid="analytics-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#1a2e14]">Analytics</h1>
          <p className="text-sm text-[#5a7a52] mt-0.5">Insights and analytics across knowledge base.</p>
        </div>
        <select className="text-sm bg-white border border-[#ddecd6] rounded-lg px-3 py-2 text-[#1a2e14] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 self-start sm:self-auto" data-testid="filter-date-range">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {ANALYTICS_KPIS.map((kpi) => {
          const IconComp = ICON_MAP[kpi.icon] || Search;
          return (
            <div key={kpi.label} className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-4" data-testid={`analytics-kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#f0f7ed] flex items-center justify-center">
                  <IconComp size={15} className="text-[#4a7c3f]" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.trend === 'up' ? 'text-[#27ae60]' : kpi.trend === 'down' ? 'text-[#c0392b]' : 'text-[#5a7a52]'}`}>
                  {kpi.trend === 'up' ? <TrendingUp size={12} /> : kpi.trend === 'down' ? <TrendingDown size={12} /> : null}
                  {kpi.delta}
                </span>
              </div>
              <p className="text-xs text-[#5a7a52] font-medium">{kpi.label}</p>
              <p className="text-2xl font-bold text-[#1a2e14] mt-0.5">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Donut / Pie Chart */}
        <ChartCard title="Top Query Categories" subtitle="Distribution by category — last 30 days">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={TOP_CATEGORIES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={PieLabel}
                >
                  {TOP_CATEGORIES_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="space-y-1.5 min-w-[160px]">
              {TOP_CATEGORIES_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2" data-testid={`legend-${item.name.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}>
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.fill }} />
                  <span className="text-xs text-[#1a2e14] flex-1 truncate">{item.name}</span>
                  <span className="text-xs font-semibold text-[#5a7a52]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Line Chart */}
        <ChartCard title="Query Trend" subtitle="Total vs resolved queries over time">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={QUERY_TREND_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2eedd" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5a7a52' }} />
              <YAxis tick={{ fontSize: 11, fill: '#5a7a52' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                type="monotone"
                dataKey="total"
                name="Total Queries"
                stroke="#4a7c3f"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#4a7c3f' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                name="Resolved Queries"
                stroke="#7ab648"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#7ab648' }}
                strokeDasharray="5 3"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
