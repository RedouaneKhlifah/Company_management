import { body, validationResult } from "express-validator";

export const resetPasswordValirationRules = [
    body("password")
        .notEmpty()
        .withMessage("Le mot de passe ne peut pas être vide.")
        .bail()
        .custom(value => {
            let error = false;
            const message = [];

            if (value.length < 8) {
                error = true;
                message.push("Comporter au moins 8 caractères.");
            }

            if (value.length > 36) {
                error = true;
                message.push("Comporter au maximum 36 caractères.");
            }

            if (!/[A-Z]/.test(value)) {
                error = true;
                message.push("Contenir au moins une lettre majuscule.");
            }

            if (!/[a-z]/.test(value)) {
                error = true;
                message.push("Contenir au moins une lettre minuscule.");
            }

            if (!/[0-9]/.test(value)) {
                error = true;
                message.push("Contenir au moins un chiffre.");
            }

            if (!/[^A-Za-z0-9]/.test(value)) {
                error = true;
                message.push("Contenir au moins un caractère spécial.");
            }

            if (/\s/.test(value)) {
                error = true;
                message.push("Être sans espace.");
            }

            if (error) {
                throw new Error(message);
            }

            return true;
        }),
    body("confirm-password")
        .notEmpty()
        .withMessage("Confirmation du mot de passe ne peut pas être vide.")
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Les mots de passe ne correspondent pas.");
            }

            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = {};

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

            console.log({ errors: extractedErrors });
            // return res.status(422).json({ errors: extractedErrors });
            return res.render("ResetPassword", { errors: extractedErrors });
        } else {
            next();
        }
    }

];
