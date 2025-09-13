import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
  const [isXs, setIsXs] = React.useState(false);
  React.useEffect(() => {
    const checkScreen = () => setIsXs(window.innerWidth <= 640);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (error) setOpen(true);
  }, [error]);
  const sanitizeNumber = (value: string) => {
    if (!value) return "";
    return value.replace(/[^0-9]/g, "");
  };

  const handleSearch = async () => {
    const numFields = [
      filters.bedrooms,
      filters.bathrooms,
      filters.minArea,
      filters.maxArea,
      filters.minPrice,
      filters.maxPrice
    ];
    for (const val of numFields) {
      if (val && (isNaN(Number(val)) || Number(val) < 0)) {
        setError("All numeric filter values must be positive numbers.");
        setOpen(true);
        return;
      }
    }
  setError("");
    try {
      onSearch();
    } catch (err) {
      if (err instanceof Error) {
  setError(err.message || "An error occurred while searching.");
      } else {
  setError("An error occurred while searching.");
      }
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-2 sm:p-6 mb-8">
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Unit name</label>
            <input className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={filters.unitName} onChange={e => onChange('unitName', e.target.value)} placeholder={!isXs ? "Unit name" : undefined} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Unit number</label>
            <input className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={filters.unitNumber} onChange={e => onChange('unitNumber', e.target.value)} placeholder={!isXs ? "Unit number" : undefined} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Project name</label>
            <input className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={filters.projectName} onChange={e => onChange('projectName', e.target.value)} placeholder={!isXs ? "Project name" : undefined} />
        </div>
  <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3">
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Bedrooms</label>
              <input type="number" min="1" inputMode="numeric" pattern="[0-9]*" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={sanitizeNumber(filters.bedrooms)} onChange={e => onChange('bedrooms', sanitizeNumber(e.target.value))} placeholder={!isXs ? "Bedrooms" : undefined} />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Bathrooms</label>
              <input type="number" min="1" inputMode="numeric" pattern="[0-9]*" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={sanitizeNumber(filters.bathrooms)} onChange={e => onChange('bathrooms', sanitizeNumber(e.target.value))} placeholder={!isXs ? "Bathrooms" : undefined} />
          </div>
        </div>
  <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3">
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Min area</label>
              <input type="number" min="1" inputMode="numeric" pattern="[0-9]*" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={sanitizeNumber(filters.minArea)} onChange={e => onChange('minArea', sanitizeNumber(e.target.value))} placeholder={!isXs ? "Min area" : undefined} />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Max area</label>
              <input type="number" min="1" inputMode="numeric" pattern="[0-9]*" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={sanitizeNumber(filters.maxArea)} onChange={e => onChange('maxArea', sanitizeNumber(e.target.value))} placeholder={!isXs ? "Max area" : undefined} />
          </div>
        </div>
  <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3">
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Min price</label>
              <input type="number" min="1" inputMode="numeric" pattern="[0-9]*" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={sanitizeNumber(filters.minPrice)} onChange={e => onChange('minPrice', sanitizeNumber(e.target.value))} placeholder={!isXs ? "Min price" : undefined} />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Max price</label>
              <input type="number" min="1" inputMode="numeric" pattern="[0-9]*" className="border border-gray-300 rounded-full px-3 py-1.5 w-full text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" value={sanitizeNumber(filters.maxPrice)} onChange={e => onChange('maxPrice', sanitizeNumber(e.target.value))} placeholder={!isXs ? "Max price" : undefined} />
          </div>
        </div>
      </div>
  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-end mt-2">
        {loading ? (
          <div className="flex items-center justify-center px-4 py-1.5">
            <CircularProgress size={24} color="primary" />
          </div>
        ) : (
          <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2" type="button" onClick={handleSearch}>
            <span className="flex items-center gap-2">
              {'Search'}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
          </button>
        )}
        <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition shadow" type="button" onClick={onClear} disabled={loading}>Clear</button>
      <Snackbar open={open && !!error} autoHideDuration={4000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
          {error}
        </MuiAlert>
      </Snackbar>
      </div>
    </div>
  );
}
