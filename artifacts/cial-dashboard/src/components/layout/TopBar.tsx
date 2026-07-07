import { Bell, HelpCircle, ChevronDown, Menu } from 'lucide-react';
import { CURRENT_USER } from '@/config/userConfig';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-20 flex min-h-14 items-center justify-between border-b border-[#e2eedd] bg-white/85 px-3 backdrop-blur-md sm:px-4"
      data-testid="topbar"
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-[#5a7a52] transition-colors hover:bg-[#f0f7ed] lg:hidden"
        data-testid="button-hamburger"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      {/* Right side */}
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-[#5a7a52] transition-colors hover:bg-[#f0f7ed]"
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
          className="rounded-lg p-2 text-[#5a7a52] transition-colors hover:bg-[#f0f7ed]"
          data-testid="button-help"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        {/* User profile */}
        <button
          className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#f0f7ed] sm:px-3"
          data-testid="button-user-profile"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4a7c3f] to-[#7ab648] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {CURRENT_USER.initials}
          </div>
          <div className="hidden max-w-36 text-left sm:block md:max-w-44">
            <div className="text-xs font-semibold text-[#1a2e14] leading-tight" data-testid="text-username">{CURRENT_USER.name}</div>
            <div className="truncate text-[10px] leading-tight text-[#5a7a52]" data-testid="text-department">{CURRENT_USER.department}</div>
          </div>
          <ChevronDown size={14} className="text-[#5a7a52] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
