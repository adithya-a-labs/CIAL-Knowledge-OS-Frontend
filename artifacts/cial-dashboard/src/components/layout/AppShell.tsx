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
      <Sidebar />
      <MobileSidebarDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-col transition-[padding] duration-200 ease-out lg:pl-60">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="app-content w-full min-w-0 flex-1 px-3 py-4 sm:px-4 md:px-6 lg:px-7 2xl:px-8" data-testid="main-content">
          {children}
        </main>
        <footer className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-border bg-white px-6 py-4 text-xs text-muted-foreground sm:flex-row">
          <span data-testid="footer-text">{THEME.footerText}</span>
          <span className="font-medium text-primary" data-testid="footer-tagline">{THEME.swagathamText}</span>
        </footer>
      </div>
    </div>
  );
}
