import asyncHandler from "express-async-handler";

export const admin = asyncHandler(async (req, res, next) => {
    if (req.user && (req.user.otherInfo.userType === 1 || req.user.otherInfo.userType === 2)) {
        next();
    } else {
        return res.status(403).json({ error: "Vous n'êtes pas autorisé(e) à effectuer cette demande." });
    }
});
