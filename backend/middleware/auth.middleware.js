import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: "Token not there" });
        }
        try {
            const decoded = jwt.verify(
                accessToken,
                "fcvgbhjnmkedfgbhnjmkfgvbhnjmkdcfvgbhnjmk"
            );

            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }
            throw error;
        }
    } catch (error) {
        console.log("Error in protect middleware", error.message);
        return res.status(401).json({ message: "Unauthorized invalid access token", })
    }
};


export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        return res.status(401).json({ message: "Admin only access" });
    }
};