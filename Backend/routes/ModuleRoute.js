import {
    fetchModules,
    fetchModuleById,
    createModule,
    UpdateModule
} from "../controllers/ModuleController.js";
import { Router } from "express";

const router = Router();

// @GET
router.get("/", fetchModules);
router.get("/:id", fetchModuleById);

// @POST
router.post("/", createModule);

// @PATCH
router.patch("/:id", UpdateModule);
export default router;
