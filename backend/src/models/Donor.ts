import mongoose, { Document, Schema } from 'mongoose';

// =====================
// TYPESCRIPT INTERFACE
// =====================

export interface IDonor extends Document {
  name: string;
  bloodGroup: string;
  phone: string;
  city: string;
  email: string;
  age: number;
  gender: string;
  lastDonation?: Date;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// MONGOOSE SCHEMA
// =====================

const donorSchema = new Schema<IDonor>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group'
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [16, 'Age must be at least 16'],
      max: [70, 'Age cannot exceed 70']
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender'
      }
    },
    lastDonation: {
      type: Date,
      default: null
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[0-9]{10}$/,
        'Please provide a valid 10-digit phone number'
      ]
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      minlength: [2, 'City name must be at least 2 characters'],
      maxlength: [50, 'City name cannot exceed 50 characters']
    },
    available: {
      type: Boolean,
      default: true, // New donors are available by default
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// =====================
// INDEXES for faster queries
// =====================

// Index for searching by blood group and city
donorSchema.index({ bloodGroup: 1, city: 1 });

// Index for searching available donors
donorSchema.index({ available: 1 });

// =====================
// EXPORT MODEL
// =====================

const Donor = mongoose.model<IDonor>('Donor', donorSchema);

export default Donor;
