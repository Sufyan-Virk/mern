import express from "express";
import categoryRoutes from './category.routes.js';
import carRoutes from './car.routes.js';
import userRoutes from './user.routes.js';
import { protect } from "../Middlewares/auth.js";
const router =   express.Router();

router.use('/user', userRoutes)
router.use(protect)
router.use('/category', categoryRoutes);
router.use('/car', carRoutes)

export default router;