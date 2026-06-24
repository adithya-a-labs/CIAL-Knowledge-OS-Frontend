interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
  }[];
  onChange: (key: string, value: string) => void;
  className?: string;
}

export default function FilterBar({ filters, onChange, className = '' }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={filter.value}
          onChange={e => onChange(filter.key, e.target.value)}
          className="text-sm bg-white border border-[#ddecd6] rounded-lg px-3 py-2 text-[#1a2e14] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 focus:border-[#4a7c3f] cursor-pointer"
          data-testid={`filter-${filter.key}`}
        >
          <option value="">{filter.label}</option>
          {filter.options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
