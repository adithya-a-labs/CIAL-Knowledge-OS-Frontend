import { Link, useLocation } from 'wouter';
import {
  Home, Bot, FileText, BookOpen, ShieldCheck,
  HelpCircle, Users, Users2, BarChart2, Settings,
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
    if (path === '/knowledge-center') {
      return location.startsWith('/knowledge-center') || location === '/documents' || location === '/knowledge' || location === '/policies';
    }
    if (path === '/workspace') return location === '/workspace';
    if (path === '/') return location === '/';
    if (path === '/admin') return location === '/admin';
    return location.startsWith(path);
  };

  const isChildActive = (path: string) => {
    if (path === '/knowledge-center') return location === '/knowledge-center' || location === '/knowledge';
    if (path === '/knowledge-center/documents') return location === '/knowledge-center/documents' || location === '/documents';
    if (path === '/knowledge-center/policies') return location === '/knowledge-center/policies' || location === '/policies';
    return location === path;
  };

  const navLinkCls = (path: string) =>
    `ce-nav-item cursor-pointer ${isActive(path) ? 'ce-nav-item-active' : ''}`;

  return (
    <aside
      className="fixed left-0 top-0 z-30 hidden h-dvh w-60 flex-col border-r border-border bg-white/95 shadow-sm backdrop-blur lg:flex"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="flex min-h-20 items-center gap-3 border-b border-border px-5 py-4">
        <img
          src={THEME.logoPath}
          alt="CIAL Logo"
          className="h-10 w-auto object-contain"
          data-testid="sidebar-logo"
        />
        <div>
          <div className="text-sm font-semibold leading-tight text-foreground">CIAL</div>
          <div className="text-[10px] leading-tight text-muted-foreground">Knowledge OS</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="scrollbar-soft flex-1 space-y-0.5 overflow-y-auto px-3 py-4" data-testid="sidebar-nav">
        {visibleItems.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Home;
          const active = isActive(item.path);

          return (
            <div key={item.path}>
              <Link
                href={item.path}
                className={navLinkCls(item.path)}
                data-testid={`nav-${item.label.toLowerCase().replace(/[\s&]/g, '-').replace(/-+/g, '-')}`}
              >
                <IconComponent size={18} className={active ? 'text-primary' : 'text-muted-foreground'} />
                <span className="truncate">{item.label}</span>
              </Link>
              {item.children && active && (
                <div className="ml-6 mt-1 space-y-0.5 border-l border-slate-200 pl-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-slate-100 ${
                        isChildActive(child.path) ? 'bg-[#f0f7ed] text-primary' : 'text-slate-600'
                      }`}
                      data-testid={`nav-${child.label.toLowerCase().replace(/[\s&]/g, '-').replace(/-+/g, '-')}`}
                    >
                      <span className="truncate">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* MY WORKSPACE section */}
        <div className="pt-4 pb-1">
            <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-normal text-muted-foreground">
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
              <IconComponent size={18} className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground'} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        {/* ADMIN section */}
        {canAdmin && (
          <>
            <div className="pt-4 pb-1">
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-normal text-muted-foreground">
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
                  <IconComponent size={18} className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground'} />
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
          className="rounded-xl border border-border bg-[#171d26] p-4 text-white"
          style={{ background: THEME.sidebarBottomBackground }}
          data-testid="sidebar-bottom-card"
        >
          <span className="ce-badge border-white/15 bg-white/10 text-white/75">CIAL</span>
          <p className="mt-2 text-sm font-semibold leading-snug text-white">{THEME.swagathamText}</p>
          <p className="mt-1 text-[10px] text-white/60">Enterprise knowledge workspace</p>
        </div>
      </div>
    </aside>
  );
}
