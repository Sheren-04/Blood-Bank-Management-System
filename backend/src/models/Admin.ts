import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// =====================
// TYPESCRIPT INTERFACE
// =====================

// Define the shape of Admin document
export interface IAdmin extends Document {
  email: string;
  password: string;
  createdAt: Date;
  // Method to compare passwords
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// =====================
// MONGOOSE SCHEMA
// =====================

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true, // Convert to lowercase
      trim: true, // Remove whitespace
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't include password in queries by default
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// =====================
// MIDDLEWARE - Hash password before saving
// =====================

adminSchema.pre('save', async function (next) {
  // Only hash if password is modified or new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt (random data for hashing)
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
  } catch (error: any) {
    next(error);
  }
});

// =====================
// INSTANCE METHOD - Compare passwords
// =====================

adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    // Compare plain text password with hashed password
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// =====================
// EXPORT MODEL
// =====================

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
