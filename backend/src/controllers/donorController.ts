import { Request, Response } from 'express';
import Donor from '../models/Donor';

// =====================
// CREATE DONOR
// POST /api/donors
// =====================

export const createDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, bloodGroup, phone, city, available, email, age, gender, lastDonation } = req.body;
    
    // 1. Validate required fields
    if (!name || !bloodGroup || !phone || !city || !email || !age || !gender || !lastDonation) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, bloodGroup, phone, city, email, age, gender, lastDonation'
      });
      return;
    }

    // 2. Create new donor
    const donor = await Donor.create({
      name,
      bloodGroup,
      phone,
      city,
      email,
      age,
      gender,
      available: available !== undefined ? available : true,
      lastDonation
    });

    // 3. Send response
    res.status(201).json({
      success: true,
      message: 'Donor registered successfully',
      data: donor
    });

  } catch (error: any) {
    console.error('Create donor error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: error.message
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error while registering donor'
    });
  }
};

// =====================
// GET ALL DONORS
// GET /api/donors
// =====================

export const getAllDonors = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get all donors, sorted by newest first
    const donors = await Donor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors
    });

  } catch (error: any) {
    console.error('Get donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching donors'
    });
  }
};

// =====================
// DELETE DONOR
// DELETE /api/donors/:id
// =====================

export const deleteDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1. Find and delete donor
    const donor = await Donor.findByIdAndDelete(id);

    if (!donor) {
      res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
      return;
    }

    // 2. Send response
    res.status(200).json({
      success: true,
      message: 'Donor deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete donor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting donor'
    });
  }
};
