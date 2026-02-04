import express from 'express';
import { 
  createDonor, 
  getAllDonors, 
  deleteDonor 
} from '../controllers/donorController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// =====================
// DONOR ROUTES
// =====================

// @route   POST /api/donors
// @desc    Register a new donor
// @access  Public
router.post('/', createDonor);

// @route   GET /api/donors
// @desc    Get all donors (admin only)
// @access  Protected
router.get('/get-donors', protect, getAllDonors);

// @route   DELETE /api/donors/:id
// @desc    Delete a donor (admin only)
// @access  Protected
router.delete('/:id', protect, deleteDonor);

router.get("/", getAllDonors);
router.delete("/:id", deleteDonor);

export default router;