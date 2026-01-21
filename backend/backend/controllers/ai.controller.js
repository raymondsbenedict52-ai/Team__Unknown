import Groq from "groq-sdk";

const groq = new Groq({
    apiKey:"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",
});

export const analyzeFood = async (req, res) => {
    try {
        const { foodName } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // ✅ ACTIVE MODEL
            messages: [
                {
                    role: "system",
                    content: "You are a medical nutrition expert. Respond ONLY in raw JSON. No markdown. No backticks."
                },
                {
                    role: "user",
                    content: `
Analyze the food "${foodName}" and return JSON with:
food, estimatedCalories,
macros { protein_g, carbs_g, fat_g },
medicalBenefits (array),
medicalRisks (array),
recommendedFor (array),
avoidIf (array),
doctorNotes,
safety { overall, diabetes, hypertension }
`
                }
            ],
            temperature: 0.3,
        });

        let raw = completion.choices[0].message.content;

        // 🛑 SAFETY CLEANING
        raw = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            console.error("❌ AI RAW OUTPUT:", raw);
            return res.status(500).json({
                message: "AI returned invalid JSON",
                rawOutput: raw,
            });
        }

        res.json({ result: parsed });

    } catch (err) {
        console.error("AI error:", err);
        res.status(500).json({ message: "AI analysis failed" });
    }
};
export const analyzeFoodSafety = async (req, res) => {
    try {
        const { foodName } = req.body;

        if (!foodName) {
            return res.status(400).json({ message: "Food name is required" });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // ✅ ACTIVE
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content: `
You are a clinical nutrition and disease-risk expert.

RULES:
- Respond ONLY with raw JSON
- No markdown
- No backticks
- No explanations
- No extra text

If no disease risk exists, return an empty array for "conditions".
`,
                },
                {
                    role: "user",
                    content: `
Analyze "${foodName}" and return JSON in EXACT format:

{
  "food": string,
  "compatibilityScore": number (0-100),
  "conditions": [
    {
      "name": string,
      "category": string,
      "status": "SAFE" | "MODERATE" | "AVOID",
      "description": string,
      "recommendation": string
    }
  ]
}

Only include conditions that are medically relevant.
Do NOT invent rare diseases.
`,
                },
            ],
        });

        let raw = completion.choices[0].message.content;

        // 🧹 CLEAN AI OUTPUT
        raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            console.error("❌ SAFETY AI RAW OUTPUT:", raw);
            return res.status(500).json({
                message: "Invalid AI JSON",
                rawOutput: raw,
            });
        }

        return res.json({ result: parsed });

    } catch (err) {
        console.error("❌ Safety AI error:", err);
        return res.status(500).json({
            message: "Safety analysis failed",
        });
    }
};