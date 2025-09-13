export default function StatsGrid({ area, bedrooms, bathrooms }: { area: number; bedrooms: number; bathrooms: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full mb-8">
      <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
        <div className="text-xs text-gray-500 mb-2">Area</div>
        <div className="text-xl font-semibold text-gray-800">{area} m²</div>
      </div>
      <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
        <div className="text-xs text-gray-500 mb-2">Bedrooms</div>
        <div className="text-xl font-semibold text-gray-800">{bedrooms}</div>
      </div>
      <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow">
        <div className="text-xs text-gray-500 mb-2">Bathrooms</div>
        <div className="text-xl font-semibold text-gray-800">{bathrooms}</div>
      </div>
    </div>
  );
}
