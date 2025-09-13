import express from 'express';
import { PrismaClient } from '@prisma/client';
import {apartmentSchema, apartmentFilterSchema} from '../../validation/apartment';
import { buildApartmentFilters, cleanStr } from '../../utils/apartmentFilters';
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/apartments:
 *   get:
 *     summary: Get all apartments
 *     description: API for all apartments in the system with pagination and filtering. Returns price, name, image.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: unitName
 *         schema:
 *           type: string
 *         description: Filter by unit name (partial match, case insensitive)
 *       - in: query
 *         name: unitNumber
 *         schema:
 *           type: string
 *         description: Filter by exact unit number
 *       - in: query
 *         name: projectName
 *         schema:
 *           type: string
 *         description: Filter by project name (partial match, case insensitive)
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *         description: Filter by exact number of bedrooms
 *       - in: query
 *         name: bathrooms
 *         schema:
 *           type: integer
 *         description: Filter by exact number of bathrooms
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter by maximum price
 *     responses:
 *       200:
 *         description: A list of all apartments
 *       500:
 *         description: Failed to fetch apartments
 */
router.get('/', async (req, res) => {
  try {
    const pageSize = 3;
    const page = Number(req.query.page) || 1;

    const parseResult = apartmentFilterSchema.safeParse(req.query);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.issues });
    }

    const filters = buildApartmentFilters(req.query);

    const where = filters.length > 0 ? { AND: filters } : {};
    
    const total = await prisma.apartment.count({ where });

    const apartments = await prisma.apartment.findMany({
    where,
    select: {
        id: true,
        name: true,
        price: true,
        images: {
        take: 1,
        select: { id: true, url: true },
        },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
    });
    res.json({
      data: apartments,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
});

/**
 * @swagger
 * /api/apartments/{id}:
 *   get:
 *     summary: Get apartment by ID
 *     description: API for fetching detailed info about a specific apartment by ID. Returns price, name, images, area, bedrooms, bathrooms, unitNumber, project.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apartment ID
 *     responses:
 *       200:
 *         description: A detailed info about an apartment
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Failed to fetch apartment
 */
  
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params

    const apartment = await prisma.apartment.findUnique({
        where: { id: Number(id) },
        include: { images: true, project: true },
    });
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });

    res.json(apartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch apartment' });
  }
});

/**
 * @swagger
 * /api/apartments:
 *   post:
 *     summary: Create a new apartment
 *     description: API for creating a new apartment. Returns price, name, images, area, bedrooms, bathrooms, unitNumber, project.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               unitNumber:
 *                 type: string
 *               price:
 *                 type: number
 *               bedrooms:
 *                 type: number
 *               bathrooms:
 *                 type: number
 *               area:
 *                 type: number
 *               projectId:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: A detailed info about the created apartment
 *       500:
 *         description: Failed to create apartment

 */
router.post('/', async (req, res) => {
  try {
    const parseResult = apartmentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Bad Request',
        details: parseResult.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: req.body.projectId }
    });
    if (!project) {
      return res.status(400).json({ error: 'Project does not exist' });
    }

    const apartment = await prisma.apartment.create({
      data: {
        ...req.body,
        images: undefined,
      },
    });

    if (Array.isArray(req.body.images) && req.body.images.length > 0) {
      await prisma.image.createMany({
        data: req.body.images.map((img: { url: string }) => ({
          url: img.url,
          apartmentId: apartment.id,
        })),
      });
    }

    res.status(201).json(apartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
});


export default router;


