/* eslint-disable @next/next/no-img-element */
'use client';
import Gallery from '../../components/Gallery';
import StatsGrid from '../../components/StatsGrid';
import Fallback from '../../components/Fallback';
import CustomHeader from '../../components/CustomHeader';
import { formatPrice } from '../../utils/formatPrice';
import { getApartmentById, Apartment } from '../../api/apartments';
import React, { useEffect, useState } from 'react';

function ApartmentCardShimmer() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4 h-[340px] w-full max-w-2xl mx-auto">
      <div className="bg-gray-200 h-40 w-full rounded-lg shimmer" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-gray-200 h-6 w-2/3 rounded" />
        <div className="bg-gray-200 h-4 w-1/2 rounded" />
        <div className="bg-gray-200 h-4 w-1/3 rounded" />
      </div>
      <div className="bg-gray-200 h-10 w-full rounded-lg mt-auto" />
      <style jsx global>{`
        .shimmer {
          background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
          background-size: 2000px 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
}

export default function ApartmentDetails({ params }) {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApartment() {
      setLoading(true);
      try {
        const result = await getApartmentById(params.id);
        if ('error' in result) {
          setError(result.error);
          setApartment(null);
        } else {
          setApartment(result);
          setError(null);
        }
      } catch {
        setError('Apartment not found.');
        setApartment(null);
      } finally {
        setLoading(false);
      }
    }
    fetchApartment();
  }, [params.id]);

  if (loading) {
    return (
      <div className="w-full min-h-0 bg-gray-100 flex flex-col">
        <CustomHeader title="Apartment Details" />
        <div className="h-[88px]" />
        <ApartmentCardShimmer />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-0 bg-gray-100 flex flex-col">
        <CustomHeader title="Apartment Details" />
        <div className="h-[88px]" />
        <Fallback title="Apartment not found" description={error} />
      </div>
    );
  }
  if (!apartment) {
    return (
      <div className="w-full min-h-0 bg-gray-100 flex flex-col">
        <CustomHeader title="Apartment Details" />
        <div className="h-[88px]" />
        <Fallback title="No apartment" description="No apartment data available." />
      </div>
    );
  }
  return (
    <div className="w-full min-h-0 bg-gray-100 flex flex-col">
      <CustomHeader title="Apartment Details" />
      <div className="h-[88px]" />
      <main className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-5xl mx-auto my-4 md:my-8 rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-2 md:p-6">
          {apartment.images?.[0]?.url ? (
            <img
              src={apartment.images[0].url}
              alt={apartment.name}
              className="w-full max-h-[340px] md:max-h-[500px] object-cover rounded-xl mb-4"
            />
          ) : null}
        </div>
        <aside className="flex-1 flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:px-10 md:py-10 min-h-[340px] md:min-h-[500px] rounded-r-2xl w-full">
          <h2 className="text-base md:text-lg font-normal text-gray-900 mb-2 mt-0 self-start">
            {apartment.name}
          </h2>
          <div className="text-lg md:text-xl text-gray-700 font-semibold mb-2">
            {formatPrice(apartment.price)}
          </div>
          <div className="text-base text-gray-500 mb-6">Unit {apartment.unitNumber}</div>
          <div className="flex flex-col gap-2 mb-8">
            <div className="text-base text-gray-700">
              Project: <span className="font-medium text-gray-900">{apartment.project?.name}</span>
            </div>
            <div className="text-base text-gray-700">
              Location: <span className="font-medium text-gray-900">{apartment.project?.location}</span>
            </div>
          </div>
          <StatsGrid
            area={apartment.area ?? 0}
            bedrooms={apartment.bedrooms ?? 0}
            bathrooms={apartment.bathrooms ?? 0}
          />
          {apartment.images && apartment.images.length > 0 ? (
            <Gallery images={apartment.images} />
          ) : null}
        </aside>
      </main>
    </div>
  );
}
