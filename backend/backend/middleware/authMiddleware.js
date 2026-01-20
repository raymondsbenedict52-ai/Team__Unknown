import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token, authorization denied",
            });
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Get user from DB (exclude password)
        const user = await User.findById(decoded.id).select("-passwordHash");
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // 4️⃣ Attach user to request
        req.user = user;

        next();
    } catch (err) {
        console.error("AUTH ERROR 👉", err);
        res.status(401).json({
            message: "Token is not valid",
        });
    }
};

export default authMiddleware;
