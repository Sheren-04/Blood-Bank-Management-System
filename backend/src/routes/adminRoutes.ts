import express from 'express';
import { loginAdmin, 
        getDashboardStats, 
        getRecentRequests 
    } from '../controllers/adminController';

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

export default router;