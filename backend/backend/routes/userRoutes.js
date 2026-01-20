import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/user/me
 * @desc    Get logged-in user
 * @access  Private
 */
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route working ✅",
        user: req.user,
    });
});

export default router;
