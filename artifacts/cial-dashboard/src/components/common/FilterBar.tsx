interface FilterConfig {
  key: string;
  label: string;
  options: string[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  className?: string;
}

export default function FilterBar({ filters, values, onChange, className = '' }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={values[filter.key] ?? ''}
          onChange={e => onChange(filter.key, e.target.value)}
          className="text-sm bg-white border border-[#ddecd6] rounded-lg px-3 py-2 text-[#1a2e14] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 focus:border-[#4a7c3f] cursor-pointer"
          data-testid={`filter-${filter.key}`}
        >
          <option value="">{filter.label}</option>
          {filter.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
