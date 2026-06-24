import { useState } from 'react';
import { Lock } from 'lucide-react';
import PersonalStorageCard from '@/components/workspace/PersonalStorageCard';
import WorkspaceStatCard from '@/components/workspace/WorkspaceStatCard';
import RecentUploadsTable from '@/components/workspace/RecentUploadsTable';
import RecentAIChats from '@/components/workspace/RecentAIChats';
import { CollectionCard, NewCollectionCard } from '@/components/workspace/CollectionCard';
import AISearchModeSelector from '@/components/workspace/AISearchModeSelector';
import StorageBreakdownChart from '@/components/workspace/StorageBreakdownChart';
import RecentActivityCard from '@/components/workspace/RecentActivityCard';
import WorkspaceUploadButton from '@/components/workspace/WorkspaceUploadButton';
import PrivacyBadge from '@/components/workspace/PrivacyBadge';
import {
  WORKSPACE_STATS,
  MY_DOCUMENTS,
  MY_CONVERSATIONS,
  MY_COLLECTIONS,
  STORAGE_BREAKDOWN,
  RECENT_ACTIVITY,
  CURRENT_WORKSPACE_USER_ID,
} from '@/data/workspace/workspaceData';
import type { AISearchMode } from '@/data/workspace/workspaceTypes';
import { getVisibleDocuments } from '@/data/workspace/workspacePermissions';

const MODE_LABEL: Record<AISearchMode, string> = {
  enterprise: 'Enterprise Mode',
  workspace: 'Workspace Mode',
  hybrid: 'Hybrid Mode',
};

export default function WorkspacePage() {
  const [aiMode, setAiMode] = useState<AISearchMode>('hybrid');
  const [showUploadHint, setShowUploadHint] = useState(false);

  const currentUser = { id: CURRENT_WORKSPACE_USER_ID, role: 'engineer' };
  const visibleDocs = getVisibleDocuments(currentUser, MY_DOCUMENTS);
  const visibleConvos = MY_CONVERSATIONS.filter(c => c.ownerId === currentUser.id);

  return (
    <div className="min-h-full bg-[#f8fdf6]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#e2eedd] px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1a2e14]">My Workspace</h1>
              <Lock size={16} className="text-[#4a7c3f]" />
            </div>
            <p className="text-sm text-[#5a7a52] mt-0.5">
              Your personal knowledge space. Private. Secure. Only visible to you.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PrivacyBadge size="md" />
            <WorkspaceUploadButton onClick={() => setShowUploadHint(true)} />
          </div>
        </div>
        {showUploadHint && (
          <div className="mt-3 px-3 py-2 rounded-lg bg-[#f0f7ed] border border-[#ddecd6] text-xs text-[#4a7c3f] flex items-center justify-between">
            <span>Upload dialog would open here in a connected app.</span>
            <button onClick={() => setShowUploadHint(false)} className="ml-4 text-[#4a7c3f] hover:text-[#2d4f22] font-bold">✕</button>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {/* 3-column desktop layout */}
        <div className="flex flex-col xl:flex-row gap-6">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Storage Card */}
            <PersonalStorageCard />

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WORKSPACE_STATS.map((stat) => (
                <WorkspaceStatCard key={stat.key} stat={stat} />
              ))}
            </div>

            {/* Recent Uploads + Recent AI Chats — side by side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <RecentUploadsTable
                documents={visibleDocs}
                onViewAll={() => {}}
              />
              <RecentAIChats
                conversations={visibleConvos}
                onViewAll={() => {}}
                mode={MODE_LABEL[aiMode]}
              />
            </div>

            {/* Collections */}
            <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden" data-testid="collections-section">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f7ed]">
                <h3 className="text-sm font-semibold text-[#1a2e14]">My Collections</h3>
                <button className="text-xs text-[#4a7c3f] hover:underline font-medium">View all</button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-3 overflow-x-auto">
                  {MY_COLLECTIONS.map((col) => (
                    <CollectionCard key={col.id} collection={col} />
                  ))}
                  <NewCollectionCard />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div className="xl:w-72 2xl:w-80 space-y-4 flex-shrink-0">
            <AISearchModeSelector value={aiMode} onChange={setAiMode} />
            <StorageBreakdownChart data={STORAGE_BREAKDOWN} />
            <RecentActivityCard activities={RECENT_ACTIVITY} />
          </div>
        </div>
      </div>
    </div>
  );
}
