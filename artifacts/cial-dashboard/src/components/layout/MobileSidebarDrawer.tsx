import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  X, Home, Bot, FileText, BookOpen, Box, ShieldCheck,
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

interface MobileSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebarDrawer({ open, onClose }: MobileSidebarDrawerProps) {
  const [location] = useLocation();
  const userRole = CURRENT_USER.role as Role;

  const visibleItems = NAV_ITEMS.filter(item => {
    if (!item.requiredRole) return true;
    return hasPermission(userRole, 'canAccessAdmin');
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { onClose(); }, [location]);

  if (!open) return null;

  const isActive = (path: string) => {
    if (path === '/workspace') return location === '/workspace';
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  const linkCls = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
      isActive(path)
        ? 'bg-gradient-to-r from-[#4a7c3f] to-[#5a9a45] text-white shadow-sm'
        : 'text-[#3d5c30] hover:bg-[#f0f7ed]'
    }`;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} data-testid="sidebar-overlay" />
      <aside className="relative w-64 bg-white flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-200" data-testid="mobile-sidebar">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e2eedd]">
          <div className="flex items-center gap-3">
            <img src={THEME.logoPath} alt="CIAL Logo" className="h-8 w-auto object-contain" />
            <div>
              <div className="font-bold text-sm text-[#1a2e14]">CIAL</div>
              <div className="text-[10px] text-[#5a7a52]">Knowledge OS</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52]" data-testid="button-close-sidebar">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {visibleItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || Home;
            return (
              <Link key={item.path} href={item.path} className={linkCls(item.path)}>
                <Icon size={18} className={isActive(item.path) ? 'text-white' : 'text-[#5a7a52]'} />
                <span>{item.label}</span>
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
            const Icon = ICON_MAP[item.icon] || Home;
            return (
              <Link key={item.path} href={item.path} className={linkCls(item.path)}>
                <Icon size={18} className={isActive(item.path) ? 'text-white' : 'text-[#5a7a52]'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3">
          <div className="rounded-xl p-4 text-white relative overflow-hidden" style={{ background: THEME.sidebarBottomBackground }}>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Leaf size={14} className="text-green-300" />
                <span className="text-[10px] text-green-200 uppercase tracking-wider">CIAL</span>
              </div>
              <p className="text-sm font-semibold">{THEME.swagathamText}</p>
              <p className="text-[10px] text-green-200 mt-1">Greener Aviation</p>
            </div>
            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/5" />
          </div>
        </div>
      </aside>
    </div>
  );
}
