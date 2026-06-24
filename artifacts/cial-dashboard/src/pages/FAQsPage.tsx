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
    <div data-testid="faqs-page">
      <PageHeader title="FAQs" subtitle="Find answers to frequently asked questions." />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search FAQs..." className="flex-1" />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="text-sm bg-white border border-[#ddecd6] rounded-lg px-3 py-2 text-[#1a2e14] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30"
          data-testid="filter-faq-category"
        >
          <option value="">All Categories</option>
          {FAQ_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e2eedd] shadow-sm">
          <EmptyState />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#e2eedd] shadow-sm overflow-hidden"
                data-testid={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#f8fdf6] transition-colors"
                  data-testid={`faq-toggle-${faq.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a2e14] truncate">{faq.question}</p>
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
                    <div className="flex items-center justify-between mt-4">
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
