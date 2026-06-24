import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileSidebarDrawer from './MobileSidebarDrawer';
import { THEME } from '@/config/themeConfig';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: THEME.background }}>
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile drawer */}
      <MobileSidebarDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area */}
      <div className="lg:pl-60 flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6" data-testid="main-content">
          {children}
        </main>
        {/* Footer */}
        <footer className="mt-4 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5a7a52] border-t border-[#e2eedd] bg-white/50">
          <span data-testid="footer-text">{THEME.footerText}</span>
          <span className="font-medium text-[#4a7c3f]" data-testid="footer-tagline">{THEME.swagathamText} 🌿</span>
        </footer>
      </div>
    </div>
  );
}
