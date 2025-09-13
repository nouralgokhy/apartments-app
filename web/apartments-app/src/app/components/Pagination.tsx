import React from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition
          ${page <= 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        onClick={onPrev}
        disabled={page <= 1}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Prev
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded-full text-sm font-semibold shadow transition
              ${page === i + 1 ? 'bg-blue-600 text-white cursor-default' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
            disabled={page === i + 1}
            onClick={() => {
              if (page !== i + 1) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('pagination:change', { detail: i + 1 });
                  window.dispatchEvent(event);
                }
              }
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition
          ${page >= totalPages ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
