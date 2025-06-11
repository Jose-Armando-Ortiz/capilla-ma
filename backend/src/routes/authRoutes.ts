
import { Router } from 'express';
import { register, login, logout, me } from '../controllers/authController';
import { requireAuth, requireGuest } from '../middleware/auth';

const router = Router();

router.post('/register', requireGuest, register);
router.post('/login', requireGuest, login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, me);

export default router;

