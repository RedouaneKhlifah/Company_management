import express from "express";
import {
    createEmploi,
    fetchAllEmplois,
    fetchSingleEmploi,
    updateEmploi,
    deleteEmploi
} from "../controllers/EmploisController.js";
import { protect } from "../middleware/authMiddleware.js";
import { Router } from "express";


const router = Router();

// Create a new Emploi
router.route("/" ,protect ,createEmploi);

// Get all Emplois
router.route("/").get(fetchAllEmplois);

// Get one Emploi
router.route("/:id").get(fetchSingleEmploi);

// Update an Emploi by ID
router.route("/:id").put(protect, updateEmploi);

// Delete an Emploi by ID
router.route("/:id").delete(protect, deleteEmploi);

export default router;
