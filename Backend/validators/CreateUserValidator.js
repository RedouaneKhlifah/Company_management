import fs from "fs";
import { body, validationResult } from "express-validator";

export const adminCreateUserValidationRules = [
    body("personalInfo.name")
        .trim()
        .notEmpty()
        .withMessage("Ce champ ne peut pas être vide."),
    body("personalInfo.familyName")
        .trim()
        .notEmpty()
        .withMessage("Ce champ ne peut pas être vide."),
    body("personalInfo.*")
        .trim()
        .notEmpty()
        .withMessage("Ce champ ne peut pas être vide."),
    body("personalInfo.phone")
        .optional({ checkFalsy: true })
        .isMobilePhone(["ar-MA"])
        .withMessage("Le numéro de téléphone est invalide."),
    body("personalInfo.personalEmail")
        .isEmail()
        .withMessage("Le E-mail personnel est invalide."),
    body("personalInfo.proEmail")
        .isEmail()
        .withMessage("Le E-mail professionnel est invalide."),
    body("professionalInfo.*")
        .trim()
        .notEmpty()
        .withMessage("Ce champ ne peut pas être vide."),
    body("professionalInfo.previousExp")
        .isNumeric()
        .withMessage("L'expérience antérieure n'accepte que des chiffres."),
    body("professionalInfo.recDate")
        .isDate()
        .withMessage("La date de recrutement n'accepte qu'une date."),
    body("skills")
        .optional({ checkFalsy: true })
        .isJSON()
        .withMessage("Les compétences sont invalides."),
    body("jobs")
        .optional({ checkFalsy: true })
        .isJSON()
        .withMessage("Les emplois sont invalides."),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = {};

            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    err
                        ? console.log("Error occurred : " + err)
                        : console.log("File deleted due to an error.");
                });
            }

            errors.array().forEach((err) => {
                const keys = err.path.split(".");
                let current = extractedErrors;
                keys.forEach((key, index) => {
                    if (index === keys.length - 1) {
                        current[key] = err.msg;
                    } else {
                        current[key] = current[key] || {};
                        current = current[key];
                    }
                });
            });

            return res.status(422).json({ errors: extractedErrors });
        } else {
            next();
        }
    }
];
