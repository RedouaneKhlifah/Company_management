import {
    fetchCompetences,
    fetchOneCompetence,
    createCompetence,
    updateCompetence,
    deleteCompetence
} from "../controllers/competencesController.js";
import { Router } from "express";

const router = Router();

// @GET
router.get("/", fetchCompetences);
router.get("/:id", fetchOneCompetence);

// @POST
router.post("/", createCompetence);

// @PATCH
router.patch("/:id", updateCompetence);

// @ Delete
router.delete("/:id", deleteCompetence);

export default router;
