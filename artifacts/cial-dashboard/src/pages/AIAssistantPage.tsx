import { useState } from 'react';
import { History, X } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import ChatPanel from '@/components/assistant/ChatPanel';
import ConversationHistory from '@/components/assistant/ConversationHistory';

export default function AIAssistantPage() {
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col" data-testid="ai-assistant-page">
      <div className="flex items-center justify-between">
        <PageHeader title="AI Assistant" subtitle="Your intelligent assistant for all CIAL knowledge." />

        {/* Mobile: open history drawer */}
        <button
          onClick={() => setHistoryDrawerOpen(true)}
          className="xl:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f0f7ed] text-[#4a7c3f] text-sm font-medium mb-4"
          data-testid="button-open-history-drawer"
        >
          <History size={15} />
          History
        </button>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Chat Panel (full width on mobile, flex-1 on desktop) */}
        <ChatPanel />

        {/* Conversation History Sidebar – desktop only */}
        <div
          className="hidden xl:flex flex-col w-64 bg-white rounded-xl border border-[#e2eedd] shadow-sm"
          data-testid="conversation-history-sidebar"
        >
          <ConversationHistory variant="sidebar" />
        </div>
      </div>

      {/* Mobile Conversation History Drawer */}
      {historyDrawerOpen && (
        <div
          className="xl:hidden fixed inset-0 z-50 flex"
          data-testid="history-drawer"
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setHistoryDrawerOpen(false)}
            aria-label="Close history drawer"
          />
          {/* Drawer panel */}
          <div className="relative ml-auto w-72 bg-white h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2eedd]">
              <h2 className="font-semibold text-sm text-[#1a2e14]">Conversation History</h2>
              <button
                onClick={() => setHistoryDrawerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#f0f7ed]"
                data-testid="button-close-history-drawer-icon"
              >
                <X size={16} className="text-[#5a7a52]" />
              </button>
            </div>
            <ConversationHistory
              variant="drawer"
              onClose={() => setHistoryDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
