import multer from "multer";
import path from "path";
import { v1 as uuidv1 } from "uuid";

const avatarUpload = multer({
    limits: 2 * 1024 * 1024, // maximum of 2Mb
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "Backend/storage/avatar");
        },
        filename: (req, file, cb) => {
            cb(null, uuidv1() + path.extname(file.originalname));
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = new Set([".png", ".jpg", ".jpeg"]).has(
            path.extname(file.originalname)
        );
        const error = isValid
            ? null
            : new Error(
                "L'extension de fichier doit être '.png', '.jpg' ou '.jpeg'."
            );
        cb(error, isValid);
    }
});

export default avatarUpload;
