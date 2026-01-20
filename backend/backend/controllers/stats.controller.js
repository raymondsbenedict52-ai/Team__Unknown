// controllers/stats.controller.js
import Meal from "../models/Meal.js";

export const weeklyCalories = async (req, res) => {
    const data = await Meal.aggregate([
        { $match: { user: req.user._id } },
        {
            $group: {
                _id: { $dayOfWeek: "$eatenAt" },
                calories: { $sum: "$calories" },
            },
        },
    ]);

    res.json(data);
};
