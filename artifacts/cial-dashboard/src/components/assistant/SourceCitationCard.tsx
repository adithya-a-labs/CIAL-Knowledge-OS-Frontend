import { ExternalLink } from 'lucide-react';
import type { ChatSource } from '@/types/assistant';

interface SourceCitationCardProps {
  sources: ChatSource[];
  onOpenSource: (source: ChatSource) => void;
}

function getSourceTypeStyles(sourceType: ChatSource['sourceType']) {
  if (sourceType === 'enterprise') {
    return { label: 'Enterprise', className: 'bg-[#f0f7ed] text-[#4a7c3f] border-[#cfe3c7]' };
  }
  if (sourceType === 'workspace') {
    return { label: 'Workspace', className: 'bg-[#eef6fc] text-[#346c96] border-[#c7d8e8]' };
  }
  return { label: 'Upload', className: 'bg-[#fff5e8] text-[#a86005] border-[#efd8b5]' };
}

export default function SourceCitationCard({ sources, onOpenSource }: SourceCitationCardProps) {
  if (sources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dbead4] bg-white p-3 text-xs text-[#7d9b73]" data-testid="source-citation-card-empty">
        No sources available for this response.
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-[#ddecd6] bg-white p-3" data-testid="source-citation-card">
      <p className="text-xs font-semibold text-[#1a2e14]">Sources</p>
      {sources.map((source) => {
        const badge = getSourceTypeStyles(source.sourceType);
        return (
          <article key={source.id} className="rounded-lg border border-[#e2eedd] bg-[#fbfef9] p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#4a7c3f] px-2 py-0.5 text-[11px] font-bold text-white">
                    [{source.citationIndex}]
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge.className}`}>
                    {badge.label}
                  </span>
                  {source.score !== undefined && (
                    <span className="text-[11px] font-semibold text-[#5a7a52]">
                      {Math.round(source.score * 100)}% confidence
                    </span>
                  )}
                </div>
                <h3 className="safe-text text-xs font-semibold text-[#1a2e14]">
                  {source.documentTitle}
                </h3>
                <p className="mt-1 text-[11px] text-[#5a7a52]">
                  {source.department ?? 'Department pending'}
                  {source.pageNumber ? ` / Page ${source.pageNumber}` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenSource(source)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#cfe3c7] bg-white px-2 py-1 text-[11px] font-semibold text-[#4a7c3f] hover:bg-[#f0f7ed]"
                data-testid={`button-open-source-${source.citationIndex}`}
              >
                <ExternalLink size={12} />
                Open Source
              </button>
            </div>
            {source.reason && (
              <p className="safe-text mt-2 text-[11px] leading-5 text-[#1a2e14]">
                {source.reason}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
