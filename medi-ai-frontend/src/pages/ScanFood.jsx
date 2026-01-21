import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScan } from "../context/ScanContext";
import { useAuth } from "../context/AuthContext";

export default function ScanFood() {
    const [foodName, setFoodName] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setScanResult } = useScan();

    const analyzeFood = async () => {
        console.log("Analyze clicked");

        if (!foodName.trim()) {
            alert("Enter a food name");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login again");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/ai/analyze-food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ foodName }),
            });

            console.log("Response status:", res.status);

            const data = await res.json();
            console.log("AI DATA:", data);

            if (!res.ok) {
                throw new Error(data.message || "Analysis failed");
            }

            setScanResult(data);

            console.log("Navigating to scan-result");
            navigate("/scan-result");

        } catch (err) {
            console.error("Analyze error:", err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };
    const { token } = useAuth();
    const [mealType, setMealType] = useState("Lunch");
    const logMeal = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login again");
            navigate("/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/meals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    food: foodName,
                    mealType,
                    eatenAt: new Date(),
                }),
            });

            if (!res.ok) throw new Error("Failed to log meal");

            console.log("✅ Meal logged:", foodName);
            alert("Successfully logged meal");
            //navigate("/daily");
        } catch (err) {
            console.error("Log meal error:", err);
            alert("Failed to log meal");
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-4">Scan New Food</h1>

                <input
                    type="text"
                    placeholder="e.g. grilled salmon salad"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <button
                    onClick={analyzeFood}
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold"
                >
                    {loading ? "Analyzing..." : "Analyze Food"}
                </button>
                {/* MEAL SELECTOR */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold mb-2">
                        Select Meal Type
                    </label>
                    <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                    </select>
                </div>

                {/* LOG MEAL BUTTON */}
                <button
                    onClick={logMeal}
                    className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl font-bold"
                >
                    Log Meal
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full mt-3 border border-gray-300 py-3 rounded-xl font-semibold"
                >
                    ← Return to Dashboard
                </button>

            </div>
        </div>
    );
}
