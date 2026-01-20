import express from "express";
import { analyzeFood,analyzeFoodSafety} from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze-food", authMiddleware, analyzeFood);
router.post("/safety-analysis", authMiddleware, analyzeFoodSafety);
export default router;
