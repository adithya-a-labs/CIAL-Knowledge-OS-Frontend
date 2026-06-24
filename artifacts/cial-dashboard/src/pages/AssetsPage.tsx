import { useState } from 'react';
import { Eye, Edit, Filter } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import StatusPill from '@/components/common/StatusPill';
import EmptyState from '@/components/common/EmptyState';
import { ASSETS } from '@/data/assetsData';

const CATEGORIES = ['Airfield Lighting', 'Baggage Handling', 'HVAC', 'Electrical', 'Aerobridge', 'Security', 'Vertical Transport', 'IT Network', 'Safety', 'Air Traffic', 'Plumbing'];
const STATUSES = ['Operational', 'Under Maintenance', 'Out of Service'];

const ASSET_KPIS = [
  { label: 'Total Assets', value: '3,248', color: 'bg-[#f0f7ed] text-[#4a7c3f]' },
  { label: 'Operational', value: '2,896', color: 'bg-[#d4f0d8] text-[#1e7e34]' },
  { label: 'Under Maintenance', value: '210', color: 'bg-[#fde8c8] text-[#b35900]' },
  { label: 'Out of Service', value: '142', color: 'bg-[#fdd8d8] text-[#991b1b]' },
];

export default function AssetsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', status: '', location: '' });

  const filtered = ASSETS.filter(asset => {
    if (search && !asset.name.toLowerCase().includes(search.toLowerCase()) && !asset.assetId.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.category && asset.category !== filters.category) return false;
    if (filters.status && asset.status !== filters.status) return false;
    return true;
  });

  return (
    <div data-testid="assets-page">
      <PageHeader title="Assets" subtitle="View and manage airport assets." />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {ASSET_KPIS.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-4">
            <p className="text-xs text-[#5a7a52] font-medium">{kpi.label}</p>
            <p className={`text-2xl font-bold mt-1 ${kpi.color.includes('text') ? kpi.color.split(' ').find(c => c.startsWith('text')) : 'text-[#1a2e14]'}`} data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search assets..." className="flex-1" />
        <select
          value={filters.category}
          onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}
          className="text-sm bg-white border border-[#ddecd6] rounded-lg px-3 py-2 text-[#1a2e14] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="filter-asset-category"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={e => setFilters(p => ({ ...p, status: e.target.value }))}
          className="text-sm bg-white border border-[#ddecd6] rounded-lg px-3 py-2 text-[#1a2e14] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="filter-asset-status"
        >
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#4a7c3f] text-white text-sm rounded-lg hover:bg-[#3d6834] transition-colors" data-testid="button-filter">
          <Filter size={14} />
          Filter
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden">
        <table className="w-full" data-testid="assets-table">
          <thead>
            <tr className="border-b border-[#e2eedd] bg-[#f8fdf6]">
              {['Asset Name', 'Asset ID', 'Category', 'Location', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6}><EmptyState /></td></tr>
            ) : filtered.map((asset) => (
              <tr key={asset.id} className="border-b border-[#f0f7ed] hover:bg-[#f8fdf6] transition-colors" data-testid={`asset-row-${asset.id}`}>
                <td className="px-4 py-3 text-sm font-medium text-[#1a2e14]">{asset.name}</td>
                <td className="px-4 py-3 text-xs font-mono text-[#5a7a52] bg-[#f8fdf6] rounded">{asset.assetId}</td>
                <td className="px-4 py-3 text-sm text-[#5a7a52]">{asset.category}</td>
                <td className="px-4 py-3 text-sm text-[#5a7a52]">{asset.location}</td>
                <td className="px-4 py-3"><StatusPill status={asset.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f]" data-testid={`button-view-asset-${asset.id}`}><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f]" data-testid={`button-edit-asset-${asset.id}`}><Edit size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? <EmptyState /> : filtered.map((asset) => (
          <div key={asset.id} className="bg-white rounded-xl border border-[#e2eedd] p-4 shadow-sm" data-testid={`asset-card-${asset.id}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-sm text-[#1a2e14]">{asset.name}</p>
                <p className="text-xs font-mono text-[#5a7a52] mt-0.5">{asset.assetId}</p>
              </div>
              <StatusPill status={asset.status} />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-[#5a7a52]">
              <span>{asset.category}</span>
              <span>•</span>
              <span>{asset.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
