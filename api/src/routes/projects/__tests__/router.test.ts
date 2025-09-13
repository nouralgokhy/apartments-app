const mockPrisma = {
  project: {
    findMany: jest.fn(),
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

const projectsRouter = require('../projects').default;

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/projects', projectsRouter);
  return app;
}

describe('Projects Router (Jest)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/projects', () => {
    it('returns projects ordered by name asc', async () => {
      const mockedProjects = [
        { id: 5, name: 'A' },
        { id: 2, name: 'B' },
        { id: 9, name: 'C' },
      ];
      mockPrisma.project.findMany.mockResolvedValue(mockedProjects);

      const app = makeApp();
      const res = await request(app).get('/api/projects');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockedProjects);

      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      });
    });

    it('returns empty array when no projects exist', async () => {
      mockPrisma.project.findMany.mockResolvedValue([]);

      const app = makeApp();
      const res = await request(app).get('/api/projects');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

  });
});
