interface DashboardBlockProps {
  title: string;
  viewAllHref?: string;
  onViewAll?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardBlock({ title, viewAllHref, onViewAll, children, className = '' }: DashboardBlockProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden ${className}`}
      data-testid={`block-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f7ed]">
        <h3 className="text-sm font-semibold text-[#1a2e14]">{title}</h3>
        {(viewAllHref || onViewAll) && (
          <button
            onClick={onViewAll}
            className="text-xs text-[#4a7c3f] hover:underline font-medium"
            data-testid={`link-viewall-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            View All
          </button>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
