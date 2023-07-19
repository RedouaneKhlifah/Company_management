import { Router } from "express";
import {
    authUser,
    logoutUser,
    getUserProfile,
    searchForUser,
    adminCreateUser,
    adminUpdateUser
} from "../controllers/UsersController.js";
import { protect } from "../middleware/authMiddleware.js";
import { superAdmin } from "../middleware/superAdminMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { adminCreateUserValidationRules } from "../validators/CreateUserValidator.js";
import { adminUpdateUserValidationRules } from "../validators/UpdateUserValidator.js";
import { adminUpdateUserSkillsValidationRules } from "../validators/UpdateUserSkillsValidator.js";
import avatarUpload from "../middleware/avatarUploadMiddleware.js";

const router = Router();

router.get("/search/:name", searchForUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router
    .route("/admin")
    .post(
        protect,
        admin,
        avatarUpload.single("avatar"),
        adminCreateUserValidationRules,
        adminCreateUser
    )
    .put(
        protect,
        admin,
        avatarUpload.single("avatar"),
        adminUpdateUserValidationRules,
        adminUpdateUser
    )
    .patch(
        protect,
        admin,
        adminUpdateUserSkillsValidationRules,
        adminUpdateUser
    );

export default router;
