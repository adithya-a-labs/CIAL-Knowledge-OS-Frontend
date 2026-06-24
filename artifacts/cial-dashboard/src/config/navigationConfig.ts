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
  { label: 'Admin', path: '/admin', icon: 'Settings', requiredRole: 'admin' }
];
