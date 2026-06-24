import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { StorageBreakdownItem } from '@/data/workspace/workspaceTypes';

interface StorageBreakdownChartProps {
  data: StorageBreakdownItem[];
}

export default function StorageBreakdownChart({ data }: StorageBreakdownChartProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-4" data-testid="storage-breakdown-chart">
      <h3 className="text-sm font-semibold text-[#1a2e14] mb-3">Storage Breakdown</h3>

      <div className="flex items-center gap-4">
        <PieChart width={90} height={90}>
          <Pie
            data={data}
            cx={45}
            cy={45}
            innerRadius={26}
            outerRadius={42}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} GB`, '']}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2eedd' }}
          />
        </PieChart>

        <div className="flex-1 space-y-1.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-[#3d5c30]">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-[#1a2e14]">{item.value} GB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
