import express from "express";
import categoryRoutes from './category.routes.js';
import carRoutes from './car.routes.js';
const router =   express.Router();

router.use('/category', categoryRoutes);
router.use('/car', carRoutes)
export default router;