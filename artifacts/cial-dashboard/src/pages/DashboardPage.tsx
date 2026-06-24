import { useState } from 'react';
import { useLocation } from 'wouter';
import { Mic, Send, Search, FileText, Clock, AlertTriangle, Zap, BookmarkCheck, Globe, Plus } from 'lucide-react';
import StatCard from '@/components/common/StatCard';
import DashboardBlock from '@/components/common/DashboardBlock';
import { CURRENT_USER } from '@/config/userConfig';
import { DOCUMENTS } from '@/data/documentsData';
import { POPULAR_SEARCHES, KNOWLEDGE_GAPS, RECENT_CONVERSATIONS, ANNOUNCEMENTS } from '@/data/knowledgeBaseData';

const KPI_STATS = [
  { label: 'Total Documents', value: '2,458', delta: '+112 this month', trend: 'up' as const, icon: 'FileText', iconBg: 'hsl(100 35% 93%)' },
  { label: 'Knowledge Articles', value: '1,125', delta: '+68 this month', trend: 'up' as const, icon: 'Lightbulb', iconBg: 'hsl(200 50% 92%)' },
  { label: 'SOPs', value: '326', delta: '+18 this month', trend: 'up' as const, icon: 'ClipboardList', iconBg: 'hsl(260 40% 93%)' },
  { label: 'FAQs', value: '187', delta: '+9 this month', trend: 'up' as const, icon: 'HelpCircle', iconBg: 'hsl(30 60% 93%)' },
  { label: 'Unanswered Queries', value: '14', delta: '+3 this month', trend: 'up' as const, icon: 'AlertCircle', iconBg: 'hsl(0 50% 93%)', viewAllLink: '/queries' },
];

const QUICK_SEARCHES = ['Runway lighting fault procedure', 'Baggage handling SOP', 'Fire safety checklist', 'HVAC maintenance'];

