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
    <div className="ce-toolbar flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="ce-control flex min-w-0 items-center gap-2 px-2.5 py-2">
          <FileSearch size={15} className="shrink-0 text-primary" />
          <span className="text-[11px] font-semibold uppercase text-muted-foreground">Scope</span>
          <select
            value={searchScope}
            onChange={(event) => onSearchScopeChange(event.target.value as SearchScope)}
            className="min-w-0 flex-1 bg-transparent text-xs font-medium text-foreground"
            data-testid="select-search-scope"
          >
            {Object.entries(SEARCH_SCOPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="ce-control flex min-w-0 items-center gap-2 px-2.5 py-2">
          <SlidersHorizontal size={15} className="shrink-0 text-primary" />
          <span className="text-[11px] font-semibold uppercase text-muted-foreground">Length</span>
          <select
            value={responseLength}
            onChange={(event) => onResponseLengthChange(event.target.value as ResponseLength)}
            className="min-w-0 flex-1 bg-transparent text-xs font-medium text-foreground"
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
        className="ce-action ce-action-primary min-h-9 px-3"
        data-testid="button-manage-context"
      >
        <BookOpenCheck size={15} />
        Manage Context
        <span className="rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] text-primary">
          {selectedContextCount + uploadedFileCount}
        </span>
      </button>
    </div>
  );
}
