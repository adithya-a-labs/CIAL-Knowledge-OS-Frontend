import { Link, useLocation } from 'wouter';
import {
  Home, Bot, FileText, BookOpen, Box, ShieldCheck,
  HelpCircle, Users, BarChart2, Settings, Leaf,
  LayoutDashboard, StickyNote, Bookmark, MessageSquare, HardDrive,
} from 'lucide-react';
import { NAV_ITEMS, WORKSPACE_NAV_ITEMS } from '@/config/navigationConfig';
import { THEME } from '@/config/themeConfig';
import { CURRENT_USER } from '@/config/userConfig';
import { hasPermission } from '@/config/securityConfig';
import { Role } from '@/types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home, Bot, FileText, BookOpen, Box, ShieldCheck,
  HelpCircle, Users, BarChart2, Settings,
  LayoutDashboard, StickyNote, Bookmark, MessageSquare, HardDrive,
};

export default function Sidebar() {
  const [location] = useLocation();
  const userRole = CURRENT_USER.role as Role;

  const visibleItems = NAV_ITEMS.filter(item => {
    if (!item.requiredRole) return true;
    return hasPermission(userRole, 'canAccessAdmin');
  });

  const isActive = (path: string) => {
    if (path === '/workspace') return location === '/workspace';
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  const navLinkCls = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
      isActive(path)
        ? 'bg-gradient-to-r from-[#4a7c3f] to-[#5a9a45] text-white shadow-sm'
        : 'text-[#3d5c30] hover:bg-[#f0f7ed] hover:text-[#2d4f22]'
    }`;

  return (
    <aside
      className="hidden lg:flex flex-col w-60 min-h-screen fixed left-0 top-0 z-30 bg-white border-r border-[#e2eedd]"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#e2eedd]">
        <img
          src={THEME.logoPath}
          alt="CIAL Logo"
          className="h-10 w-auto object-contain"
          data-testid="sidebar-logo"
        />
        <div>
          <div className="font-bold text-sm text-[#1a2e14] leading-tight">CIAL</div>
          <div className="text-[10px] text-[#5a7a52] leading-tight">Knowledge OS</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5" data-testid="sidebar-nav">
        {visibleItems.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Home;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={navLinkCls(item.path)}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
            >
              <IconComponent size={18} className={isActive(item.path) ? 'text-white' : 'text-[#5a7a52]'} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        {/* MY WORKSPACE section */}
        <div className="pt-4 pb-1">
          <p className="text-[10px] font-bold text-[#7a9a72] uppercase tracking-widest px-3 mb-1">
            My Workspace
          </p>
        </div>
        {WORKSPACE_NAV_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Home;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={navLinkCls(item.path)}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <IconComponent size={18} className={isActive(item.path) ? 'text-white' : 'text-[#5a7a52]'} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="p-3">
        <div
          className="rounded-xl p-4 text-white relative overflow-hidden"
          style={{ background: THEME.sidebarBottomBackground }}
          data-testid="sidebar-bottom-card"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Leaf size={16} className="text-green-300" />
              <span className="text-[10px] font-medium text-green-200 uppercase tracking-wider">CIAL</span>
            </div>
            <p className="text-sm font-semibold text-white leading-snug">{THEME.swagathamText}</p>
            <p className="text-[10px] text-green-200 mt-1">Greener Aviation</p>
          </div>
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/5" />
          <div className="absolute -right-2 -bottom-4 w-14 h-14 rounded-full bg-white/5" />
        </div>
      </div>
    </aside>
  );
}
