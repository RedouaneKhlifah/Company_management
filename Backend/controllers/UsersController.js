import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utilities/GenerateToken.js";

export const createUser = asyncHandler(async (req, res) => {
    const {personal_info, professional_info} = req.body;
});

/**
 * @desc Search for the profile of a user
 * @route GET /api/user/:name
 * @access private (admin only)
 */
export const searchForUser = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const user = await User.find({
        $or: [
            { "info_personelle.Prénom": { $regex: new RegExp(name, "i") } },
            { "info_personelle.Nom": { $regex: new RegExp(name, "i") } }
        ]
    });

    if (user.length > 0) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

/**
 * @desc Create a new user by the admin
 * @route POST /api/user/admin
 * @access private (admin only)
 */
export const adminCreateUser = asyncHandler(async (req, res) => {
    console.log(req.body);
});
