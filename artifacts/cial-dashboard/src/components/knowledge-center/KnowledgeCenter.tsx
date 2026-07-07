import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FolderPlus,
  Grid3X3,
  List,
  MoreVertical,
  Search,
  Share2,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  departments,
  documents,
  fileIconMap,
  filterDocuments,
  filterPopularContent,
  knowledgeCategories,
  popularContent,
  sortDocuments,
  sortOptions,
  tabs,
  type FileIconType,
  type KnowledgeCategory,
  type KnowledgeDepartment,
  type KnowledgeDocument,
  type KnowledgeTabId,
  type SortMode,
  type ViewMode,
} from '@/data/knowledgeCenterData';

const PAGE_SIZE = 8;

interface KnowledgeCenterHeaderProps {
  searchQuery: string;
  selectedCategory: string;
  selectedDepartment: string;
  selectedType: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onUpload: () => void;
}

interface BrowseCategoryCardsProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

interface BrowseDepartmentCardsProps {
  selectedDepartment: string;
  onSelect: (department: string) => void;
}

interface KnowledgeTabsProps {
  activeTab: KnowledgeTabId;
  onChange: (tab: KnowledgeTabId) => void;
}

interface FileManagerProps {
  items: KnowledgeDocument[];
  totalItems: number;
  selectedItems: string[];
  selectedCategory: string;
  selectedDepartment: string;
  viewMode: ViewMode;
  sortMode: SortMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSortModeChange: (mode: SortMode) => void;
  onToggleItem: (id: string) => void;
  onToggleAll: () => void;
  onOpenItem: (item: KnowledgeDocument) => void;
  onRenameItem: (item: KnowledgeDocument) => void;
  onDownloadItem: (item: KnowledgeDocument) => void;
  onShareItem: (item: KnowledgeDocument) => void;
  onDeleteItem: (item: KnowledgeDocument) => void;
}

interface FileManagerToolbarProps {
  viewMode: ViewMode;
  sortMode: SortMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSortModeChange: (mode: SortMode) => void;
}

interface FileListViewProps {
  items: KnowledgeDocument[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  onToggleAll: () => void;
  onOpenItem: (item: KnowledgeDocument) => void;
  onRenameItem: (item: KnowledgeDocument) => void;
  onDownloadItem: (item: KnowledgeDocument) => void;
  onShareItem: (item: KnowledgeDocument) => void;
  onDeleteItem: (item: KnowledgeDocument) => void;
}

interface FileGridViewProps {
  items: KnowledgeDocument[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  onOpenItem: (item: KnowledgeDocument) => void;
}

interface FileRowProps {
  item: KnowledgeDocument;
  selected: boolean;
  onToggle: (id: string) => void;
  onOpen: (item: KnowledgeDocument) => void;
  onRename: (item: KnowledgeDocument) => void;
  onDownload: (item: KnowledgeDocument) => void;
  onShare: (item: KnowledgeDocument) => void;
  onDelete: (item: KnowledgeDocument) => void;
}

interface FileIconProps {
  type: FileIconType;
  compact?: boolean;
}

interface PopularContentListProps {
  items: typeof popularContent;
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block min-w-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/15"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
    </label>
  );
}

function ToolbarButton({
  children,
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        active && 'border-primary/40 bg-[#f0f7ed] text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function KnowledgeCenterHeader({
  searchQuery,
  selectedCategory,
  selectedDepartment,
  selectedType,
  onSearchChange,
  onCategoryChange,
  onDepartmentChange,
  onTypeChange,
  onUpload,
}: KnowledgeCenterHeaderProps) {
  return (
    <header className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-slate-950">Knowledge Center</h1>
        <p className="mt-1 text-sm text-slate-600">Find articles, documents, policies and SOPs across the organization.</p>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(20rem,1fr)_12rem_12rem_12rem_auto]">
        <label className="relative block min-w-0">
          <span className="sr-only">Search across all content</span>
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search across all content..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-11 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>

        <SelectControl
          label="Filter by category"
          value={selectedCategory || 'All Categories'}
          options={['All Categories', ...knowledgeCategories.map((category) => category.name)]}
          onChange={(value) => onCategoryChange(value === 'All Categories' ? '' : value)}
        />
        <SelectControl
          label="Filter by department"
          value={selectedDepartment || 'All Departments'}
          options={['All Departments', ...departments.map((department) => department.name)]}
          onChange={(value) => onDepartmentChange(value === 'All Departments' ? '' : value)}
        />
        <SelectControl
          label="Filter by type"
          value={selectedType}
          options={['All Types', 'Folder', 'PDF', 'Sheet', 'Document', 'Presentation', 'Image', 'Video', 'Archive']}
          onChange={onTypeChange}
        />
        <button
          type="button"
          onClick={onUpload}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3d6834] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Upload size={16} />
          Upload Document
        </button>
      </div>
    </header>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
      >
        View all
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

export function BrowseCategoryCards({ selectedCategory, onSelect }: BrowseCategoryCardsProps) {
  return (
    <section>
      <SectionHeading title="Browse by Category" />
      <div className="scrollbar-soft flex gap-3 overflow-x-auto pb-1 xl:grid xl:grid-cols-7 xl:overflow-visible">
        {knowledgeCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selectedCategory === category.name}
            onClick={() => onSelect(selectedCategory === category.name ? '' : category.name)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category, selected, onClick }: { category: KnowledgeCategory; selected: boolean; onClick: () => void }) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'fluid-card min-h-24 w-44 flex-shrink-0 rounded-xl border p-4 text-left shadow-sm transition-all hover:shadow-md xl:w-auto',
        category.className,
        selected && 'border-primary/60 ring-2 ring-primary/20 shadow-md',
      )}
      aria-pressed={selected}
    >
      <Icon size={22} className={cn('mb-3', category.iconClassName)} />
      <p className="truncate text-sm font-semibold text-slate-950">{category.name}</p>
      <p className="mt-1 text-xs text-slate-600">
        {category.articles} articles - {category.docs} docs
      </p>
    </button>
  );
}

