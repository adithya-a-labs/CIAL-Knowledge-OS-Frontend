interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#e2eedd] shadow-sm p-5 ${className}`}
      data-testid={`chart-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#1a2e14]">{title}</h3>
        {subtitle && <p className="text-xs text-[#5a7a52] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
