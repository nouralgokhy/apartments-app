'use client';
import { getApartments, Apartment } from '../api/apartments';
import { useCallback, useEffect, useState } from 'react';
import ApartmentCard from '../components/ApartmentCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Fallback from '../components/Fallback';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatPrice } from '../utils/formatPrice';

export default function Home() {
    const [data, setData] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        unitName: '',
        unitNumber: '',
        projectName: '',
        bedrooms: '',
        bathrooms: '',
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
    });
    const [pendingFilters, setPendingFilters] = useState(filters);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchApartments = useCallback(async (pageNum = page) => {
        setLoading(true);
        setError(null);
        try {
            const params: Record<string, string | number> = { page: pageNum };
            Object.entries(filters).forEach(([k, v]) => v && (params[k] = v));
            const res = await getApartments(params);
            if ('data' in res && Array.isArray(res.data)) {
                setData(res.data);
                setTotalPages(res.totalPages || 1);
            } else {
                setData([]);
                setTotalPages(1);
                setError('error' in res ? res.error : 'Failed to load apartments');
            }
        } catch (e: unknown) {
            if (typeof e === 'object' && e && 'error' in e) {
                setError((e as { error: string }).error);
            } else {
                setError('Failed to load apartments');
            }
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchApartments();
    }, [filters, page, fetchApartments]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setPendingFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        setFilters(pendingFilters);
        setPage(1);
    };

    const handleClear = () => {
        const emptyFilters = {
            unitName: '',
            unitNumber: '',
            projectName: '',
            bedrooms: '',
            bathrooms: '',
            minPrice: '',
            maxPrice: '',
            minArea: '',
            maxArea: '',
        };
        setPendingFilters(emptyFilters);
        setFilters(emptyFilters);
        setPage(1);
    };

    const handlePrev = () => { if (page > 1) setPage(page - 1); };
    const handleNext = () => { if (page < totalPages) setPage(page + 1); };

    return (
        <>
            <div className="w-full max-w-7xl mx-auto px-4 py-4">
                <Filters
                filters={pendingFilters}
                onChange={handleFilterChange}
                onSearch={handleSearch}
                onClear={handleClear}
                loading={loading}
            />
            <hr className="my-4 border-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[320px]">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4 h-[340px]"
                        >
                            <div className="bg-gray-200 h-40 w-full rounded-lg shimmer" />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="bg-gray-200 h-6 w-2/3 rounded" />
                                <div className="bg-gray-200 h-4 w-1/2 rounded" />
                                <div className="bg-gray-200 h-4 w-1/3 rounded" />
                            </div>
                            <div className="bg-gray-200 h-10 w-full rounded-lg mt-auto" />
                        </div>
                    ))
                ) : error ? (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center items-center min-h-[320px]">
                        <Fallback
                            title="No apartments available"
                            description={error || "There are currently no apartments to display."}
                            icon={<SentimentDissatisfiedIcon color="primary" sx={{ fontSize: 48 }} />}
                            action={
                                <button
                                    className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2"
                                    onClick={() => fetchApartments()}
                                >
                                    <RefreshIcon sx={{ fontSize: 20 }} /> Try Again
                                </button>
                            }
                        />
                    </div>
                ) : data?.length === 0 ? (
                    
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center items-center min-h-[320px]">
                        <Fallback
                            title="No apartments found"
                            description="Try adjusting your filters or check back later."
                            icon={<SentimentDissatisfiedIcon color="primary" sx={{ fontSize: 48 }} />}
                        />
                    </div>
                ) : (
                    data.map(apt => (
                        <ApartmentCard
                            key={apt.id}
                            image={apt.images?.[0]?.url}
                            title={apt.name}
                            price={formatPrice(apt.price)}
                            id={apt.id}
                        />
                    ))
                )}
            </div>
                <Pagination page={page} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
            </div>
        </>
    );
}
