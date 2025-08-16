import { Router } from 'express';
import { createShortUrl, redirectByCode, listAll, deleteUrl } from '../controllers/urlController.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const router = Router();

router.post('/api/shorten', createShortUrl);
router.get('/api/admin/urls', adminAuth, listAll);
router.delete('/api/admin/urls/:id', adminAuth, deleteUrl);
router.get('/:shortcode', redirectByCode);

export default router;
