import { Link, useLocation } from 'wouter';
import {
  Home, Bot, FileText, BookOpen, ShieldCheck,
  HelpCircle, Users, Users2, BarChart2, Settings, Leaf,
  LayoutDashboard, StickyNote, Bookmark, MessageSquare, HardDrive,
  GraduationCap, Network, AlertTriangle, Building2,
  Shield, KeyRound, ScrollText,
} from 'lucide-react';
import { NAV_ITEMS, WORKSPACE_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/config/navigationConfig';
import { THEME } from '@/config/themeConfig';
import { CURRENT_USER } from '@/config/userConfig';
import { hasPermission } from '@/config/securityConfig';
import { Role } from '@/types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home, Bot, FileText, BookOpen, ShieldCheck,
  HelpCircle, Users, Users2, BarChart2, Settings,
  LayoutDashboard, StickyNote, Bookmark, MessageSquare, HardDrive,
  GraduationCap, Network, AlertTriangle, Building2,
  Shield, KeyRound, ScrollText,
};

export default function Sidebar() {
  const [location] = useLocation();
  const userRole = CURRENT_USER.role as Role;
  const canAdmin = hasPermission(userRole, 'canAccessAdmin');

  const visibleItems = NAV_ITEMS.filter(item => {
    if (!item.requiredRole) return true;
    return canAdmin;
  });

  const isActive = (path: string) => {
    if (path === '/workspace') return location === '/workspace';
    if (path === '/') return location === '/';
    if (path === '/admin') return location === '/admin';
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
      className="fixed left-0 top-0 z-30 hidden h-dvh w-60 flex-col border-r border-[#e2eedd] bg-white/95 shadow-[6px_0_24px_rgba(60,80,40,0.04)] backdrop-blur lg:flex"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="flex min-h-20 items-center gap-3 border-b border-[#e2eedd] px-5 py-4">
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
      <nav className="scrollbar-soft flex-1 space-y-0.5 overflow-y-auto px-3 py-4" data-testid="sidebar-nav">
        {visibleItems.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Home;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={navLinkCls(item.path)}
              data-testid={`nav-${item.label.toLowerCase().replace(/[\s&]/g, '-').replace(/-+/g, '-')}`}
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

        {/* ADMIN section */}
        {canAdmin && (
          <>
            <div className="pt-4 pb-1">
              <p className="text-[10px] font-bold text-[#7a9a72] uppercase tracking-widest px-3 mb-1">
                Admin
              </p>
            </div>
            {ADMIN_NAV_ITEMS.map((item) => {
              const IconComponent = ICON_MAP[item.icon] || Shield;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={navLinkCls(item.path)}
                  data-testid={`nav-${item.label.toLowerCase().replace(/[\s&]/g, '-').replace(/-+/g, '-')}`}
                >
                  <IconComponent size={18} className={isActive(item.path) ? 'text-white' : 'text-[#5a7a52]'} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
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
