

export function cleanStr(v: unknown): string | undefined {
  if (!v) return undefined;
  return String(v).trim().replace(/^['"]+|['"]+$/g, '');
}

export function buildApartmentFilters(query: any) {
  const filters: any[] = [];

  if (query.unitNumber) {
    filters.push({
      unitNumber: { contains: cleanStr(query.unitNumber), mode: 'insensitive' },
    });
  }

  if (query.unitName) {
    filters.push({
      name: { contains: cleanStr(query.unitName), mode: 'insensitive' },
    });
  }

  if (query.projectName) {
    filters.push({
      project: {
        is: {
          name: {
            contains: cleanStr(query.projectName),
            mode: 'insensitive',
          },
        },
      },
    });
  }

  if (query.bedrooms) filters.push({ bedrooms: Number(query.bedrooms) });
  if (query.bathrooms) filters.push({ bathrooms: Number(query.bathrooms) });

  if (query.minPrice) filters.push({ price: { gte: Number(query.minPrice) } });
  if (query.maxPrice) filters.push({ price: { lte: Number(query.maxPrice) } });

  if (query.minArea) filters.push({ area: { gte: Number(query.minArea) } });
  if (query.maxArea) filters.push({ area: { lte: Number(query.maxArea) } });

  return filters;
}
