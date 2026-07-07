import { BookOpenCheck, FileSearch, SlidersHorizontal } from 'lucide-react';
import {
  RESPONSE_LENGTH_LABELS,
  SEARCH_SCOPE_LABELS,
} from '@/data/assistantData';
import type { ResponseLength, SearchScope } from '@/types/assistant';

interface ChatControlBarProps {
  searchScope: SearchScope;
  responseLength: ResponseLength;
  selectedContextCount: number;
  uploadedFileCount: number;
  onSearchScopeChange: (value: SearchScope) => void;
  onResponseLengthChange: (value: ResponseLength) => void;
  onManageContext: () => void;
}

export default function ChatControlBar({
  searchScope,
  responseLength,
  selectedContextCount,
  uploadedFileCount,
  onSearchScopeChange,
  onResponseLengthChange,
  onManageContext,
}: ChatControlBarProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-[#e2eedd] bg-white px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="flex min-w-0 items-center gap-2 rounded-lg border border-[#ddecd6] bg-[#f8fdf6] px-2.5 py-2">
          <FileSearch size={15} className="shrink-0 text-[#4a7c3f]" />
          <span className="text-[11px] font-semibold uppercase text-[#5a7a52]">Scope</span>
          <select
            value={searchScope}
            onChange={(event) => onSearchScopeChange(event.target.value as SearchScope)}
            className="min-w-0 flex-1 bg-transparent text-xs font-medium text-[#1a2e14]"
            data-testid="select-search-scope"
          >
            {Object.entries(SEARCH_SCOPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 items-center gap-2 rounded-lg border border-[#ddecd6] bg-[#f8fdf6] px-2.5 py-2">
          <SlidersHorizontal size={15} className="shrink-0 text-[#4a7c3f]" />
          <span className="text-[11px] font-semibold uppercase text-[#5a7a52]">Length</span>
          <select
            value={responseLength}
            onChange={(event) => onResponseLengthChange(event.target.value as ResponseLength)}
            className="min-w-0 flex-1 bg-transparent text-xs font-medium text-[#1a2e14]"
            data-testid="select-response-length"
          >
            {Object.entries(RESPONSE_LENGTH_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={onManageContext}
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#cfe3c7] bg-[#f0f7ed] px-3 text-xs font-semibold text-[#3d6834] transition-colors hover:bg-[#e5f2df]"
        data-testid="button-manage-context"
      >
        <BookOpenCheck size={15} />
        Manage Context
        <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] text-[#5a7a52]">
          {selectedContextCount + uploadedFileCount}
        </span>
      </button>
    </div>
  );
}
