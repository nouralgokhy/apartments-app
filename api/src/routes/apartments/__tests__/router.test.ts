const mockPrisma = {
  apartment: {
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  image: {
    createMany: jest.fn(),
  },
  project: {
    findUnique: jest.fn(),
  },
};

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
  };
});

jest.resetModules();

import express from 'express';
import request from 'supertest';


const apartmentsRouter = require('../router').default;

const PAGE_SIZE = 3;

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/apartments', apartmentsRouter);
  return app;
}

function unwrap<T = any>(body: any): T {
  return body && body.data !== undefined ? body.data : body;
}

describe('Apartments APIS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();

    mockPrisma.project.findUnique.mockResolvedValue({ id: 1, name: 'Test Project' });
    mockPrisma.apartment.findUnique.mockResolvedValue({
      id: 7,
      name: 'Madinaty South Park',
      price: 3000000,
      images: [{ id: 1, url: 'https://img/apt.jpg' }],
      project: { id: 2, name: 'Madinaty' },
    });
  });

  describe('GET /api/apartments', () => {
    it('returns paginated apartments with correct data', async () => {
      const mockedList = [
        { id: 1, name: 'North Coast Studio', unitNumber: 'A1', price: 2500000, bedrooms: 1, bathrooms: 1, area: 80, projectId: 1, images: [{ id: 10, url: 'https://img/1.jpg' }] },
        { id: 2, name: 'Zayed 3BR',          unitNumber: 'B2', price: 5500000, bedrooms: 3, bathrooms: 2, area: 120, projectId: 1, images: [{ id: 11, url: 'https://img/2.jpg' }] },
        { id: 3, name: 'SODIC 2BR',          unitNumber: 'C3', price: 4200000, bedrooms: 2, bathrooms: 2, area: 100, projectId: 1, images: [{ id: 12, url: 'https://img/3.jpg' }] },
      ];

      mockPrisma.apartment.count.mockResolvedValue(8);
      mockPrisma.apartment.findMany.mockResolvedValue(mockedList);

      const app = makeApp();
      const res = await request(app).get('/api/apartments?page=1&pageSize=3');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(unwrap(res.body)).toEqual(mockedList);
      expect(res.body.total).toBe(8);
      expect(res.body.page).toBe(1);
      expect(res.body.pageSize).toBe(PAGE_SIZE);
      expect(res.body.totalPages).toBe(Math.ceil(8 / PAGE_SIZE));

      expect(mockPrisma.apartment.count).toHaveBeenCalledWith({ where: {} });
      expect(mockPrisma.apartment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
          skip: 0,
          take: 3,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            price: true,
            images: { take: 1, select: { id: true, url: true } },
          },
        }),
      );
    });

    it('applies filters', async () => {
      mockPrisma.apartment.count.mockResolvedValue(1);
      mockPrisma.apartment.findMany.mockResolvedValue([
        { id: 99, name: 'Marassi Lagoon', unitNumber: 'D4', price: 9000000, bedrooms: 2, bathrooms: 3, area: 150, projectId: 1, images: [] },
      ]);

      const app = makeApp();
      const res = await request(app).get(
        '/api/apartments?projectName=Marassi&unitName=Lagoon&bedrooms=2&bathrooms=3&minPrice=1000000&maxPrice=9000000&minArea=80&maxArea=200',
      );

      expect(res.status).toBe(200);
      expect(unwrap(res.body)).toHaveLength(1);

      const args = mockPrisma.apartment.findMany.mock.calls[0][0];
      expect(args.where).toHaveProperty('AND');
      const AND = args.where.AND;
      expect(Array.isArray(AND)).toBe(true);

      expect(AND).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            project: {
              is: {
                name: expect.objectContaining({
                  contains: expect.any(String),
                  mode: 'insensitive',
                }),
              },
            },
          }),
        ]),
      );

      const nameFilter = AND.find((f: any) => f?.name?.contains);
      expect(nameFilter).toBeTruthy();
      expect(nameFilter.name).toEqual(
        expect.objectContaining({
          contains: 'Lagoon',
          mode: 'insensitive',
        }),
      );

      expect(AND).toEqual(
        expect.arrayContaining([
          { bedrooms: 2 },
          { bathrooms: 3 },
          { price: { gte: 1000000 } },
          { price: { lte: 9000000 } },
          { area: { gte: 80 } },
          { area: { lte: 200 } },
        ]),
      );
    });

    it('returns 400 when validation fails', async () => {
      const app = makeApp();
      const res = await request(app).get('/api/apartments?bedrooms=abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/apartments/:id', () => {
    it('returns a single apartment with images and project', async () => {
      const mockedApt = {
        id: 7,
        name: 'Madinaty South Park',
        price: 3000000,
        images: [{ id: 1, url: 'https://img/apt.jpg' }],
        project: { id: 2, name: 'Madinaty' },
      };
      mockPrisma.apartment.findUnique.mockResolvedValue(mockedApt);

      const app = makeApp();
      const res = await request(app).get('/api/apartments/7');

      expect(res.status).toBe(200);
      expect(unwrap(res.body)).toEqual(mockedApt);

      expect(mockPrisma.apartment.findUnique).toHaveBeenCalledWith({
        where: { id: 7 },
        include: { images: true, project: true },
      });
    });

    it('404 when not found', async () => {
      mockPrisma.apartment.findUnique.mockResolvedValue(null);

      const app = makeApp();
      const res = await request(app).get('/api/apartments/999');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Apartment not found' });
    });
  });

  describe('POST /api/apartments', () => {
    it('creates an apartment and links images when provided', async () => {
      const payload = {
        name: 'Sea View Chalet',
        unitNumber: 'E5',
        price: 7500000,
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
        projectId: 3,
        images: [{ url: 'https://img/1.jpg' }, { url: 'https://img/2.jpg' }],
      };
      const created = {
        id: 55,
        name: payload.name,
        unitNumber: payload.unitNumber,
        price: payload.price,
        bedrooms: payload.bedrooms,
        bathrooms: payload.bathrooms,
        area: payload.area,
        projectId: payload.projectId,
      };

      mockPrisma.project.findUnique.mockResolvedValue({ id: 3, name: 'Test Project' });
      mockPrisma.apartment.create.mockResolvedValue(created);
      mockPrisma.image.createMany.mockResolvedValue({ count: 2 });

      const app = makeApp();
      const res = await request(app).post('/api/apartments').send(payload);

      expect(res.status).toBe(201);
      expect(unwrap(res.body)).toEqual(created);

      expect(mockPrisma.apartment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'Sea View Chalet',
          images: undefined, // images created separately
        }),
      });

      expect(mockPrisma.image.createMany).toHaveBeenCalledWith({
        data: [
          { url: 'https://img/1.jpg', apartmentId: 55 },
          { url: 'https://img/2.jpg', apartmentId: 55 },
        ],
      });
    });

    it('skips image linking when no images provided', async () => {
      const created = {
        id: 77,
        name: 'No Images',
        unitNumber: 'A101',
        price: 1000000,
        bedrooms: 1,
        bathrooms: 1,
        area: 50,
        projectId: 1,
      };

      mockPrisma.project.findUnique.mockResolvedValue({ id: 1, name: 'Test Project' });
      mockPrisma.apartment.create.mockResolvedValue(created);

      const app = makeApp();
      const res = await request(app).post('/api/apartments').send({
        name: 'No Images',
        unitNumber: 'A101',
        price: 1000000,
        bedrooms: 1,
        bathrooms: 1,
        area: 50,
        projectId: 1,
      });

      expect(res.status).toBe(201);
      expect(unwrap(res.body)).toEqual(created);
      expect(mockPrisma.image.createMany).not.toHaveBeenCalled();
    });

    it('400 on body validation errors (Zod)', async () => {
      const app = makeApp();
      const res = await request(app).post('/api/apartments').send({ name: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Bad Request');
      expect(Array.isArray(res.body.details)).toBe(true);
    });
  });
});