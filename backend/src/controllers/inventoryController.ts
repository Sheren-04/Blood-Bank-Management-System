import { Request, Response } from "express";
import Inventory from "../models/Inventory";

/*
GET all inventory
*/

export const getInventory = async (_req: Request, res: Response) => {
  
  try {
    const data = await Inventory.find().sort({ bloodGroup: 1 });
    
    const totalUnits = data.reduce((sum, item) => sum + item.unitsAvailable, 0);
    // Critical = 1–5 units (based on your UI)
    const criticalStockCount = data.filter(
      (i) => i.unitsAvailable > 0 && i.unitsAvailable <= 5
    ).length;

    res.json({
      inventory: data,
      summary: {
        totalUnits,
        bloodGroups: data.length,
        criticalStockCount,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching inventory" });
  }
};

/*
UPDATE inventory (admin edit)
*/
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { unitsAvailable, pricePerUnit } = req.body;

    let status = 'In Stock';

    if (unitsAvailable === 0) {
      status = 'Out of Stock';
    } else if (unitsAvailable < 10) {
      status = 'Low';
    }

    const updated = await Inventory.findByIdAndUpdate(
      id,
      {
        unitsAvailable,
        pricePerUnit,
        status,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};


