import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type Filters = {
  unitName: string;
  unitNumber: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  projectName: string;
  minPrice: string;
  maxPrice: string;
};

type FiltersProps = {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  loading: boolean;
};

export default function Filters({ filters, onChange, onSearch, onClear, loading }: FiltersProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-3 sm:p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Unit name</label>
          <input className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Unit name" value={filters.unitName} onChange={e => onChange('unitName', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Unit number</label>
          <input className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Unit number" value={filters.unitNumber} onChange={e => onChange('unitNumber', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Project name</label>
          <input className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Project name" value={filters.projectName} onChange={e => onChange('projectName', e.target.value)} />
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Bedrooms</label>
            <input type="number" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Bedrooms" value={filters.bedrooms} onChange={e => onChange('bedrooms', e.target.value)} />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Bathrooms</label>
            <input type="number" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Bathrooms" value={filters.bathrooms} onChange={e => onChange('bathrooms', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Min area</label>
            <input type="number" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Min area" value={filters.minArea} onChange={e => onChange('minArea', e.target.value)} />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Max area</label>
            <input type="number" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Max area" value={filters.maxArea} onChange={e => onChange('maxArea', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Min price</label>
            <input type="number" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Min price" value={filters.minPrice} onChange={e => onChange('minPrice', e.target.value)} />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Max price</label>
            <input type="number" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Max price" value={filters.maxPrice} onChange={e => onChange('maxPrice', e.target.value)} />
          </div>
        </div>
      </div>
  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-end mt-2">
        {loading ? (
          <div className="flex items-center justify-center px-4 py-1.5">
            <CircularProgress size={24} color="primary" />
          </div>
        ) : (
          <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2" type="button" onClick={onSearch}>
            <span className="flex items-center gap-2">
              {'Search'}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
          </button>
        )}
        <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition shadow" type="button" onClick={onClear} disabled={loading}>Clear</button>
      </div>
    </div>
  );
}
