import { useState } from 'react';
import { Eye, Edit, Download, Upload, X, FileText } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import FilterBar from '@/components/common/FilterBar';
import StatusPill from '@/components/common/StatusPill';
import EmptyState from '@/components/common/EmptyState';
import { DOCUMENTS } from '@/data/documentsData';
import { CURRENT_USER } from '@/config/userConfig';
import { hasPermission } from '@/config/securityConfig';
import { Role } from '@/types';

const DOC_TYPE_COLORS: Record<string, string> = {
  Manual: 'bg-blue-100 text-blue-700',
  SOP: 'bg-green-100 text-green-700',
  Checklist: 'bg-purple-100 text-purple-700',
  Policy: 'bg-orange-100 text-orange-700',
  Report: 'bg-gray-100 text-gray-600',
};

const CATEGORIES = ['Airfield Operations', 'Baggage Handling', 'Electrical Systems', 'HVAC Systems', 'Safety & Fire', 'IT Systems', 'Terminal Operations', 'Security'];
const DEPARTMENTS = ['Engineering', 'Safety', 'Operations', 'IT', 'Facilities', 'Commercial'];
const TYPES = ['Manual', 'SOP', 'Checklist', 'Policy', 'Report'];

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

  let filtered = DOCUMENTS.filter(doc => {
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase()) && !doc.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.category && doc.category !== filters.category) return false;
    if (filters.department && doc.department !== filters.department) return false;
    if (filters.type && doc.type !== filters.type) return false;
    return true;
  });

  if (filters.sort === 'az') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  else if (filters.sort === 'za') filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageDocs = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div data-testid="documents-page">
      <PageHeader
        title="Documents"
        subtitle="Search, filter and access all documents."
        action={canUpload ? (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#4a7c3f] hover:bg-[#3d6834] text-white text-sm font-medium rounded-lg transition-colors"
            data-testid="button-upload-document"
          >
            <Upload size={15} />
            Upload Document
          </button>
        ) : undefined}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search documents..." className="flex-1" />
        <FilterBar
          filters={[
            { key: 'category', label: 'All Categories', value: filters.category, options: CATEGORIES.map(c => ({ value: c, label: c })) },
            { key: 'department', label: 'All Departments', value: filters.department, options: DEPARTMENTS.map(d => ({ value: d, label: d })) },
            { key: 'type', label: 'All Types', value: filters.type, options: TYPES.map(t => ({ value: t, label: t })) },
            { key: 'sort', label: 'Sort: Latest', value: filters.sort, options: [{ value: 'az', label: 'A–Z' }, { value: 'za', label: 'Z–A' }] },
          ]}
          onChange={handleFilterChange}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden">
        <table className="w-full" data-testid="documents-table">
          <thead>
            <tr className="border-b border-[#e2eedd] bg-[#f8fdf6]">
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-5 py-3">#</th>
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">Document Name</th>
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">Category</th>
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">Department</th>
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">Last Updated</th>
              <th className="text-left text-xs font-semibold text-[#5a7a52] uppercase tracking-wide px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageDocs.length === 0 ? (
              <tr><td colSpan={7}><EmptyState /></td></tr>
            ) : (
              pageDocs.map((doc, i) => (
                <tr
                  key={doc.id}
                  className="border-b border-[#f0f7ed] hover:bg-[#f8fdf6] transition-colors"
                  data-testid={`table-row-${doc.id}`}
                >
                  <td className="px-5 py-3 text-sm text-[#9ab88e]">{(page - 1) * PER_PAGE + i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-[#f0f7ed] flex items-center justify-center flex-shrink-0">
                        <FileText size={13} className="text-[#4a7c3f]" />
                      </div>
                      <span className="text-sm font-medium text-[#1a2e14]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#5a7a52]">{doc.category}</td>
                  <td className="px-4 py-3 text-sm text-[#5a7a52]">{doc.department}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${DOC_TYPE_COLORS[doc.type] || 'bg-gray-100 text-gray-600'}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#5a7a52]">{doc.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors" data-testid={`button-view-${doc.id}`}><Eye size={14} /></button>
                      {canEdit && <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors" data-testid={`button-edit-${doc.id}`}><Edit size={14} /></button>}
                      <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors" data-testid={`button-download-${doc.id}`}><Download size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#e2eedd] bg-[#f8fdf6]">
            <p className="text-xs text-[#5a7a52]">Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs rounded-lg border border-[#ddecd6] disabled:opacity-40 hover:bg-[#f0f7ed] text-[#5a7a52] transition-colors" data-testid="button-prev-page">Prev</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 text-xs rounded-lg border transition-colors ${p === page ? 'bg-[#4a7c3f] text-white border-[#4a7c3f]' : 'border-[#ddecd6] text-[#5a7a52] hover:bg-[#f0f7ed]'}`} data-testid={`button-page-${p}`}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs rounded-lg border border-[#ddecd6] disabled:opacity-40 hover:bg-[#f0f7ed] text-[#5a7a52] transition-colors" data-testid="button-next-page">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {pageDocs.length === 0 ? <EmptyState /> : pageDocs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl border border-[#e2eedd] p-4 shadow-sm" data-testid={`doc-card-${doc.id}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-[#1a2e14] truncate">{doc.name}</p>
                <p className="text-xs text-[#5a7a52] mt-0.5">{doc.department} — {doc.category}</p>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex-shrink-0 ${DOC_TYPE_COLORS[doc.type] || 'bg-gray-100 text-gray-600'}`}>{doc.type}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-[#9ab88e]">{doc.lastUpdated}</span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg bg-[#f0f7ed] text-[#4a7c3f]" data-testid={`button-view-mobile-${doc.id}`}><Eye size={13} /></button>
                <button className="p-1.5 rounded-lg bg-[#f0f7ed] text-[#4a7c3f]" data-testid={`button-download-mobile-${doc.id}`}><Download size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" data-testid="upload-modal">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-[#e2eedd]">
              <h2 className="text-base font-semibold text-[#1a2e14]">Upload Document</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1.5 rounded-lg hover:bg-[#f0f7ed]" data-testid="button-close-modal"><X size={16} className="text-[#5a7a52]" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="border-2 border-dashed border-[#ddecd6] rounded-xl p-8 text-center bg-[#f8fdf6]">
                <Upload size={24} className="text-[#9ab88e] mx-auto mb-2" />
                <p className="text-sm text-[#5a7a52] font-medium">Drop files here or click to browse</p>
                <p className="text-xs text-[#9ab88e] mt-1">PDF, DOC, DOCX, XLS up to 50MB</p>
              </div>
              {[{ label: 'Document Name', placeholder: 'Enter document name' }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#1a2e14] mb-1.5">{f.label}</label>
                  <input className="w-full border border-[#ddecd6] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30" placeholder={f.placeholder} data-testid="input-doc-name" />
                </div>
              ))}
              {[{ label: 'Category', options: CATEGORIES }, { label: 'Department', options: DEPARTMENTS }, { label: 'Type', options: TYPES }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#1a2e14] mb-1.5">{f.label}</label>
                  <select className="w-full border border-[#ddecd6] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30" data-testid={`select-${f.label.toLowerCase()}`}>
                    <option value="">Select {f.label}</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-3 p-5 border-t border-[#e2eedd]">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 px-4 py-2.5 border border-[#ddecd6] text-sm font-medium text-[#5a7a52] rounded-lg hover:bg-[#f0f7ed] transition-colors" data-testid="button-cancel-upload">Cancel</button>
              <button onClick={() => setShowUploadModal(false)} className="flex-1 px-4 py-2.5 bg-[#4a7c3f] text-white text-sm font-medium rounded-lg hover:bg-[#3d6834] transition-colors" data-testid="button-confirm-upload">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
