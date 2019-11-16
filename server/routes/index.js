import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import articleRoutes from './article.routes';
import profileRoutes from './profile.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use('/profiles', profileRoutes);

router.use('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to forsetti-ah-backend API. If you get lost, use the docs.' });
});

export default router;
