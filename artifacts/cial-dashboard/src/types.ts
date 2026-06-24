export interface DashboardBlock {
  id: string;
  title: string;
  component: string;
  colSpan: 1 | 2 | 3;
  visible: boolean;
}

export interface KPIStat {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  icon: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  department: string;
  type: string;
  lastUpdated: string;
  status: string;
}

export interface Asset {
  id: string;
  assetId: string;
  name: string;
  category: string;
  location: string;
  status: string;
}

export interface SOP {
  id: string;
  title: string;
  department: string;
  version: string;
  status: string;
  owner: string;
  lastReview: string;
  nextReview: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  lastUpdated: string;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  views: number;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  resource: string;
  time: string;
  status: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

export interface Department {
  id: string;
  name: string;
  type: string;
  documents: number;
  sops: number;
  unresolved: number;
  head: string;
  color: string;
  icon: string;
}

export type Role = 'admin' | 'manager' | 'engineer' | 'viewer';
