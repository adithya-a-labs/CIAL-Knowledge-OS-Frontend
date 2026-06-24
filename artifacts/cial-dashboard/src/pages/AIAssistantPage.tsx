import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ThumbsUp, ThumbsDown, ExternalLink, Clock, Trash2 } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { INITIAL_CHAT, CHAT_HISTORY } from '@/data/faqData';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { documentName: string; department: string; pageRef: string }[];
};

const MOCK_RESPONSES = [
  {
    content: "Here are the steps to resolve this issue:\n\n1. Check the system logs for error codes.\n2. Verify the power supply and connections.\n3. Perform a system restart following the standard procedure.\n4. If the issue persists, escalate to the Engineering team.\n5. Log all actions in CMMS for audit purposes.",
    sources: [{ documentName: 'Engineering Operations Manual', department: 'Engineering Department', pageRef: 'Page 23' }]
  },
  {
    content: "According to CIAL SOPs, the procedure involves:\n\n1. Immediately notify the Safety team via ext. 101.\n2. Isolate the affected area per emergency protocol.\n3. Document the incident in the Safety Management System.\n4. Follow up with a full incident report within 24 hours.",
    sources: [{ documentName: 'Safety & Emergency Procedures', department: 'Safety Department', pageRef: 'Page 12' }]
  }
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_CHAT as Message[]);
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
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      const numbered = line.match(/^(\d+)\.\s(.+)/);
      if (numbered) {
        return (
          <div key={`line-${i}`} className="flex gap-2 mt-1.5">
            <span className="w-5 h-5 rounded-full bg-[#4a7c3f] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{numbered[1]}</span>
            <span className="text-sm text-[#1a2e14]">{numbered[2]}</span>
          </div>
        );
      }
      if (line.trim()) return <p key={`line-${i}`} className="text-sm text-[#1a2e14] mt-1">{line}</p>;
      return null;
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col" data-testid="ai-assistant-page">
      <PageHeader title="AI Assistant" subtitle="Your intelligent assistant for all CIAL knowledge." />

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Chat Panel */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#e2eedd] shadow-sm min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 min-h-0" data-testid="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="max-w-[70%]">
                    <div className="bg-[#4a7c3f] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm" data-testid="chat-bubble-user">
                      {msg.content}
                    </div>
                    <p className="text-[11px] text-[#9ab88e] mt-1 text-right">{msg.timestamp}</p>
                  </div>
                ) : (
                  <div className="max-w-[80%] space-y-2">
                    <div className="bg-[#f8fdf6] border border-[#e2eedd] rounded-2xl rounded-tl-sm px-4 py-3" data-testid="chat-bubble-ai">
                      <p className="text-xs font-semibold text-[#4a7c3f] mb-2">Response:</p>
                      {formatContent(msg.content)}
                      <p className="text-[11px] text-[#9ab88e] mt-2">{msg.timestamp}</p>
                    </div>
                    {/* Source citation */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="bg-white border border-[#ddecd6] rounded-xl p-3" data-testid="source-citation">
                        <p className="text-xs font-semibold text-[#1a2e14] mb-2">Sources</p>
                        {msg.sources.map((src, i) => (
                          <div key={i} className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs font-medium text-[#1a2e14]">{src.documentName}</p>
                              <p className="text-[11px] text-[#5a7a52]">{src.department} — {src.pageRef}</p>
                            </div>
                            <button className="text-xs text-[#4a7c3f] hover:underline flex items-center gap-1 flex-shrink-0">
                              <ExternalLink size={11} />
                              Open
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Feedback */}
                    <div className="flex items-center gap-3 px-1">
                      <span className="text-[11px] text-[#9ab88e]">Was this helpful?</span>
                      <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors" data-testid="button-thumbs-up">
                        <ThumbsUp size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#fdf0f0] text-[#5a7a52] hover:text-[#c0392b] transition-colors" data-testid="button-thumbs-down">
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
            <p className="text-[10px] text-[#9ab88e] text-center">All responses may be inaccurate. Please verify critical information with official documents.</p>
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

        {/* Conversation History Sidebar */}
        <div className="hidden xl:flex flex-col w-64 bg-white rounded-xl border border-[#e2eedd] shadow-sm" data-testid="conversation-history">
          <div className="flex items-center justify-between p-4 border-b border-[#e2eedd]">
            <h3 className="text-sm font-semibold text-[#1a2e14]">Conversation History</h3>
            <button className="text-xs text-[#9ab88e] hover:text-[#c0392b] flex items-center gap-1">
              <Trash2 size={12} />
              Clear
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-[10px] text-[#9ab88e] uppercase tracking-wider px-2 mb-2 font-medium">Today</p>
            <div className="space-y-1">
              {CHAT_HISTORY.map((item) => (
                <button
                  key={item.id}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#f0f7ed] transition-colors group"
                  data-testid={`history-item-${item.id}`}
                >
                  <p className="text-xs font-medium text-[#1a2e14] truncate group-hover:text-[#4a7c3f]">{item.question}</p>
                  <p className="text-[10px] text-[#9ab88e] flex items-center gap-1 mt-0.5">
                    <Clock size={9} />
                    {item.time}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
