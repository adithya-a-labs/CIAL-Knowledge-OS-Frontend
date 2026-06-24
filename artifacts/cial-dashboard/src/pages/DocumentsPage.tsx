import { useState } from 'react';
import { Upload } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import FilterBar from '@/components/common/FilterBar';
import EmptyState from '@/components/common/EmptyState';
import DocumentRow from '@/components/documents/DocumentRow';
import DocumentCard from '@/components/documents/DocumentCard';
import UploadModal from '@/components/documents/UploadModal';
import { DOCUMENTS, DOC_CATEGORIES, DOC_DEPARTMENTS, DOC_TYPES } from '@/data/documentsData';
import { CURRENT_USER } from '@/config/userConfig';
import { hasPermission } from '@/config/securityConfig';
import { Role } from '@/types';

const SORT_OPTIONS = [{ label: 'Latest', value: 'latest' }, { label: 'Name A–Z', value: 'name_asc' }];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', department: '', type: '', sort: '' });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const userRole = CURRENT_USER.role as Role;
  const canUpload = hasPermission(userRole, 'canUpload');
  const canEdit = hasPermission(userRole, 'canEdit');
  const canDelete = hasPermission(userRole, 'canDelete');

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const filtered = DOCUMENTS.filter(doc => {
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.category && doc.category !== filters.category) return false;
    if (filters.department && doc.department !== filters.department) return false;
    if (filters.type && doc.type !== filters.type) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'name_asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div data-testid="documents-page">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="Documents" subtitle="Search, filter and access all documents." />
        {canUpload && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#4a7c3f] hover:bg-[#3d6834] text-white rounded-xl text-sm font-medium transition-colors flex-shrink-0 mt-1"
            data-testid="button-upload"
          >
            <Upload size={15} />
            Upload Document
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm p-3 flex flex-wrap items-center gap-3 mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search documents..."
          className="flex-1 min-w-48"
        />
        <FilterBar
          filters={[
            { key: 'category', label: 'All Categories', options: DOC_CATEGORIES },
            { key: 'department', label: 'All Departments', options: DOC_DEPARTMENTS },
            { key: 'type', label: 'All Types', options: DOC_TYPES },
          ]}
          values={filters}
          onChange={handleFilterChange}
        />
        <select
          value={filters.sort}
          onChange={e => handleFilterChange('sort', e.target.value)}
          className="text-sm border border-[#ddecd6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="select-sort"
        >
          <option value="">Sort: Latest</option>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden">
        <table className="w-full" data-testid="documents-table">
          <thead>
            <tr className="border-b border-[#e2eedd] bg-[#f8fdf6]">
              <th className="px-5 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Document Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Last Updated</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map((doc, i) => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                index={(page - 1) * PER_PAGE + i + 1}
                canEdit={canEdit}
                canDelete={canDelete}
              />
            )) : (
              <tr>
                <td colSpan={7} className="py-12">
                  <EmptyState title="No documents found" description="Try adjusting your search or filter criteria." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {paginated.length > 0 ? paginated.map(doc => (
          <DocumentCard key={doc.id} doc={doc} />
        )) : (
          <EmptyState title="No documents found" description="Try adjusting your search or filter criteria." />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-[#5a7a52]">
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-[#ddecd6] rounded-lg disabled:opacity-40 hover:bg-[#f0f7ed] transition-colors"
              data-testid="button-prev-page"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-[#ddecd6] rounded-lg disabled:opacity-40 hover:bg-[#f0f7ed] transition-colors"
              data-testid="button-next-page"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  );
}
