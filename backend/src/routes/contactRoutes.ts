import express from 'express';
import { 
  createContactMessage, 
  getAllContactMessages, 
  deleteContactMessage 
} from '../controllers/contactController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// =====================
// CONTACT MESSAGE ROUTES
// =====================

// @route   POST /api/contact
// @desc    Submit a contact message
// @access  Public
router.post('/', createContactMessage);

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
// @access  Protected
router.get('/', protect, getAllContactMessages);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact message (admin only)
// @access  Protected
router.delete('/:id', protect, deleteContactMessage);

export default router;