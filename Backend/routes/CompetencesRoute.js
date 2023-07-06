import { fetchCompetence } from "../controllers/competencesController";
import { Router } from "express";

const router = Router();

router.get("/", fetchCompetence);

export { router as CompetencesRoute };
