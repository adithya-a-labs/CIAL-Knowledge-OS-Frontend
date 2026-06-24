import { Bell, HelpCircle, ChevronDown, Menu } from 'lucide-react';
import { CURRENT_USER } from '@/config/userConfig';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header
      className="h-14 bg-white border-b border-[#e2eedd] flex items-center justify-between px-4 sticky top-0 z-20"
      data-testid="topbar"
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] transition-colors"
        data-testid="button-hamburger"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] transition-colors"
          data-testid="button-notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {(CURRENT_USER.notificationsCount ?? 0) > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#e8820c] text-white text-[9px] font-bold rounded-full flex items-center justify-center" data-testid="notification-badge">
              {CURRENT_USER.notificationsCount}
            </span>
          )}
        </button>

        {/* Help */}
        <button
          className="p-2 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] transition-colors"
          data-testid="button-help"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        {/* User profile */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#f0f7ed] transition-colors"
          data-testid="button-user-profile"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4a7c3f] to-[#7ab648] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {CURRENT_USER.initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-[#1a2e14] leading-tight" data-testid="text-username">{CURRENT_USER.name}</div>
            <div className="text-[10px] text-[#5a7a52] leading-tight" data-testid="text-department">{CURRENT_USER.department}</div>
          </div>
          <ChevronDown size={14} className="text-[#5a7a52] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
