import { useState } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import { FAQS, FAQ_CATEGORIES } from '@/data/faqData';

export default function FAQsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = FAQS.filter(faq => {
    if (search && !faq.question.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory && faq.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="fluid-section" data-testid="faqs-page">
      <PageHeader title="FAQs" subtitle="Find answers to frequently asked questions." />

      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[minmax(16rem,1fr)_minmax(10rem,14rem)]">
        <SearchBar value={search} onChange={setSearch} placeholder="Search FAQs..." className="min-w-0" />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full rounded-lg border border-[#ddecd6] bg-white px-3 py-2 text-sm text-[#1a2e14] focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="filter-faq-category"
        >
          <option value="">All Categories</option>
          {FAQ_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="responsive-card border border-[#e2eedd] bg-white shadow-sm">
          <EmptyState />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="responsive-card overflow-hidden border border-[#e2eedd] bg-white shadow-sm"
                data-testid={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-[#f8fdf6] sm:px-5"
                  data-testid={`faq-toggle-${faq.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex-1 min-w-0">
                      <p className="safe-text text-sm font-medium text-[#1a2e14]">{faq.question}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f7ed] text-[#4a7c3f] font-medium">{faq.category}</span>
                        <span className="text-[11px] text-[#9ab88e]">{faq.helpfulCount} found helpful</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#5a7a52] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 border-t border-[#f0f7ed]">
                    <p className="text-sm text-[#3d5c30] mt-3 leading-relaxed">{faq.answer}</p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#9ab88e]">Was this helpful?</span>
                        <button className="p-1.5 rounded-lg hover:bg-[#f0f7ed] text-[#5a7a52] hover:text-[#4a7c3f] transition-colors" data-testid={`button-helpful-yes-${faq.id}`}>
                          <ThumbsUp size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#fdf0f0] text-[#5a7a52] hover:text-[#c0392b] transition-colors" data-testid={`button-helpful-no-${faq.id}`}>
                          <ThumbsDown size={13} />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#9ab88e]">Last updated: {faq.lastUpdated}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
