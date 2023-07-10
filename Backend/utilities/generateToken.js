import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SERCRET, {
        expiresIn: "1d"
    });

    res.cookie("jwt-token", token, {
        httpOnly: true, // The cookie cannot be accessed by client-side JavaScript.
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 24 * 3600 * 1000 // Expiration time in milliseconds
    });
};

export default generateToken;
