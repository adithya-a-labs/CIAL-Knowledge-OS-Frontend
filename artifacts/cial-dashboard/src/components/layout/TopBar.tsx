import { Bell, HelpCircle, ChevronDown, Menu } from 'lucide-react';
import { CURRENT_USER } from '@/config/userConfig';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-20 flex min-h-14 items-center justify-between border-b border-border bg-white/90 px-3 backdrop-blur-md sm:px-4"
      data-testid="topbar"
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="ce-icon-button lg:hidden"
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
          className="ce-icon-button relative"
          data-testid="button-notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {(CURRENT_USER.notificationsCount ?? 0) > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b76a09] text-[9px] font-bold text-white" data-testid="notification-badge">
              {CURRENT_USER.notificationsCount}
            </span>
          )}
        </button>

        {/* Help */}
        <button
          className="ce-icon-button"
          data-testid="button-help"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        {/* User profile */}
        <button
          className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-3"
          data-testid="button-user-profile"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
            {CURRENT_USER.initials}
          </div>
          <div className="hidden max-w-36 text-left sm:block md:max-w-44">
            <div className="text-xs font-semibold leading-tight text-foreground" data-testid="text-username">{CURRENT_USER.name}</div>
            <div className="truncate text-[10px] leading-tight text-muted-foreground" data-testid="text-department">{CURRENT_USER.department}</div>
          </div>
          <ChevronDown size={14} className="hidden text-muted-foreground sm:block" />
        </button>
      </div>
    </header>
  );
}
