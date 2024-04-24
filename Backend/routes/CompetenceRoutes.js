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
router.get("/one/:id", fetchCompetenceById);

router.get("/modelessCompetences", autoCompleteCompetence);

router.get("/:page?/:filters?", fetchCompetences);

// autoCompleteCompetence


// @POST
router.post("/", createCompetence);

// @PATCH
router.patch("/:id", updateCompetence);

// @Delete
router.delete("/:id", deleteCompetence);

export default router;
