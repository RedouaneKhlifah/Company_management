import fs from "fs";
import { body, validationResult } from "express-validator";

export const adminUpdateUserSkillsValidationRules = [
    body("skills")
        .notEmpty()
        .isJSON()
        .withMessage("Les compétences sont invalides."),
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
