import mongoose, { Document, Schema } from 'mongoose';

// =====================
// TYPESCRIPT INTERFACE
// =====================

export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  phone: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// MONGOOSE SCHEMA
// =====================

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number'],
},

  subject: {
  type: String,
  required: [true, 'Subject is required'],
  trim: true,
  minlength: [5, 'Subject must be at least 5 characters'],
  maxlength: [150, 'Subject cannot exceed 150 characters'],
},
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// =====================
// INDEXES for faster queries
// =====================

// Index for sorting by creation date (newest first)
contactMessageSchema.index({ createdAt: -1 });

// =====================
// EXPORT MODEL
// =====================

const ContactMessage = mongoose.model<IContactMessage>(
  'ContactMessage',
  contactMessageSchema
);

export default ContactMessage;