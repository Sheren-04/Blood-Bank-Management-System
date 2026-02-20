import express from 'express';
import { loginAdmin, 
        getDashboardStats, 
        getRecentRequests,
        changePassword, 
    } from '../controllers/adminController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// =====================
// ADMIN ROUTES
// =====================

// @route   POST /api/admin/login
// @desc    Admin login - returns JWT token
// @access  Public
router.post('/login', loginAdmin);
router.get('/stats', getDashboardStats);
router.get('/recent-requests', getRecentRequests);
router.post('/change-password', protect, changePassword)

export default router;
