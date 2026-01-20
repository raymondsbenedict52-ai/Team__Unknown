import express from "express";
import {
    addWater,
    getTodayWater
} from "../controllers/water.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, addWater);
router.get("/today", authMiddleware, getTodayWater);

export default router;