export type Apartment = {
  id: number;
  name: string;
  price: string;
  images: { id: string; url: string }[];
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  unitNumber?: string;
  project?: {
    name?: string;
    location?: string;
  };
};

export type ApartmentCard = Apartment;
export type ApartmentResult = Apartment | { error: string };

export type ListResponse = {
  data: ApartmentCard[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ApartmentCreatePayload = {
  name: string;
  unitNumber: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  projectId?: number;
  images?: { url: string }[];
};

export type ApartmentCreateError = {
  error: string;
  details?: { path: string; message: string }[];
};

import { baseApi } from './baseApi';


// const API = process.env.NEXT_PUBLIC_API_BASE;
// console.log('API Base URL:', API);

export async function fetchApartments(params?: Record<string, string | number>) {
  
  const qs = params
    ? '?' +
      new URLSearchParams(
        Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
      ).toString()
    : '';
  return baseApi<ListResponse>(`/api/apartments${qs}`, { cache: 'no-store' });
}

export async function getApartments(params: Record<string, string | number>) {
  return fetchApartments(params);
}

export async function getApartmentById(id: string) {
  return baseApi<Apartment>(`/api/apartments/${id}`, { cache: 'no-store' });
}

export async function addApartment(payload: ApartmentCreatePayload) {
  return baseApi<Apartment>(`/api/apartments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
