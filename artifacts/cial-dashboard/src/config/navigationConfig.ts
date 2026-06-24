import { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/', icon: 'Home' },
  { label: 'AI Assistant', path: '/assistant', icon: 'Bot' },
  { label: 'Documents', path: '/documents', icon: 'FileText' },
  { label: 'Knowledge Base', path: '/knowledge', icon: 'BookOpen' },
  { label: 'Assets', path: '/assets', icon: 'Box' },
  { label: 'Policies & SOPs', path: '/policies', icon: 'ShieldCheck' },
  { label: 'FAQs', path: '/faqs', icon: 'HelpCircle' },
  { label: 'Departments', path: '/departments', icon: 'Users' },
  { label: 'Analytics', path: '/analytics', icon: 'BarChart2' },
  { label: 'Admin', path: '/admin', icon: 'Settings', requiredRole: 'admin' },
];

export const WORKSPACE_NAV_ITEMS: NavItem[] = [
  { label: 'My Workspace', path: '/workspace', icon: 'LayoutDashboard' },
  { label: 'My Documents', path: '/workspace/documents', icon: 'FileText' },
  { label: 'My Notes', path: '/workspace/notes', icon: 'StickyNote' },
  { label: 'Bookmarks', path: '/workspace/bookmarks', icon: 'Bookmark' },
  { label: 'My Conversations', path: '/workspace/conversations', icon: 'MessageSquare' },
  { label: 'Storage Usage', path: '/workspace/storage', icon: 'HardDrive' },
];
