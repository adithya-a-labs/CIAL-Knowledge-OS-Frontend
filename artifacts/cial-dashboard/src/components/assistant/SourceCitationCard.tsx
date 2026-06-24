import { ExternalLink } from 'lucide-react';
import { MessageSource } from './ChatMessage';

interface SourceCitationCardProps {
  sources: MessageSource[];
}

export default function SourceCitationCard({ sources }: SourceCitationCardProps) {
  return (
    <div className="bg-white border border-[#ddecd6] rounded-xl p-3" data-testid="source-citation-card">
      <p className="text-xs font-semibold text-[#1a2e14] mb-2">Sources</p>
      {sources.map((src, i) => (
        <div key={i} className="flex items-start justify-between gap-2 mt-1.5 first:mt-0">
          <div>
            <p className="text-xs font-medium text-[#1a2e14]">{src.documentName}</p>
            <p className="text-[11px] text-[#5a7a52]">{src.department} — {src.pageRef}</p>
          </div>
          <button
            className="text-xs text-[#4a7c3f] hover:underline flex items-center gap-1 flex-shrink-0 mt-0.5"
            data-testid={`button-open-source-${i}`}
          >
            <ExternalLink size={11} />
            Open
          </button>
        </div>
      ))}
    </div>
  );
}
