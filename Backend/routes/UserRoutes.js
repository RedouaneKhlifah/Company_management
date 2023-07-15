import { Router } from "express";
import { searchForUser, adminCreateUser } from "../controllers/UsersController.js";
import { adminCreateUserValidationRules } from "../validators/UserValidator.js";
import avatarUpload from "../middleware/avatarUploadMiddleware.js";

const router = Router();

router.get("/search/:name", searchForUser);
router.post("/admin", avatarUpload.single("avatar"), adminCreateUserValidationRules, adminCreateUser);

export default router;
