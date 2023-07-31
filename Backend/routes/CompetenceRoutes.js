import {
    fetchCompetences,
    fetchCompetenceById,
    createCompetence,
    updateCompetence,
    deleteCompetence,
    autoCompleteCompetence
} from "../controllers/CompetenceController.js";
import { Router } from "express";

const router = Router();

// @GET
router.get("/autocomplete", autoCompleteCompetence);

router.get("/:page?/:filters?", fetchCompetences);

// autoCompleteCompetence

router.get("/:id", fetchCompetenceById);

// @POST
router.post("/", createCompetence);

// @PATCH
router.patch("/:id", updateCompetence);

// @Delete
router.delete("/:id", deleteCompetence);

export default router;