export function BrowseDepartmentCards({ selectedDepartment, onSelect }: BrowseDepartmentCardsProps) {
  return (
    <section>
      <SectionHeading title="Browse by Department" />
      <div className="scrollbar-soft flex gap-3 overflow-x-auto pb-1 xl:grid xl:grid-cols-8 xl:overflow-visible">
        {departments.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            selected={selectedDepartment === department.name}
            onClick={() => onSelect(selectedDepartment === department.name ? '' : department.name)}
          />
        ))}
      </div>
    </section>
  );
}

function DepartmentCard({
  department,
  selected,
  onClick,
}: {
  department: KnowledgeDepartment;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = department.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'fluid-card flex min-h-20 w-40 flex-shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md xl:w-auto',
        selected && 'border-primary/60 bg-[#f8fdf6] ring-2 ring-primary/15 shadow-md',
      )}
      aria-pressed={selected}
    >
      <Icon size={23} className={cn('flex-shrink-0', department.iconClassName)} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-slate-950">{department.name}</span>
        <span className="mt-0.5 block text-xs text-slate-600">{department.documents} documents</span>
        <span className="mt-0.5 block text-xs text-slate-500">{department.categories} categories</span>
      </span>
    </button>
  );
}

export function KnowledgeTabs({ activeTab, onChange }: KnowledgeTabsProps) {
  return (
    <div className="flex min-w-0 overflow-x-auto border-b border-slate-200 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative h-11 flex-shrink-0 px-4 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950',
            activeTab === tab.id && 'text-primary',
          )}
        >
          {tab.label}
          <span
            className={cn(
              'absolute inset-x-3 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-200',
              activeTab === tab.id && 'scale-x-100',
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function Breadcrumb({ selectedDepartment, selectedCategory }: { selectedDepartment: string; selectedCategory: string }) {
  const crumbs = ['Knowledge Center', selectedDepartment || 'Engineering', selectedCategory || 'HVAC Systems'];

  return (
    <nav aria-label="Breadcrumb" className="mt-1 flex flex-wrap items-center gap-1 text-xs text-slate-500">
      {crumbs.map((crumb, index) => (
        <span key={`${crumb}-${index}`} className="inline-flex items-center gap-1">
          {index > 0 && <ChevronRight size={12} />}
          <span className={index === crumbs.length - 1 ? 'text-slate-700' : undefined}>{crumb}</span>
        </span>
      ))}
    </nav>
  );
}

export function FileManager({
  items,
  totalItems,
  selectedItems,
  selectedCategory,
  selectedDepartment,
  viewMode,
  sortMode,
  onViewModeChange,
  onSortModeChange,
  onToggleItem,
  onToggleAll,
  onOpenItem,
  onRenameItem,
  onDownloadItem,
  onShareItem,
  onDeleteItem,
}: FileManagerProps) {
  const pageItems = items.slice(0, PAGE_SIZE);
  const shownTo = Math.min(PAGE_SIZE, items.length);

  return (
    <div className="px-4 pb-4 pt-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-950">All Documents</h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{totalItems}</span>
          </div>
          <Breadcrumb selectedDepartment={selectedDepartment} selectedCategory={selectedCategory} />
        </div>
        <FileManagerToolbar
          viewMode={viewMode}
          sortMode={sortMode}
          onViewModeChange={onViewModeChange}
          onSortModeChange={onSortModeChange}
        />
      </div>

      <div className="mt-4">
        {pageItems.length === 0 ? (
          <EmptyState />
        ) : viewMode === 'list' ? (
          <FileListView
            items={pageItems}
            selectedItems={selectedItems}
            onToggleItem={onToggleItem}
            onToggleAll={onToggleAll}
            onOpenItem={onOpenItem}
            onRenameItem={onRenameItem}
            onDownloadItem={onDownloadItem}
            onShareItem={onShareItem}
            onDeleteItem={onDeleteItem}
          />
        ) : (
          <FileGridView items={pageItems} selectedItems={selectedItems} onToggleItem={onToggleItem} onOpenItem={onOpenItem} />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing {items.length === 0 ? 0 : 1}-{shownTo} of {items.length} items
        </p>
        <div className="flex items-center gap-1">
          <button type="button" className="ce-icon-button border border-slate-200 bg-white" aria-label="Previous page">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className={cn(
                'h-8 min-w-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50',
                page === 1 && 'border-primary/40 bg-[#f0f7ed] text-primary',
              )}
            >
              {page}
            </button>
          ))}
          <button type="button" className="ce-icon-button border border-slate-200 bg-white" aria-label="Next page">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FileManagerToolbar({ viewMode, sortMode, onViewModeChange, onSortModeChange }: FileManagerToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          className={cn('ce-icon-button h-8 min-h-8 min-w-8 rounded-md', viewMode === 'list' && 'bg-[#f0f7ed] text-primary')}
          aria-label="List view"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('grid')}
          className={cn('ce-icon-button h-8 min-h-8 min-w-8 rounded-md', viewMode === 'grid' && 'bg-[#f0f7ed] text-primary')}
          aria-label="Grid view"
        >
          <Grid3X3 size={16} />
        </button>
      </div>
      <ToolbarButton>
        <FolderPlus size={15} />
        New Folder
      </ToolbarButton>
      <ToolbarButton>
        <Upload size={15} />
        Upload
      </ToolbarButton>
      <label className="relative">
        <span className="sr-only">Sort documents</span>
        <select
          value={sortMode}
          onChange={(event) => onSortModeChange(event.target.value as SortMode)}
          className="h-9 appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus:border-primary focus:ring-2 focus:ring-primary/15"
          aria-label="Sort documents"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              Sort: {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
      </label>
      <ToolbarButton className="w-9 px-0" aria-label="More document actions">
        <MoreVertical size={16} />
      </ToolbarButton>
    </div>
  );
}

export function FileListView({
  items,
  selectedItems,
  onToggleItem,
  onToggleAll,
  onOpenItem,
  onRenameItem,
  onDownloadItem,
  onShareItem,
  onDeleteItem,
}: FileListViewProps) {
  const allSelected = items.length > 0 && items.every((item) => selectedItems.includes(item.id));

  return (
    <div className="scrollbar-soft overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[58rem]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold text-slate-500">
            <th className="w-12 px-3 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="Select all files"
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/25"
              />
            </th>
            <th className="px-2 py-3">Name</th>
            <th className="px-3 py-3">Owner / Department</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Size</th>
            <th className="px-3 py-3">Last updated</th>
            <th className="w-20 px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <FileRow
              key={item.id}
              item={item}
              selected={selectedItems.includes(item.id)}
              onToggle={onToggleItem}
              onOpen={onOpenItem}
              onRename={onRenameItem}
              onDownload={onDownloadItem}
              onShare={onShareItem}
              onDelete={onDeleteItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FileRow({ item, selected, onToggle, onOpen, onRename, onDownload, onShare, onDelete }: FileRowProps) {
  return (
    <tr className={cn('group text-sm transition-colors hover:bg-slate-50', selected && 'bg-[#f0f7ed]/80 hover:bg-[#f0f7ed]')}>
      <td className="px-3 py-2.5">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(item.id)}
          aria-label={`Select ${item.name}`}
          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/25"
        />
      </td>
      <td className="px-2 py-2.5">
        <button type="button" onClick={() => onOpen(item)} className="flex min-w-0 items-center gap-3 text-left">
          <FileIcon type={item.iconType} compact />
          <span className="min-w-0">
            <span className="block truncate font-medium text-slate-800">{item.name}</span>
            {item.sharedCount ? (
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-500">
                <Users size={12} />
                {item.sharedCount}
              </span>
            ) : null}
          </span>
        </button>
      </td>
      <td className="px-3 py-2.5 text-slate-600">{item.kind === 'folder' ? item.department : item.owner}</td>
      <td className="px-3 py-2.5 text-slate-600">{item.type}</td>
      <td className="px-3 py-2.5 text-slate-600">{item.sizeLabel}</td>
      <td className="px-3 py-2.5 text-slate-600">{item.lastUpdated}</td>
      <td className="px-3 py-2.5">
        <div className="flex justify-end">
          <div className="relative">
            <button type="button" className="ce-icon-button h-8 min-h-8 min-w-8" aria-label={`Actions for ${item.name}`}>
              <MoreVertical size={16} />
            </button>
            <div className="absolute right-0 top-8 z-10 hidden w-36 rounded-lg border border-slate-200 bg-white p-1 text-xs shadow-lg group-hover:block group-focus-within:block">
              <button type="button" onClick={() => onRename(item)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-slate-700 hover:bg-slate-50">
                Rename
              </button>
              <button type="button" onClick={() => onDownload(item)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-slate-700 hover:bg-slate-50">
                <Download size={13} />
                Download
              </button>
              <button type="button" onClick={() => onShare(item)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-slate-700 hover:bg-slate-50">
                <Share2 size={13} />
                Share
              </button>
              <button type="button" onClick={() => onDelete(item)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-red-600 hover:bg-red-50">
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function FileGridView({ items, selectedItems, onToggleItem, onOpenItem }: FileGridViewProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onOpenItem(item)}
          className={cn(
            'rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md',
            selectedItems.includes(item.id) && 'border-primary/50 bg-[#f0f7ed] ring-2 ring-primary/15',
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <FileIcon type={item.iconType} />
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onClick={(event) => event.stopPropagation()}
              onChange={() => onToggleItem(item.id)}
              aria-label={`Select ${item.name}`}
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/25"
            />
          </div>
          <p className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-800">{item.name}</p>
          <div className="mt-3 space-y-1 text-xs text-slate-500">
            <p>{item.type}</p>
            <p>{item.kind === 'folder' ? item.department : item.owner}</p>
            <p>{item.lastUpdated}</p>
            {item.kind === 'file' && <p>{item.sizeLabel}</p>}
          </div>
        </button>
      ))}
    </div>
  );
}

export function FileIcon({ type, compact }: FileIconProps) {
  const Icon = fileIconMap[type];
  const iconClassName: Record<FileIconType, string> = {
    folder: 'bg-amber-100 text-amber-600',
    pdf: 'bg-red-100 text-red-600',
    sheet: 'bg-emerald-100 text-emerald-600',
    document: 'bg-blue-100 text-blue-600',
    presentation: 'bg-orange-100 text-orange-600',
    image: 'bg-violet-100 text-violet-600',
    video: 'bg-pink-100 text-pink-600',
    archive: 'bg-slate-100 text-slate-600',
  };

  return (
    <span
      className={cn(
        'inline-flex flex-shrink-0 items-center justify-center rounded-lg',
        compact ? 'h-7 w-7' : 'h-11 w-11',
        iconClassName[type],
      )}
    >
      <Icon size={compact ? 17 : 24} />
    </span>
  );
}

export function PopularContentList({ items }: PopularContentListProps) {
  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-950">Popular Content</h3>
        <span className="text-xs font-medium text-slate-500">{items.length} items</span>
      </div>
      <div className="divide-y divide-slate-100">
        {items.length === 0 ? (
          <EmptyState title="No popular content found" description="Try a different search or category." />
        ) : (
          items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className="group flex w-full flex-col gap-2 px-4 py-3 text-left transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#f0f7ed] text-primary">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-slate-800 group-hover:text-primary">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{item.category}</span>
                  </span>
                </span>
                <span className="whitespace-nowrap pl-11 text-xs text-slate-500 sm:pl-0">Viewed {item.views.toLocaleString()} times</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title = 'No content found',
  description = 'Try adjusting the search, filters or active tab.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center">
      <Search size={24} className="text-slate-400" />
      <h3 className="mt-3 text-sm font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function KnowledgeCenterPage() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [activeTab, setActiveTab] = useState<KnowledgeTabId>('documents');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (location.includes('/articles')) setActiveTab('articles');
    else if (location.includes('/policies') || location === '/policies') setActiveTab('policies');
    else if (location.includes('/documents') || location === '/documents') setActiveTab('documents');
    else if (location === '/knowledge' || location === '/knowledge-center') setActiveTab('documents');
  }, [location]);

  const filteredDocuments = useMemo(() => {
    return sortDocuments(filterDocuments(documents, searchQuery, selectedCategory, selectedDepartment, selectedType, activeTab), sortMode);
  }, [activeTab, searchQuery, selectedCategory, selectedDepartment, selectedType, sortMode]);

  const filteredPopularContent = useMemo(() => {
    return filterPopularContent(popularContent, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setSelectedItems((current) => (current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]));
  };

  const toggleAll = () => {
    const visibleIds = filteredDocuments.slice(0, PAGE_SIZE).map((item) => item.id);
    const allSelected = visibleIds.every((id) => selectedItems.includes(id));
    setSelectedItems((current) => (allSelected ? current.filter((id) => !visibleIds.includes(id)) : [...new Set([...current, ...visibleIds])]));
  };

  const clearSelectedItems = () => setSelectedItems([]);

  const handleOpenItem = (_item: KnowledgeDocument) => {};
  const handleRenameItem = (_item: KnowledgeDocument) => {};
  const handleDownloadItem = (_item: KnowledgeDocument) => {};
  const handleShareItem = (_item: KnowledgeDocument) => {};
  const handleDeleteItem = (_item: KnowledgeDocument) => {};
  const handleUpload = () => {};

  const showPopularContent = activeTab === 'all' || activeTab === 'articles';
  const showFileManager = activeTab !== 'articles';

  return (
    <div className="fluid-section space-y-5" data-testid="knowledge-center-page">
      <KnowledgeCenterHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedDepartment={selectedDepartment}
        selectedType={selectedType}
        onSearchChange={(value) => {
          setSearchQuery(value);
          clearSelectedItems();
        }}
        onCategoryChange={(value) => {
          setSelectedCategory(value);
          clearSelectedItems();
        }}
        onDepartmentChange={(value) => {
          setSelectedDepartment(value);
          clearSelectedItems();
        }}
        onTypeChange={(value) => {
          setSelectedType(value);
          clearSelectedItems();
        }}
        onUpload={handleUpload}
      />

      <BrowseCategoryCards
        selectedCategory={selectedCategory}
        onSelect={(category) => {
          setSelectedCategory(category);
          clearSelectedItems();
        }}
      />
      <BrowseDepartmentCards
        selectedDepartment={selectedDepartment}
        onSelect={(department) => {
          setSelectedDepartment(department);
          clearSelectedItems();
        }}
      />

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <KnowledgeTabs
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            clearSelectedItems();
          }}
        />
        <div className="bg-white">
          {showPopularContent && <div className="px-4 pt-4"><PopularContentList items={filteredPopularContent} /></div>}
          {showFileManager ? (
            <FileManager
              items={filteredDocuments}
              totalItems={documents.length}
              selectedItems={selectedItems}
              selectedCategory={selectedCategory}
              selectedDepartment={selectedDepartment}
              viewMode={viewMode}
              sortMode={sortMode}
              onViewModeChange={setViewMode}
              onSortModeChange={setSortMode}
              onToggleItem={toggleItem}
              onToggleAll={toggleAll}
              onOpenItem={handleOpenItem}
              onRenameItem={handleRenameItem}
              onDownloadItem={handleDownloadItem}
              onShareItem={handleShareItem}
              onDeleteItem={handleDeleteItem}
            />
          ) : (
            <div className="px-4 pb-4">
              {filteredPopularContent.length === 0 && <EmptyState title="No articles found" description="Try another search or category." />}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
