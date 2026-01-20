// routes/meal.routes.js
import express from "express";
import {
    addMeal,
    getTodayMeals,
    deleteMeal,
} from "../controllers/meal.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addMeal);
router.get("/daily", authMiddleware, getTodayMeals);
router.delete("/:id", authMiddleware, deleteMeal);

export default router;
