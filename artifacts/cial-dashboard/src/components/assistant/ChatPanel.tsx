import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import ChatMessage, { ChatMessageData } from './ChatMessage';
import { INITIAL_CHAT, MOCK_AI_RESPONSES } from '@/data/faqData';

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageData[]>(
    INITIAL_CHAT as ChatMessageData[]
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessageData = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)];
      const aiMsg: ChatMessageData = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="responsive-card flex min-h-0 min-w-0 flex-1 flex-col border border-[#e2eedd] bg-white shadow-sm" data-testid="chat-panel">
      {/* Messages */}
      <div className="scrollbar-soft min-h-0 flex-1 space-y-4 overflow-y-auto p-3 sm:space-y-5 sm:p-5" data-testid="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#f8fdf6] border border-[#e2eedd] rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#4a7c3f] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#4a7c3f] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#4a7c3f] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-1.5 bg-[#fffdf8] border-t border-[#e2eedd]">
        <p className="text-[10px] text-[#9ab88e] text-center">
          All responses may be inaccurate. Please verify critical information with official documents.
        </p>
      </div>

      {/* Input */}
      <div className="border-t border-[#e2eedd] p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-[#ddecd6] bg-[#f8fdf6] px-3 py-2.5 transition-all focus-within:border-[#4a7c3f] focus-within:ring-2 focus-within:ring-[#4a7c3f]/30 sm:px-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask another question..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[#1a2e14] outline-none placeholder:text-[#9ab88e]"
            data-testid="input-chat"
          />
          <button className="text-[#9ab88e] hover:text-[#4a7c3f] transition-colors" data-testid="button-voice">
            <Mic size={16} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#4a7c3f] text-white transition-colors hover:bg-[#3d6834] disabled:bg-gray-300"
            data-testid="button-send"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