const DOC_TYPE_COLORS: Record<string, string> = {
  Manual: 'bg-blue-100 text-blue-700',
  SOP: 'bg-green-100 text-green-700',
  Checklist: 'bg-purple-100 text-purple-700',
  Policy: 'bg-orange-100 text-orange-700',
  Report: 'bg-gray-100 text-gray-700',
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();
  const firstName = CURRENT_USER.name.split(' ')[0];

  const recentDocs = DOCUMENTS.slice(0, 5);

  const handleSearch = () => {
    if (searchQuery.trim()) setLocation('/assistant');
  };

  return (
    <div className="space-y-5" data-testid="dashboard-page">
      {/* Hero */}
      <div className="bg-white rounded-2xl border border-[#e2eedd] shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left: Greeting + Search */}
          <div className="lg:col-span-3 p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-[#1a2e14]" data-testid="text-welcome">
              Welcome back, <span className="text-[#4a7c3f]">{firstName}</span> 👋
            </h1>
            <p className="text-sm text-[#5a7a52] mt-1">How can I help you today?</p>

            {/* Search bar */}
            <div className="mt-5 flex items-center gap-2 bg-[#f8fdf6] border border-[#ddecd6] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#4a7c3f]/30 focus-within:border-[#4a7c3f] transition-all">
              <Search size={16} className="text-[#9ab88e] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Ask anything about CIAL knowledge base..."
                className="flex-1 bg-transparent text-sm text-[#1a2e14] placeholder:text-[#9ab88e] outline-none"
                data-testid="input-hero-search"
              />
              <button
                onClick={() => {}}
                className="text-[#9ab88e] hover:text-[#4a7c3f]"
                data-testid="button-voice-search"
              >
                <Mic size={16} />
              </button>
              <button
                onClick={handleSearch}
                className="w-8 h-8 bg-[#4a7c3f] hover:bg-[#3d6834] rounded-lg flex items-center justify-center text-white transition-colors"
                data-testid="button-submit-search"
              >
                <Send size={14} />
              </button>
            </div>

            {/* Quick search pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {QUICK_SEARCHES.map((q) => (
                <button
                  key={q}
                  onClick={() => setSearchQuery(q)}
                  className="px-3 py-1.5 rounded-full bg-[#f0f7ed] border border-[#ddecd6] text-xs text-[#4a7c3f] hover:bg-[#e2f0da] transition-colors"
                  data-testid={`chip-search-${q.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Hero image / gradient */}
          <div
            className="lg:col-span-2 min-h-[160px] lg:min-h-[220px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #d4e8c8 0%, #a8d080 40%, #7ab648 100%)'
            }}
          >
            {/* Decorative landscape elements */}
            <div className="absolute inset-0">
              {/* Sky gradient */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #c8e6a0 0%, #8fc85a 60%, #5a8a35 100%)' }} />
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-16 rounded-tl-3xl" style={{ background: '#4a7c3f' }} />
              <div className="absolute bottom-0 left-0 right-0 h-10 rounded-tl-3xl" style={{ background: '#3d6834' }} />
              {/* Tower silhouette */}
              <div className="absolute bottom-8 right-16 w-6 h-20 bg-[#2d4f22] rounded-sm" />
              <div className="absolute bottom-28 right-14 w-10 h-6 bg-[#2d4f22] rounded-sm" />
              <div className="absolute bottom-8 right-28 w-4 h-14 bg-[#3d6834] rounded-sm" />
              {/* Trees */}
              <div className="absolute bottom-6 left-4 w-8 h-12 rounded-t-full bg-[#2d4f22]" />
              <div className="absolute bottom-6 left-10 w-6 h-10 rounded-t-full bg-[#3d6834]" />
              {/* CIAL text */}
              <div className="absolute top-4 right-4 text-white/80 font-bold text-xl tracking-widest">CIAL</div>
              {/* Sun/glow */}
              <div className="absolute top-4 left-8 w-14 h-14 rounded-full bg-white/20 blur-md" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {KPI_STATS.map((stat) => (
          <StatCard
            key={stat.label}
            {...stat}
            onViewAll={stat.viewAllLink ? () => setLocation(stat.viewAllLink!) : undefined}
          />
        ))}
      </div>

      {/* Dashboard Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Recent Documents (spans 2 cols) */}
        <DashboardBlock
          title="Recent Documents"
          onViewAll={() => setLocation('/documents')}
          className="md:col-span-2 xl:col-span-2"
        >
          <div className="space-y-2.5">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 group cursor-pointer hover:bg-[#f8fdf6] -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                data-testid={`doc-row-${doc.id}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#f0f7ed] flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-[#4a7c3f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a2e14] truncate group-hover:text-[#4a7c3f] transition-colors">{doc.name}</p>
                  <p className="text-[11px] text-[#5a7a52]">{doc.department} Department</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${DOC_TYPE_COLORS[doc.type] || 'bg-gray-100 text-gray-600'}`}>
                    {doc.type}
                  </span>
                  <span className="text-[11px] text-[#9ab88e] flex items-center gap-1">
                    <Clock size={10} />
                    {doc.lastUpdated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DashboardBlock>

        {/* Popular Searches */}
        <DashboardBlock title="Popular Searches" onViewAll={() => setLocation('/knowledge')}>
          <div className="space-y-2">
            {POPULAR_SEARCHES.map((item) => (
              <div
                key={item.query}
                className="flex items-center justify-between gap-2 hover:bg-[#f8fdf6] -mx-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors group"
                data-testid={`popular-search-${item.query.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Search size={13} className="text-[#9ab88e] flex-shrink-0" />
                  <span className="text-sm text-[#1a2e14] truncate group-hover:text-[#4a7c3f] transition-colors">{item.query}</span>
                </div>
                <span className="text-xs font-semibold text-[#5a7a52] flex-shrink-0">{item.count}</span>
              </div>
            ))}
          </div>
        </DashboardBlock>

        {/* Knowledge Gaps */}
        <DashboardBlock title="Knowledge Gaps" onViewAll={() => setLocation('/knowledge')}>
          <div className="space-y-2">
            {KNOWLEDGE_GAPS.map((item) => (
              <div
                key={item.topic}
                className="flex items-center justify-between gap-2 hover:bg-[#fdf8f3] -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                data-testid={`gap-${item.topic.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <AlertTriangle size={13} className="text-[#e8820c] flex-shrink-0" />
                  <span className="text-sm text-[#1a2e14] truncate">{item.topic}</span>
                </div>
                <span className="text-[11px] text-[#9ab88e] flex-shrink-0">{item.count} queries</span>
              </div>
            ))}
          </div>
        </DashboardBlock>

        {/* AI Conversations */}
        <DashboardBlock
          title="AI Assistant – Recent Conversations"
          onViewAll={() => setLocation('/assistant')}
          className="md:col-span-2 xl:col-span-2"
        >
          <div className="space-y-2">
            {RECENT_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center justify-between gap-2 hover:bg-[#f8fdf6] -mx-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors group"
                data-testid={`conversation-${conv.id}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Clock size={13} className="text-[#9ab88e] flex-shrink-0" />
                  <span className="text-sm text-[#1a2e14] truncate group-hover:text-[#4a7c3f] transition-colors">{conv.question}</span>
                </div>
                <span className="text-[11px] text-[#9ab88e] flex-shrink-0 whitespace-nowrap">{conv.time}</span>
              </div>
            ))}
          </div>
        </DashboardBlock>

        {/* Quick Access */}
        <DashboardBlock title="Quick Access">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'New Query', icon: Plus, action: '/assistant', color: 'bg-[#f0f7ed] text-[#4a7c3f]' },
              { label: 'Upload Document', icon: FileText, action: '/documents', color: 'bg-[#fef3e8] text-[#e8820c]' },
              { label: 'My Bookmarks', icon: BookmarkCheck, action: '/documents', color: 'bg-[#e8f0fe] text-[#3b5bdb]' },
              { label: 'Department Wiki', icon: Globe, action: '/departments', color: 'bg-[#f3e8ff] text-[#7c3aed]' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setLocation(item.action)}
                className="flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-[#f0f7ed] border border-[#e2eedd] transition-colors group"
                data-testid={`quick-action-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <span className="text-xs font-medium text-[#1a2e14] text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </DashboardBlock>

        {/* Announcements */}
        <DashboardBlock
          title="Announcements"
          onViewAll={() => {}}
          className="md:col-span-2 xl:col-span-2"
        >
          <div className="space-y-3">
            {ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className="flex gap-3 p-3 bg-[#f8fdf6] rounded-xl border border-[#e2eedd]"
                data-testid={`announcement-${ann.id}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#4a7c3f] flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1a2e14]">{ann.title}</p>
                  <p className="text-xs text-[#5a7a52] mt-0.5">{ann.body}</p>
                  <p className="text-[11px] text-[#9ab88e] mt-1 flex items-center gap-1">
                    <Clock size={10} />
                    {ann.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardBlock>

      </div>
    </div>
  );
}
