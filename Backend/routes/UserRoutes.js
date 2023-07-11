import { Router } from "express";
import { searchForUser, adminCreateUser } from "../controllers/UsersController.js";

const router = Router();

router.get("/search/:name", searchForUser);
router.post("/admin", adminCreateUser);

export default router;
