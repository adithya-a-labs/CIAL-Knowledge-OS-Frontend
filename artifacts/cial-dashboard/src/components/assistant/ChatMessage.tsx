import { ThumbsUp, ThumbsDown } from 'lucide-react';
import SourceCitationCard from './SourceCitationCard';

export interface MessageSource {
  documentName: string;
  department: string;
  pageRef: string;
}

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: MessageSource[];
}

interface ChatMessageProps {
  message: ChatMessageData;
}

function formatContent(content: string) {
  return content.split('\n').map((line, i) => {
    const numbered = line.match(/^(\d+)\.\s(.+)/);
    if (numbered) {
      return (
        <div key={`line-${i}`} className="flex gap-2 mt-1.5">
          <span className="w-5 h-5 rounded-full bg-[#4a7c3f] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {numbered[1]}
          </span>
          <span className="text-sm text-[#1a2e14]">{numbered[2]}</span>
        </div>
      );
    }
    if (line.trim()) return <p key={`line-${i}`} className="text-sm text-[#1a2e14] mt-1">{line}</p>;
    return null;
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end" data-testid={`chat-message-user-${message.id}`}>
        <div className="max-w-[70%]">
          <div className="bg-[#4a7c3f] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
            {message.content}
          </div>
          <p className="text-[11px] text-[#9ab88e] mt-1 text-right">{message.timestamp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start" data-testid={`chat-message-ai-${message.id}`}>
      <div className="max-w-[80%] space-y-2">
        <div className="bg-[#f8fdf6] border border-[#e2eedd] rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-xs font-semibold text-[#4a7c3f] mb-2">Response:</p>
          {formatContent(message.content)}
          <p className="text-[11px] text-[#9ab88e] mt-2">{message.timestamp}</p>
        </div>

        {message.sources && message.sources.length > 0 && (
          <SourceCitationCard sources={message.sources} />
        )}

        {/* Feedback */}
        <div className="flex items-center gap-3 px-1">
          <span className="text-[11px] text-[#9ab88e]">Was this helpful?</span>
          <button
            className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors"
            data-testid={`button-thumbs-up-${message.id}`}
          >
            <ThumbsUp size={13} />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-[#fdf0f0] text-[#5a7a52] hover:text-[#c0392b] transition-colors"
            data-testid={`button-thumbs-down-${message.id}`}
          >
            <ThumbsDown size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
