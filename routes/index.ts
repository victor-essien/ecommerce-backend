import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);


export default router;