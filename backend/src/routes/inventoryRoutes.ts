import express from "express";
import {
  getInventory,
  updateInventory,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/", getInventory);
router.put("/:id", updateInventory);

export default router;
