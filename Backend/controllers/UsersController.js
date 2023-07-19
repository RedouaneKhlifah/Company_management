import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utilities/GenerateToken.js";

/**
 * @desc Auth user & set token
 * @route POST /api/user/auth
 * @access public
 */
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        $or: [
            { "personalInfo.E-mail personnel": email },
            { "personalInfo.E-mail professionnel": email }
        ]
    });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({ message: "User logged in." });
    } else {
        res.status(400);
        throw new Error("L'email ou le mot de passe est incorrect.");
    }
});

/**
 * @desc Logout user
 * @route POST /api/user/logout
 * @access public
 */
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt-token", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "User logged out." });
});

/**
 * @desc Get user profile
 * @route GET /api/user/profile
 * @access private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

/**
 * @desc Search for the profile of a user
 * @route GET /api/user/:name
 * @access private (Read-Only Admin and above only)
 */
export const searchForUser = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const user = await User.find({
        "otherInfo.fullName": { $regex: new RegExp(name, "i") }
    }).select("-password");

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
 * @access private (Admin and above only)
 */
export const adminCreateUser = asyncHandler(async (req, res) => {
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
    const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
    const jobs = req.body.jobs ? JSON.parse(req.body.jobs) : [];
    const defaultPassword = "anep1234";
    const fullName = name.trim() + " " + familyName.trim();
    const profilePicture =
        req.file?.path ?? "Backend/storage/avatar/default.jpg";

    const otherInfo = {
        userType:
            req.user.otherInfo.userType === 1 ? req.body.userType : undefined,
        fullName,
        profilePicture
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
    const history = {
        createdBy: {
            user_id: req.user._id,
            timestamp: new Date()
        }
    };

    const newUser = await User.create({
        password: defaultPassword,
        otherInfo,
        personalInfo,
        professionalInfo,
        skills,
        jobs,
        history
    });

    res.status(201).json({
        message:
            "Le profil de " +
            newUser.otherInfo.fullName +
            " a été créé avec succès.",
        data: newUser // delete
    });
});

/**
 * @desc Update an existed user by the admin
 * @route PUT & PATCH /api/user/admin
 * @access private (Admin and above only)
 */
export const adminUpdateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id).select("-password");

    if (user) {
        const {
            name,
            familyName,
            phone,
            personalEmail,
            proEmail,
            ...otherPersonalFields
        } = req.body.personalInfo ?? user.personalInfo;
        const {
            direction,
            category,
            formation,
            speciality,
            previousExp,
            anepExp,
            service,
            ...otherProFields
        } = req.body.professionalInfo ?? user.professionalInfo;
        const skills = req.body.skills ? JSON.parse(req.body.skills) : user.skills;
        const jobs = req.body.jobs ? JSON.parse(req.body.jobs) : user.jobs;
        const fullName = name.trim() + " " + familyName.trim();
        const profilePicture = req.file?.path ?? user.otherInfo.profilePicture;

        const otherInfo = {
            userType:
                req.user.otherInfo.userType === 1 && req.body.userType
                    ? req.body.userType
                    : user.otherInfo.userType,
            fullName,
            profilePicture
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

        user.otherInfo = otherInfo;
        user.personalInfo = personalInfo;
        user.professionalInfo = professionalInfo;
        user.skills = skills;
        user.jobs = jobs;
        user.history.updatedBy.push({
            user_id: req.user._id,
            timestamp: new Date()
        });

        const updatedUser = await user.save();

        res.status(200).json({
            message:
                "Le profil de " +
                updatedUser.otherInfo.fullName +
                " a été mis à jour avec succès.",
            data: updatedUser // delete
        });
    } else {
        res.status(404);
        throw new Error("Employé introuvable.");
    }
});

/**
 * @desc Delete an existed user by the admin
 * @route DELETE /api/user/admin
 * @access private (Super Admin only)
 */
export const adminDeleteUser = asyncHandler(async (req, res) => {

});
