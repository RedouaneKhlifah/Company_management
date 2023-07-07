import express from "express";
import {
  createEmploi,
  getEmplois,
  updateEmploi,
  deleteEmploi,
} from "../controllers/emploisController.js";

const router = express.Router();

// Create a new Emploi
router.post("/emplois", createEmploi);

// Get all Emplois
router.get("/emplois", getEmplois);

// Update an Emploi by ID
router.put("/emplois/:id", updateEmploi);

// Delete an Emploi by ID
router.delete("/emplois/:id", deleteEmploi);

export default router;
