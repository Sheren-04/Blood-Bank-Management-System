import mongoose, { Document, Schema } from 'mongoose';

// =====================
// TYPESCRIPT INTERFACE
// =====================

export interface IBloodRequest extends Document {
  patientName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  unitsRequired: number;
  requiredDate: Date;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  deliveryMethod: 'pickup' | 'delivery';
  paymentMode: 'cod' | 'online';
  contactPerson: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  additionalNotes?: string;
  amount?: number; 
  status: string;
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
     age: {
      type: Number,
      required: [true, 'Patient age is required'],
      min: [0, 'Age cannot be negative'],
      max: [100, 'Age cannot exceed 100 years'] 
  },
   gender: {
      type: String,
      required: [true, 'Patient gender is required'],
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender'
      }
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group'
      }
    },
    unitsRequired: {
      type: Number,
      required: [true, 'Units required is required'],
      min: [1, 'At least 1 unit is required']
    },
    requiredDate: {
      type: Date,
      required: [true, 'Required date is required'],    
      validate: {
        validator: function (value: Date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const selected = new Date(value);
          selected.setHours(0, 0, 0, 0);

          return selected >= today;
        },
    message: "Required date cannot be in the past"
  }
  },
  urgency: {
      type: String,
      required: [true, 'Urgency level is required'],
      enum: {
        values: ['Low', 'Medium', 'High', 'Critical'],
        message: '{VALUE} is not a valid urgency level'
      },
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['Pending', 'Out for delivery', 'Completed'],
      default: 'Pending',
      required: true,
    },
    deliveryMethod: {
      type: String,
      required: [true, 'Delivery method is required'],    
      enum: {
        values: ['pickup', 'delivery'], 
        message: '{VALUE} is not a valid delivery method'
      }
  },
    paymentMode: {
      type: String, 
      required: [true, 'Payment mode is required'],    
      enum: {
        values: ['cod', 'online'],
        message: '{VALUE} is not a valid payment mode'
      }
  },
    contactPerson: {
      type: String,
      required: [true, 'Contact person is required'],
      trim: true,
      minlength: [2, 'Contact person name must be at least 2 characters'],
      maxlength: [100, 'Contact person name cannot exceed 100 characters']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[0-9]{10}$/,
        'Please provide a valid 10-digit contact number'
      ]
    },
    
    email: {
      type: String,
      required: [true, 'Email is required'],  
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
  },
   
    deliveryAddress: {
      type: String,
      // Only required when deliveryMethod is 'delivery'
      required: function(this: IBloodRequest) {
        return this.deliveryMethod === 'delivery';
      },
      trim: true,
    },
    additionalNotes: {
      type: String,
      trim: true,
      maxlength: [500, 'Additional notes cannot exceed 500 characters']
    },
    amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
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
