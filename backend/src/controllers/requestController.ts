import { Request, Response } from 'express';
import BloodRequest from '../models/BloodRequest';

// =====================
// CREATE BLOOD REQUEST
// POST /api/requests
// =====================

export const createBloodRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientName, age, gender, bloodGroup, unitsRequired, requiredDate, urgency, deliveryMethod, paymentMode, contactPerson, phoneNumber, email, deliveryAddress, additionalNotes, amount } = req.body;

    // 1. Validate required fields
     if (!patientName || !bloodGroup || !unitsRequired || !requiredDate || !contactPerson || !phoneNumber || !email || !paymentMode || !deliveryMethod || !age || !gender || !urgency || !amount || amount < 0) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: patientName, age, gender, bloodGroup, unitsRequired, requiredDate, urgency, deliveryMethod, paymentMode, contactPerson, phoneNumber, email, and amount (must be a positive number)'
      });
      return;
    }

    if (deliveryMethod === 'delivery' && !deliveryAddress) {
      res.status(400).json({
        success: false,
        message: 'Delivery address is required when delivery method is "delivery"'
      });
      return;
    }

    // 2. Create new blood request
    const bloodRequest = await BloodRequest.create({
      patientName,
      age,
      gender,
      bloodGroup,
      unitsRequired,
      requiredDate,
      urgency,
      deliveryMethod,
      paymentMode,
      contactPerson,
      phoneNumber,
      email,
      deliveryAddress,
      additionalNotes,
      amount
    });

    // 3. Send response
    res.status(201).json({
      success: true,
      message: 'Blood request submitted successfully',
      data: bloodRequest
    });

  } catch (error: any) {
    console.error('Create blood request error:', error);

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
      message: 'Server error while submitting blood request'
    });
  }
};

// =====================
// GET ALL BLOOD REQUESTS
// GET /api/requests
// =====================

export const getAllBloodRequests = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get all requests, sorted by urgency and newest first
    const requests = await BloodRequest.find().sort({ urgency: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });

  } catch (error: any) {
    console.error('Get blood requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blood requests'
    });
  }
};

// =====================
// DELETE BLOOD REQUEST
// DELETE /api/requests/:id
// =====================

export const deleteBloodRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1. Find and delete blood request
    const bloodRequest = await BloodRequest.findByIdAndDelete(id);

    if (!bloodRequest) {
      res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
      return;
    }

    // 2. Send response
    res.status(200).json({
      success: true,
      message: 'Blood request deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete blood request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting blood request'
    });
  }
};
export const updateBloodRequestStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ 
        success: false,
        message: 'Request not found',
      });
    }

    request.status = status;
    await request.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: request,
    });

  } catch (error: any) {
  console.error("Update Status Error:", error);

  res.status(500).json({
    success: false,
    message: error.message || "Server error",
  });
}
};
