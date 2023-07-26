import jwt from "jsonwebtoken";

const generateTempToken = (email, id) => {
    const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
        expiresIn: "30m"
    });

    return token;
};

export default generateTempToken;
