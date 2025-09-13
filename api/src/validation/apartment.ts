import { z } from 'zod';

export const apartmentSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined ? 'Name is required.' : 'Please enter a valid name.',
  }).min(1, 'Name is required.'),

  unitNumber: z.string({
    error: (issue) =>
      issue.input === undefined
        ? 'Unit number is required.'
        : 'Please enter a valid unit number',
  }).min(1, 'Unit number is required.'),

  price: z.coerce.number({
    error: () => 'Please enter a valid price.',
  }).min(0, 'Price must be at least 0.'),

  bedrooms: z.coerce.number({
    error: () => 'Please enter a valid number of bedrooms.',
  }).min(0, 'Bedrooms must be 0 or more.'),

  bathrooms: z.coerce.number({
    error: () => 'Please enter a valid number of bathrooms.',
  }).min(0, 'Bathrooms must be 0 or more.'),

  area: z.coerce.number({
    error: () => 'Please enter a valid number for area.',
  }).min(0, 'Area must be 0 or more.'),

  projectId: z.coerce.number({
    error: () => 'Please enter a valid project ID.',
  }).int('Project ID must be an integer.'),

  images: z.array(
    z.object({
      url: z.string({
        error: () => 'Please enter a valid URL.',
      }).url('Please enter a valid URL.'),
    })
  ).optional(),
});

export const apartmentFilterSchema = z.object({
  minPrice: z.coerce.number({
    error: () => 'Please enter a valid price',
  }).min(0, 'minPrice must be 0 or more.').optional(),

  maxPrice: z.coerce.number({
    error: () => 'Please enter a valid price',
  }).min(0, 'maxPrice must be 0 or more.').optional(),

  minArea: z.coerce.number({
    error: () => 'Please enter a valid number for minArea.',
  }).min(0, 'minArea must be 0 or more.').optional(),

  maxArea: z.coerce.number({
    error: () => 'Please enter a valid number for maxArea.',
  }).min(0, 'maxArea must be 0 or more.').optional(),

  bedrooms: z.coerce.number({
    error: () => 'Please enter a valid number for bedrooms.',
  }).min(0, 'bedrooms must be 0 or more.').optional(),

  bathrooms: z.coerce.number({
    error: () => 'Please enter a valid number for bathrooms.',
  }).min(0, 'bathrooms must be 0 or more.').optional(),

  unitName: z.string({
    error: () => 'Please enter a valid unit name.',
  }).optional(),

  projectName: z.string({
    error: () => 'Please enter a valid project name.',
  }).optional(),
});
