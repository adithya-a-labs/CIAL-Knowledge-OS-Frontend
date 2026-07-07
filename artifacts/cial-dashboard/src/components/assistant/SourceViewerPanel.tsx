import { ChevronLeft, ChevronRight, FileSearch, X } from 'lucide-react';
import type { ChatSource } from '@/types/assistant';

interface SourceViewerPanelProps {
  open: boolean;
  source: ChatSource | null;
  sources: ChatSource[];
  onClose: () => void;
  onSelectSource: (source: ChatSource) => void;
}

function SourceTypeBadge({ sourceType }: { sourceType: ChatSource['sourceType'] }) {
  const label = sourceType === 'enterprise' ? 'Enterprise' : sourceType === 'workspace' ? 'Workspace' : 'Upload';
  const className =
    sourceType === 'enterprise'
      ? 'bg-[#f0f7ed] text-[#4a7c3f] border-[#cfe3c7]'
      : sourceType === 'workspace'
        ? 'bg-[#eef6fc] text-[#346c96] border-[#c7d8e8]'
        : 'bg-[#fff5e8] text-[#a86005] border-[#efd8b5]';

  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}

function SourceViewerContent({
  source,
  sources,
  onClose,
  onSelectSource,
}: Omit<SourceViewerPanelProps, 'open'>) {
  const currentIndex = source ? sources.findIndex((candidate) => candidate.id === source.id) : -1;
  const previousSource = currentIndex > 0 ? sources[currentIndex - 1] : null;
  const nextSource = currentIndex >= 0 && currentIndex < sources.length - 1 ? sources[currentIndex + 1] : null;

  if (!source) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[#e2eedd] px-4 py-3">
          <h2 className="text-sm font-semibold text-[#1a2e14]">Source Viewer</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-[#f0f7ed]" data-testid="button-close-source-viewer-empty">
            <X size={16} />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="rounded-xl border border-dashed border-[#dbead4] bg-[#f8fdf6] p-5 text-center">
            <FileSearch className="mx-auto mb-2 text-[#9ab88e]" size={28} />
            <p className="text-sm font-semibold text-[#1a2e14]">No valid source selected</p>
            <p className="mt-1 text-xs text-[#7d9b73]">
              Open a citation or source card to preview its mock document context.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col" data-testid="source-viewer-content">
      <div className="border-b border-[#e2eedd] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#4a7c3f] px-2 py-0.5 text-[11px] font-bold text-white">
                [{source.citationIndex}]
              </span>
              <SourceTypeBadge sourceType={source.sourceType} />
              {source.pageNumber && (
                <span className="text-[11px] font-semibold text-[#5a7a52]">Page {source.pageNumber}</span>
              )}
            </div>
            <h2 className="safe-text text-sm font-semibold text-[#1a2e14]">{source.documentTitle}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-[#f0f7ed]" data-testid="button-close-source-viewer">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="scrollbar-soft flex-1 overflow-y-auto p-4">
        <div className="flex min-h-[16rem] items-center justify-center rounded-xl border border-[#dbead4] bg-[#f5f8f2] p-5 text-center">
          <div>
            <FileSearch className="mx-auto mb-3 text-[#4a7c3f]" size={34} />
            <p className="text-sm font-semibold text-[#1a2e14]">PDF viewer placeholder.</p>
            <p className="mt-1 text-xs leading-5 text-[#5a7a52]">
              Future integration: render documentId at pageNumber and highlight chunkId.
            </p>
            <p className="mt-3 rounded-lg bg-white px-3 py-2 text-[11px] text-[#7d9b73]">
              {source.documentId} / page {source.pageNumber ?? 'n/a'} / {source.chunkId ?? 'chunk pending'}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[#e2eedd] bg-white p-3">
          <p className="mb-2 text-xs font-semibold text-[#4a7c3f]">Highlighted excerpt</p>
          <p className="safe-text text-sm leading-6 text-[#1a2e14]">
            {source.excerpt ?? 'No excerpt available for this mock citation.'}
          </p>
        </div>

        {source.reason && (
          <div className="mt-3 rounded-xl border border-[#e2eedd] bg-[#fbfef9] p-3">
            <p className="text-xs font-semibold text-[#5a7a52]">Why this source was used</p>
            <p className="safe-text mt-1 text-xs leading-5 text-[#1a2e14]">{source.reason}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-[#e2eedd] p-3">
        <button
          type="button"
          disabled={!previousSource}
          onClick={() => previousSource && onSelectSource(previousSource)}
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#dbead4] text-xs font-semibold text-[#4a7c3f] hover:bg-[#f0f7ed] disabled:cursor-not-allowed disabled:opacity-40"
          data-testid="button-previous-citation"
        >
          <ChevronLeft size={14} />
          Previous
        </button>
        <button
          type="button"
          disabled={!nextSource}
          onClick={() => nextSource && onSelectSource(nextSource)}
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#dbead4] text-xs font-semibold text-[#4a7c3f] hover:bg-[#f0f7ed] disabled:cursor-not-allowed disabled:opacity-40"
          data-testid="button-next-citation"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function SourceViewerPanel({
  open,
  source,
  sources,
  onClose,
  onSelectSource,
}: SourceViewerPanelProps) {
  if (!open) return null;

  return (
    <>
      <aside className="hidden w-[22rem] shrink-0 overflow-hidden rounded-xl border border-[#e2eedd] bg-white shadow-sm lg:block 2xl:w-[26rem]" data-testid="source-viewer-panel">
        <SourceViewerContent
          source={source}
          sources={sources}
          onClose={onClose}
          onSelectSource={onSelectSource}
        />
      </aside>

      <div className="fixed inset-0 z-50 bg-black/45 lg:hidden" data-testid="source-viewer-mobile">
        <div className="ml-auto flex h-full w-full max-w-[32rem] flex-col bg-white shadow-2xl">
          <SourceViewerContent
            source={source}
            sources={sources}
            onClose={onClose}
            onSelectSource={onSelectSource}
          />
        </div>
      </div>
    </>
  );
}
