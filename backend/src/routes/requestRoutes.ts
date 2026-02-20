import express from 'express';
import { 
  createBloodRequest, 
  getAllBloodRequests, 
  deleteBloodRequest,
  updateBloodRequestStatus
} from '../controllers/requestController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// =====================
// BLOOD REQUEST ROUTES
// =====================

// @route   POST /api/requests
// @desc    Submit a blood request
// @access  Public
router.post('/', createBloodRequest);

// @route   GET /api/requests
// @desc    Get all blood requests (admin only)
// @access  Protected
router.get('/', protect, getAllBloodRequests);

// @route   DELETE /api/requests/:id
// @desc    Delete a blood request (admin only)
// @access  Protected
router.delete('/:id', protect, deleteBloodRequest); 
// @route   PUT /api/requests/:id
// @desc    Update blood request status
// @access  Protected
router.put('/:id', protect, updateBloodRequestStatus);


export default router;
