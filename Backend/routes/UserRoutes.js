import { Router } from "express";
import {
    authUser,
    logoutUser,
    forgotPassword,
    resetPasswordView,
    resetPassword,
    getUserProfile,
    searchForUser,
    fetchUsers,
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUser
} from "../controllers/UsersController.js";
import { protect } from "../middleware/authMiddleware.js";
import { superAdmin } from "../middleware/superAdminMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { adminCreateUserValidationRules } from "../validators/CreateUserValidator.js";
import { adminUpdateUserValidationRules } from "../validators/UpdateUserValidator.js";
import { adminUpdateUserSkillsValidationRules } from "../validators/UpdateUserSkillsValidator.js";
import { resetPasswordValirationRules } from "../validators/ResetPasswordValidator.js";
import avatarUpload from "../middleware/avatarUploadMiddleware.js";

const router = Router();

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:email/:id/:token", resetPasswordView);
router.post("/reset-password/:email/:id/:token", resetPasswordValirationRules, resetPassword);
router.get("/search/:name", protect, searchForUser);
router.get("/", protect, fetchUsers);
router.get("/profile", protect, getUserProfile);
router
    .route("/admin")
    .post(
        protect,
        admin,
        avatarUpload.single("avatar"),
        adminCreateUserValidationRules,
        adminCreateUser
    );
router
    .route("/admin/:id")
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
    )
    .delete(protect, superAdmin, adminDeleteUser);

export default router;
