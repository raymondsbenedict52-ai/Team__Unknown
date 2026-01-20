// controllers/meal.controller.js
import Meal from "../models/Meal.js";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
});

export const addMeal = async (req, res) => {
    try {
        const { food, mealType, eatenAt } = req.body;

        if (!food || !mealType) {
            return res.status(400).json({ message: "Food and meal type required" });
        }

        // 🔥 CALL AI HERE (NOT FRONTEND)
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a nutrition expert. Respond ONLY with raw JSON. No markdown.",
                },
                {
                    role: "user",
                    content: `
Analyze "${food}" and return JSON:

{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number
}
`,
                },
            ],
        });

        let raw = completion.choices[0].message.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const nutrition = JSON.parse(raw);

        // ✅ STORE FULLY ENRICHED MEAL
        const meal = await Meal.create({
            user: req.user.id,
            food,
            mealType,
            calories: nutrition.calories,
            macros: {
                protein: nutrition.protein,
                carbs: nutrition.carbs,
                fat: nutrition.fat,
            },
            eatenAt: eatenAt || new Date(),
        });

        console.log("✅ Meal logged with AI nutrition:", food);

        res.status(201).json(meal);
    } catch (err) {
        console.error("Add meal error:", err);
        res.status(500).json({ message: "Failed to log meal" });
    }
};


// GET TODAY MEALS
export const getTodayMeals = async (req, res) => {
    const userId = req.user.id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
        user: userId,
        eatenAt: { $gte: start, $lte: end },
    }).sort({ eatenAt: 1 });

    // 🔥 AGGREGATE TOTALS
    const totals = meals.reduce(
        (acc, meal) => {
            acc.calories += meal.calories || 0;
            acc.protein += meal.macros?.protein || 0;
            acc.carbs += meal.macros?.carbs || 0;
            acc.fat += meal.macros?.fat || 0;
            return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    res.json({ meals, totals });
};


// DELETE MEAL
export const deleteMeal = async (req, res) => {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
};
