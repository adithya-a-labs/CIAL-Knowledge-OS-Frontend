import { CheckCircle2, Loader2 } from 'lucide-react';
import { RETRIEVAL_STAGES } from '@/data/assistantData';

interface RetrievalTimelineProps {
  activeStageIndex: number;
}

export default function RetrievalTimeline({ activeStageIndex }: RetrievalTimelineProps) {
  return (
    <div className="max-w-[94%] rounded-2xl rounded-tl-sm border border-[#e2eedd] bg-[#f8fdf6] px-4 py-3 sm:max-w-[84%] lg:max-w-[80%]" data-testid="retrieval-timeline">
      <p className="mb-3 text-xs font-semibold text-[#4a7c3f]">Preparing grounded answer</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {RETRIEVAL_STAGES.map((stage, index) => {
          const completed = index < activeStageIndex;
          const active = index === activeStageIndex;
          return (
            <div key={stage} className="flex items-center gap-2 text-xs">
              {completed ? (
                <CheckCircle2 size={14} className="text-[#4a7c3f]" />
              ) : active ? (
                <Loader2 size={14} className="animate-spin text-[#e8820c]" />
              ) : (
                <span className="h-3.5 w-3.5 rounded-full border border-[#cfe3c7]" />
              )}
              <span className={active ? 'font-semibold text-[#1a2e14]' : 'text-[#5a7a52]'}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
