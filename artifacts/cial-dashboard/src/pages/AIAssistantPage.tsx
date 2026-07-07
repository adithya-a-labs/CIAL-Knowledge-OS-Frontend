import { useState } from 'react';
import { History, X } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import ChatPanel from '@/components/assistant/ChatPanel';
import ConversationHistory from '@/components/assistant/ConversationHistory';

export default function AIAssistantPage() {
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);

  return (
    <div className="fluid-section flex min-h-[calc(100dvh-8rem)] flex-col" data-testid="ai-assistant-page">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="AI Assistant" subtitle="Your intelligent assistant for all CIAL knowledge." />

        {/* Mobile: open history drawer */}
        <button
          onClick={() => setHistoryDrawerOpen(true)}
          className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#f0f7ed] px-3 py-2 text-sm font-medium text-[#4a7c3f] transition-colors hover:bg-[#e5f2df] sm:w-auto xl:hidden"
          data-testid="button-open-history-drawer"
        >
          <History size={15} />
          History
        </button>
      </div>

      <div className="flex min-h-0 flex-1 gap-4">
        {/* Chat Panel (full width on mobile, flex-1 on desktop) */}
        <ChatPanel />

        {/* Conversation History Sidebar – desktop only */}
        <div
          className="hidden w-64 flex-col rounded-xl border border-[#e2eedd] bg-white shadow-sm xl:flex 2xl:w-72"
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
          <div className="scrollbar-soft relative ml-auto h-full w-[min(22rem,86vw)] overflow-y-auto bg-white shadow-2xl">
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
