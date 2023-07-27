import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utilities/GenerateToken.js";
import generateTempToken from "../utilities/GenerateTempToken.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
        res.status(200).json({ message: "You have logged in successfully." });
    } else {
        res.status(400);
        throw new Error("L'e-mail ou le mot de passe est incorrect.");
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

    res.status(200).json({ message: "You have logged out successfully." });
});

/**
 * @desc Forgot password
 * @route POST /api/user/forgot-password
 * @access public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
        $or: [
            { "personalInfo.E-mail personnel": email },
            { "personalInfo.E-mail professionnel": email }
        ]
    });

    if (user) {
        const port = process.env.PORT;
        const token = generateTempToken(email, user._id);
        const link = `${req.protocol}://${req.hostname}${
            port ? ":" + port : ""
        }/api/user/reset-password/${email}/${user._id}/${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "noreply.anep@gmail.com",
                pass: "iefedokuknbvbzbr"
            }
        });

        const mailOptions = {
            from: "ANEP <noreply.anep@gmail.com>",
            to: email,
            subject: "Réinitialisez votre mot de passe sur ANEP.",
            html: `
                <p>Bonjour <b>${user.otherInfo.fullName},</b></p>
                <p>Vous trouverez ci-dessous le lien pour réinitialiser votre mot de passe. Veuillez noter que le lien expirera dans 30 minutes. <b>NE PARTAGEZ PAS LE LIEN AVEC QUICONQUE</b></p>
                <br>
                <a href="${link}">Réinitialiser votre mot de passe</a>
                `
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.status(200).json({ message: "Email envoyé avec succès à votre adresse e-mail. Vérifiez votre boîte de réception." });
    } else {
        res.status(400);
        throw new Error("L'e-mail est incorrect.");
    }
});

/**
 * @desc View to reset password
 * @route GET /api/user/reset-password/:email/:id/:token
 * @access public
 */
export const resetPasswordView = asyncHandler(async (req, res) => {
    const { email, id, token } = req.params;
    const user = await User.findOne({ _id: id });

    if (
        !user ||
        (user.personalInfo["E-mail personnel"] !== email &&
            user.personalInfo["E-mail professionnel"] !== email)
    ) {
        return res.render("Error", {
            message: "Une erreur s'est produite, le lien est invalide."
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);

        res.render("ResetPassword", { errors: null });
    } catch (error) {
        return res.render("Error", {
            message:
                "Votre lien est invalide ou a expiré. Veuillez générer un nouveau lien.",
            error
        });
    }
});

/**
 * @desc Reseting the password
 * @route POST /api/user/reset-password/:email/:id/:token
 * @access public
 */
export const resetPassword = asyncHandler(async (req, res) => {
    const { email, id, token } = req.params;
    const { password } = req.body;
    const user = await User.findById(id);

    if (
        !user ||
        (user.personalInfo["E-mail personnel"] !== email &&
            user.personalInfo["E-mail professionnel"] !== email)
    ) {
        return res.render("Error", {
            message: "Une erreur s'est produite, le lien est invalide."
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);

        user.password = password;
        await user.save();

        res.render("Success", {
            message: "Votre mot de passe a été mis à jour avec succès."
        });
    } catch (error) {
        return res.render("Error", {
            message:
                "Une erreur s'est produite. Essayez de générer un nouveau lien.",
            error
        });
    }
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
    const fullName = name.trim() + " " + familyName.trim();
    const profilePicture =
        req.file?.path ?? "Backend/storage/avatar/default.jpg";
    const defaultPassword = "anep1234";

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
 * @route PUT & PATCH /api/user/admin/:id
 * @access private (Admin and above only)
 */
export const adminUpdateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

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
        const skills = req.body.skills
            ? JSON.parse(req.body.skills)
            : user.skills;
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
 * @route DELETE /api/user/admin/:id
 * @access private (Super Admin only)
 */
export const adminDeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        const fullName = user.otherInfo.fullName;

        await User.deleteOne({ _id: req.params.id });

        res.status(200).json({
            message: "Le profil de " + fullName + " a été supprimé avec succès."
        });
    } else {
        res.status(404);
        throw new Error("Employé introuvable.");
    }
});
