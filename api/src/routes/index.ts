import { Router } from 'express';
import apartmentRoutes from './apartments/router';
import projectsRoutes from './projects/projects';

const router = Router();

router.use('/apartments', apartmentRoutes);
router.use('/projects', projectsRoutes);

export default router;