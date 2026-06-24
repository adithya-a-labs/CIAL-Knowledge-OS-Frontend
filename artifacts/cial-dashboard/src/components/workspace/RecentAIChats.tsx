import { MessageSquare } from 'lucide-react';
import type { WorkspaceConversation } from '@/data/workspace/workspaceTypes';

const SOURCE_STYLE: Record<string, string> = {
  'Enterprise': 'bg-blue-50 text-blue-600 border border-blue-100',
  'My Workspace': 'bg-[#f0f7ed] text-[#4a7c3f] border border-[#ddecd6]',
};

interface RecentAIChatsProps {
  conversations: WorkspaceConversation[];
  onViewAll?: () => void;
  mode?: string;
}

export default function RecentAIChats({ conversations, onViewAll, mode = 'Hybrid Mode' }: RecentAIChatsProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden" data-testid="recent-ai-chats">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f7ed]">
        <div>
          <h3 className="text-sm font-semibold text-[#1a2e14]">Recent AI Chats</h3>
          <p className="text-[10px] text-[#5a7a52]">({mode})</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs text-[#4a7c3f] hover:underline font-medium"
          data-testid="button-chats-viewall"
        >
          View all
        </button>
      </div>

      <div className="divide-y divide-[#f0f7ed]">
        {conversations.map((conv) => (
          <div key={conv.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#f8fdf6] transition-colors cursor-pointer" data-testid={`chat-row-${conv.id}`}>
            <div className="w-7 h-7 rounded-full bg-[#f0f7ed] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare size={13} className="text-[#4a7c3f]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[#1a2e14] font-medium leading-snug truncate">{conv.question}</p>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                {conv.sources.map((src) => (
                  <span key={src} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${SOURCE_STYLE[src] ?? 'bg-gray-50 text-gray-500'}`}>
                    {src}
                  </span>
                ))}
                <span className="text-[10px] text-[#7a9a72]">· {conv.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
