import { Clock, Trash2 } from 'lucide-react';
import { CHAT_HISTORY } from '@/data/faqData';

interface ConversationHistoryProps {
  variant?: 'sidebar' | 'drawer';
  onClose?: () => void;
}

export default function ConversationHistory({ variant = 'sidebar', onClose }: ConversationHistoryProps) {
  return (
    <div
      className={variant === 'sidebar' ? 'flex flex-col h-full' : 'flex flex-col'}
      data-testid="conversation-history"
    >
      <div className="flex items-center justify-between p-4 border-b border-[#e2eedd]">
        <h3 className="text-sm font-semibold text-[#1a2e14]">Conversation History</h3>
        <div className="flex items-center gap-2">
          <button
            className="text-xs text-[#9ab88e] hover:text-[#c0392b] flex items-center gap-1 transition-colors"
            data-testid="button-clear-history"
          >
            <Trash2 size={12} />
            Clear
          </button>
          {variant === 'drawer' && onClose && (
            <button
              onClick={onClose}
              className="text-xs text-[#5a7a52] hover:text-[#1a2e14] ml-2 transition-colors"
              data-testid="button-close-history-drawer"
            >
              Done
            </button>
          )}
        </div>
      </div>

      <div className={`${variant === 'sidebar' ? 'flex-1 overflow-y-auto' : ''} p-3`}>
        <p className="text-[10px] text-[#9ab88e] uppercase tracking-wider px-2 mb-2 font-medium">Today</p>
        <div className="space-y-1">
          {CHAT_HISTORY.map((item) => (
            <button
              key={item.id}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#f0f7ed] transition-colors group"
              data-testid={`history-item-${item.id}`}
            >
              <p className="text-xs font-medium text-[#1a2e14] truncate group-hover:text-[#4a7c3f] transition-colors">
                {item.question}
              </p>
              <p className="text-[10px] text-[#9ab88e] flex items-center gap-1 mt-0.5">
                <Clock size={9} />
                {item.time}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
