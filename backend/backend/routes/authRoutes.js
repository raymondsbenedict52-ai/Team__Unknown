import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 */
router.post("/register", async (req, res) => {
    try {
        const { name, age, gender, email, password, conditions, diet } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required",
            });
        }

        // 2️⃣ Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3️⃣ Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // 4️⃣ Save user (MATCH THE SCHEMA)
        const user = await User.create({
            name,
            age,
            gender,
            email,
            passwordHash, // ✅ FIXED
            medicalConditions: conditions || [],
            dietPreference: diet,
        });

        // 5️⃣ Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 6️⃣ Response
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error("REGISTER ERROR 👉", err);
        res.status(500).json({ message: "Server error" });
    }
});
/**
 * @route   POST /api/auth/login
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // 4️⃣ Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5️⃣ Send response
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error("LOGIN ERROR 👉", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
