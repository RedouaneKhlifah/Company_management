import express from "express";
import {
    createEmploi,
    fetchAllEmplois,
    fetchSingleEmploi,
    updateEmploi,
    deleteEmploi
} from "../controllers/EmploisController.js";

const router = express.Router();

// Create a new Emploi
router.post("/", createEmploi);

// Get all Emplois
router.get("/", fetchAllEmplois);

// Get one Emploi
router.get("/:id", fetchSingleEmploi);

// Update an Emploi by ID
router.put("/:id", updateEmploi);

// Delete an Emploi by ID
router.delete("/:id", deleteEmploi);

export default router;
