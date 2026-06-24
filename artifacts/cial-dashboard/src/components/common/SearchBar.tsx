import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7a52]" />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#ddecd6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 focus:border-[#4a7c3f] text-[#1a2e14] placeholder:text-[#9ab88e] transition-colors"
        data-testid="input-search"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9ab88e] hover:text-[#5a7a52]"
          data-testid="button-clear-search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
