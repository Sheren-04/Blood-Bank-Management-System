import mongoose, { Document, Schema } from 'mongoose';

// =====================
// TYPESCRIPT INTERFACE
// =====================

export interface IBloodRequest extends Document {
  patientName: string;
  bloodGroup: string;
  hospital: string;
  contact: string;
  urgency: string;
  unitsRequired: number;
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// MONGOOSE SCHEMA
// =====================

const bloodRequestSchema = new Schema<IBloodRequest>(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      minlength: [2, 'Patient name must be at least 2 characters'],
      maxlength: [100, 'Patient name cannot exceed 100 characters']
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group'
      }
    },
    hospital: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
      minlength: [3, 'Hospital name must be at least 3 characters'],
      maxlength: [150, 'Hospital name cannot exceed 150 characters']
    },
    unitsRequired: {
      type: Number,
      required: [true, 'Units required is required'],
      min: [1, 'At least 1 unit is required'],
      max: [20, 'Cannot request more than 20 units at once']
    },
    contact: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
      match: [
        /^[0-9]{10}$/,
        'Please provide a valid 10-digit contact number'
      ]
    },
    urgency: {
      type: String,
      required: [true, 'Urgency level is required'],
      enum: {
        values: ['Low', 'Medium', 'High', 'Critical'],
        message: '{VALUE} is not a valid urgency level'
      },
      default: 'Medium'
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// =====================
// INDEXES for faster queries
// =====================

// Index for searching by blood group and urgency
bloodRequestSchema.index({ bloodGroup: 1, urgency: -1 });

// Index for sorting by creation date (newest first)
bloodRequestSchema.index({ createdAt: -1 });

// =====================
// EXPORT MODEL
// =====================

const BloodRequest = mongoose.model<IBloodRequest>(
  'BloodRequest',
  bloodRequestSchema
);

export default BloodRequest;