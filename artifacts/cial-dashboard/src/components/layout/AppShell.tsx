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
    <div className="app-shell min-h-screen">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile drawer */}
      <MobileSidebarDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area */}
      <div className="lg:pl-60 flex min-h-screen min-w-0 flex-col transition-[padding] duration-200 ease-out">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="app-content flex-1 w-full min-w-0 px-3 py-4 sm:px-4 md:px-6 lg:px-7 2xl:px-8" data-testid="main-content">
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
