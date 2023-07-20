import asyncHandler from "express-async-handler";

export const superAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.otherInfo.userType === 1) {
        next();
    } else {
        res.status(403);
        throw new Error("Vous n'êtes pas autorisé(e) à effectuer cette demande.");
    }
});
