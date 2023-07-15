import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utilities/GenerateToken.js";
import avatarUpload from "../middleware/avatarUploadMiddleware.js";

/**
 * @desc Register a new user
 * @route POST /api/user
 * @access public
 */
export const createUser = asyncHandler(async (req, res) => {
    const { personal_info, professional_info } = req.body;
});

/**
 * @desc Search for the profile of a user
 * @route GET /api/user/:name
 * @access private (admin only)
 */
export const searchForUser = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const user = await User.find({
        "otherInfo.fullName": { $regex: new RegExp(name, "i") }
    });

    if (user.length > 0) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("Employé introuvable.");
    }
});

/**
 * @desc Create a new user by the admin
 * @route POST /api/user/admin
 * @access private (admin only)
 */
export const adminCreateUser = asyncHandler(async (req, res) => {
    // console.log(req.body);
    console.log("test");
    const userExist = await User.findOne({
        $or: [
            {
                "personalInfo.E-mail personnel":
                    req.body.personalInfo.personalEmail
            },
            {
                "personalInfo.E-mail professionnel":
                    req.body.personalInfo.proEmail
            }
        ]
    });

    if (userExist) {
        res.status(400);
        throw new Error("L'utilisateur existe déjà.");
    }

    const {
        name,
        familyName,
        phone,
        personalEmail,
        proEmail,
        ...otherPersonalFields
    } = req.body.personalInfo;
    const {
        direction,
        category,
        formation,
        speciality,
        previousExp,
        anepExp,
        service,
        ...otherProFields
    } = req.body.professionalInfo;
    const skills = JSON.parse(req.body.skills);
    const jobs = JSON.parse(req.body.jobs);
    const defaultPassword = "anep1234";
    const fullName =
        req.body.personalInfo.name.trim() +
        " " +
        req.body.personalInfo.familyName.trim();
    const otherInfo = {
        userType: req.body.userType,
        fullName
    };
    const personalInfo = {
        Nom: familyName,
        Prénom: name,
        Téléphone: phone,
        "E-mail personnel": personalEmail,
        "E-mail professionnel": proEmail,
        ...otherPersonalFields
    };
    const professionalInfo = {
        Direction: direction,
        Catégorie: category,
        Formation: formation,
        Spécialité: speciality,
        "Expérience antérieure": previousExp,
        "Expérience à l'ANEP": anepExp,
        "Service extérieur": service,
        ...otherProFields
    };

    const newUser = await User.create({
        password: defaultPassword,
        otherInfo,
        personalInfo,
        professionalInfo,
        skills,
        jobs
    });

    res.status(200).json(newUser);
});
