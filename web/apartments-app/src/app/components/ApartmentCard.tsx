/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export interface ApartmentCardProps {
  image: string;
  title: string;
  price: string;
  id: number;
}

export default function ApartmentCard({ image, title, price, id }: ApartmentCardProps) {
  const href = `/apartment/${id}`;

  return (
    <Link
      href={href}
      className="w-full min-w-0 max-w-xs sm:max-w-[340px] rounded-xl shadow-lg overflow-hidden bg-gray-50 cursor-pointer transition hover:shadow-xl block"
      prefetch
    >
      <img src={image} alt={title} className="w-full min-w-0 h-[120px] sm:h-[160px] object-cover" />
      <div className="p-2 sm:p-4 pb-2">
        <div className="font-normal text-black tracking-wide mb-1 text-left text-base sm:text-lg leading-tight">
          {title}
        </div>
        <div className="font-normal text-[#222] text-[13px] sm:text-[14px] text-left mt-1">
          {price}
        </div>
      </div>
      <div className="flex justify-end px-2 sm:px-4 pb-2 sm:pb-4">
        <span className="rounded-full font-medium bg-gradient-to-r from-blue-500 to-blue-700 text-white text-[13px] sm:text-[14px] flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 shadow transition-all duration-150">
          View Details <ArrowForwardIcon fontSize="small" />
        </span>
      </div>
    </Link>
  );
}
