import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';

// =====================
// CREATE CONTACT MESSAGE
// POST /api/contact
// =====================

export const createContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message, phone, subject } = req.body;

    // 1. Validate required fields
    if (!name || !email || !message || !phone || !subject) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, message, phone, subject'
      });
      return;
    }

    // 2. Create new contact message
    const contactMessage = await ContactMessage.create({
      name,
      email,
      message,
      phone,
      subject
    });

    // 3. Send response
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contactMessage
    });

  } catch (error: any) {
    console.error('Create contact message error:', error);

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
      message: 'Server error while sending message'
    });
  }
};

// =====================
// GET ALL CONTACT MESSAGES
// GET /api/contact
// =====================

export const getAllContactMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get all messages, sorted by newest first
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });

  } catch (error: any) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching messages'
    });
  }
};

// =====================
// DELETE CONTACT MESSAGE
// DELETE /api/contact/:id
// =====================

export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1. Find and delete contact message
    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      res.status(404).json({
        success: false,
        message: 'Message not found'
      });
      return;
    }

    // 2. Send response
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting message'
    });
  }
};

// =====================
// UPDATE CONTACT STATUS
// PUT /api/contact/:id
// =====================

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        message: "Status is required"
      });
      return;
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      res.status(404).json({
        success: false,
        message: "Message not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedMessage
    });

  } catch (error) {
    console.error("Update contact status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating status"
    });
  }
};
