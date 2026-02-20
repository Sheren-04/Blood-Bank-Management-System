import express from "express";
import {
  getInventory,
  updateInventory,
} from "../controllers/inventoryController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getInventory);
router.put("/:id", protect, updateInventory);
console.log("Inventory routes loaded");


export default router;
