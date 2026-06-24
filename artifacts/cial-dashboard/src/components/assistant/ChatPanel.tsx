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
    <div className="flex flex-col bg-white rounded-xl border border-[#e2eedd] shadow-sm min-h-0 flex-1" data-testid="chat-panel">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 min-h-0" data-testid="chat-messages">
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
      <div className="p-4 border-t border-[#e2eedd]">
        <div className="flex items-center gap-2 bg-[#f8fdf6] border border-[#ddecd6] rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#4a7c3f]/30 focus-within:border-[#4a7c3f] transition-all">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask another question..."
            className="flex-1 bg-transparent text-sm text-[#1a2e14] placeholder:text-[#9ab88e] outline-none"
            data-testid="input-chat"
          />
          <button className="text-[#9ab88e] hover:text-[#4a7c3f] transition-colors" data-testid="button-voice">
            <Mic size={16} />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 bg-[#4a7c3f] hover:bg-[#3d6834] disabled:bg-gray-300 rounded-lg flex items-center justify-center text-white transition-colors"
            data-testid="button-send"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
