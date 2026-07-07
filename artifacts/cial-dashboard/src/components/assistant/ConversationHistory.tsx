import { Clock, MessageSquareText, Trash2 } from 'lucide-react';
import { HISTORY_GROUPS } from '@/data/assistantData';

interface ConversationHistoryProps {
  variant?: 'sidebar' | 'drawer';
  onClose?: () => void;
}

export default function ConversationHistory({ variant = 'sidebar', onClose }: ConversationHistoryProps) {
  return (
    <div
      className={variant === 'sidebar' ? 'flex h-full flex-col' : 'flex flex-col'}
      data-testid="conversation-history"
    >
      <div className="flex items-center justify-between border-b border-[#e2eedd] p-4">
        <h3 className="text-sm font-semibold text-[#1a2e14]">Conversation History</h3>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 text-xs text-[#9ab88e] transition-colors hover:text-[#c0392b]"
            data-testid="button-clear-history"
          >
            <Trash2 size={12} />
            Clear
          </button>
          {variant === 'drawer' && onClose && (
            <button
              onClick={onClose}
              className="ml-2 text-xs text-[#5a7a52] transition-colors hover:text-[#1a2e14]"
              data-testid="button-close-history-drawer"
            >
              Done
            </button>
          )}
        </div>
      </div>

      <div className={`${variant === 'sidebar' ? 'flex-1 overflow-y-auto' : ''} scrollbar-soft p-3`}>
        {HISTORY_GROUPS.map((group) => (
          <section key={group.label} className="mb-4 last:mb-0">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-normal text-[#9ab88e]">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`group w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                    item.active
                      ? 'border border-[#cfe3c7] bg-[#f0f7ed]'
                      : 'border border-transparent hover:bg-[#f8fdf6]'
                  }`}
                  data-testid={`history-item-${item.id}`}
                >
                  <p className="safe-text flex items-start gap-2 text-xs font-semibold text-[#1a2e14] transition-colors group-hover:text-[#4a7c3f]">
                    <MessageSquareText size={13} className="mt-0.5 shrink-0 text-[#4a7c3f]" />
                    <span className="min-w-0 truncate">{item.title}</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1 pl-5 text-[10px] text-[#9ab88e]">
                    <Clock size={9} />
                    {item.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
