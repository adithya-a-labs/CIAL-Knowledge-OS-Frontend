import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import AssetRow from '@/components/assets/AssetRow';
import { ASSETS, ASSET_CATEGORIES, ASSET_STATUSES, ASSET_KPI_STATS } from '@/data/assetsData';

export default function AssetsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', status: '' });

  const filtered = ASSETS.filter(asset => {
    if (search && !asset.name.toLowerCase().includes(search.toLowerCase()) && !asset.assetId.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.category && asset.category !== filters.category) return false;
    if (filters.status && asset.status !== filters.status) return false;
    return true;
  });

  const KPI_COLOR_CLASS: Record<number, string> = {
    0: 'text-[#4a7c3f]',
    1: 'text-[#1e7e34]',
    2: 'text-[#b35900]',
    3: 'text-[#991b1b]',
  };

  return (
    <div data-testid="assets-page">
      <PageHeader title="Assets" subtitle="View and manage airport assets." />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {ASSET_KPI_STATS.map((kpi, i) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-4">
            <p className="text-xs text-[#5a7a52] font-medium">{kpi.label}</p>
            <p
              className={`text-2xl font-bold mt-1 ${kpi.colorClass ?? KPI_COLOR_CLASS[i] ?? 'text-[#1a2e14]'}`}
              data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-3 flex flex-wrap items-center gap-3 mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search assets..."
          className="flex-1 min-w-48"
        />
        <select
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          className="text-sm border border-[#ddecd6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="select-category"
        >
          <option value="">All Categories</option>
          {ASSET_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
          className="text-sm border border-[#ddecd6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="select-status"
        >
          <option value="">All Statuses</option>
          {ASSET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden">
        <table className="w-full" data-testid="assets-table">
          <thead>
            <tr className="border-b border-[#e2eedd] bg-[#f8fdf6]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Asset Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Asset ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(asset => (
              <AssetRow key={asset.id} asset={asset} />
            )) : (
              <tr>
                <td colSpan={6} className="py-12">
                  <EmptyState title="No assets found" description="Try adjusting your search or filter." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
