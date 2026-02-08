import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  bloodGroup: string;
  unitsAvailable: number;
  pricePerUnit: number;
}

const inventorySchema = new Schema<IInventory>(
  {
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      unique: true,
    },
    unitsAvailable: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: 0,
      default: 3000,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInventory>("Inventory", inventorySchema);
