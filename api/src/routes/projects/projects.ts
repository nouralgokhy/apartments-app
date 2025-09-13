
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Returns a list of all projects (id and name).
 *     responses:
 *       200:
 *         description: A list of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Failed to fetch projects
 */
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;
