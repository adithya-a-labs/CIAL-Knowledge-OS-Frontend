import HeroSearch from '@/components/dashboard/HeroSearch';
import KpiRow from '@/components/dashboard/KpiRow';
import RecentDocumentsBlock from '@/components/dashboard/blocks/RecentDocumentsBlock';
import PopularSearchesBlock from '@/components/dashboard/blocks/PopularSearchesBlock';
import KnowledgeGapsBlock from '@/components/dashboard/blocks/KnowledgeGapsBlock';
import AIConversationsBlock from '@/components/dashboard/blocks/AIConversationsBlock';
import QuickAccessBlock from '@/components/dashboard/blocks/QuickAccessBlock';
import AnnouncementsBlock from '@/components/dashboard/blocks/AnnouncementsBlock';
import ExpertSpotlightBlock from '@/components/dashboard/blocks/ExpertSpotlightBlock';
import TopContributorsBlock from '@/components/dashboard/blocks/TopContributorsBlock';
import { DASHBOARD_BLOCKS } from '@/config/dashboardConfig';

const BLOCK_COMPONENTS: Record<string, React.ComponentType> = {
  RecentDocumentsBlock,
  PopularSearchesBlock,
  KnowledgeGapsBlock,
  AIConversationsBlock,
  QuickAccessBlock,
  AnnouncementsBlock,
  ExpertSpotlightBlock,
  TopContributorsBlock,
};

const COL_SPAN_CLASS: Record<number, string> = {
  1: '',
  2: 'md:col-span-2',
  3: 'md:col-span-2 xl:col-span-3',
};

export default function DashboardPage() {
  return (
    <div className="space-y-5" data-testid="dashboard-page">
      <HeroSearch />
      <KpiRow />

      {/* Config-driven block grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DASHBOARD_BLOCKS.filter(block => block.visible).map(block => {
          const BlockComponent = BLOCK_COMPONENTS[block.component];
          if (!BlockComponent) return null;
          return (
            <div key={block.id} className={COL_SPAN_CLASS[block.colSpan] ?? ''}>
              <BlockComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
