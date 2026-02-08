import Inventory from "../models/Inventory";

export const seedInventory = async () => {
  const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  for (const g of groups) {
    const exists = await Inventory.findOne({ bloodGroup: g });
    if (!exists) {
      await Inventory.create({
        bloodGroup: g,
        unitsAvailable: 0,
        pricePerUnit: 3000,
      });
    }
  }

  console.log("Inventory seeded");
};
