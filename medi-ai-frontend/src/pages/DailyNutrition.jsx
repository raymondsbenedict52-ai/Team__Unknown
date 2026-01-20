import {
    Menu,
    Calendar,
    Plus,
    Edit,
    Flame,
    Utensils,
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CAL_LIMIT = 2000;

export default function DailyNutrition() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [meals, setMeals] = useState([]);
    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });

    const [chartData, setChartData] = useState([]);

    /* ================= FETCH DAILY ================= */
    const fetchDaily = async () => {
        const res = await fetch("http://localhost:5000/api/meals/daily", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setMeals(data.meals || []);

        // 🔥 calculate totals (frontend-safe)
        const total = data.meals.reduce(
            (acc, m) => {
                acc.calories += m.calories || 0;
                acc.protein += m.macros?.protein || 0;
                acc.carbs += m.macros?.carbs || 0;
                acc.fat += m.macros?.fat || 0;
                return acc;
            },
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );

        setTotals(total);

        // 📊 chart
        setChartData(
            data.meals.map((m) => ({
                time: new Date(m.eatenAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                calories: m.calories || 0,
                protein: m.macros?.protein || 0,
            }))
        );
    };

    useEffect(() => {
        fetchDaily();
    }, []);

    /* ================= DELETE MEAL ================= */
    const deleteMeal = async (mealId) => {
        await fetch(`http://localhost:5000/api/meals/${mealId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });

        // refresh UI
        fetchDaily();
    };

    const caloriePercent = Math.min(
        (totals.calories / CAL_LIMIT) * 100,
        100
    );

    return (
        <div className="min-h-screen bg-[#f6f8f7] flex justify-center">
            <div className="w-full max-w-md pb-28">

                {/* ================= HEADER ================= */}
                <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate("/")}>
                        <Menu size={20} />
                    </button>
                    <div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={14} />
                            Today
                        </p>
                        <h1 className="font-bold text-lg">Daily Nutrition</h1>
                    </div>
                </header>

                {/* ================= SUMMARY ================= */}
                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4">Daily Summary</h2>

                    <div className="bg-white rounded-xl p-5 shadow border mb-4">
                        <p className="text-xs uppercase text-gray-500 font-semibold">
                            Calories
                        </p>
                        <p className="text-3xl font-bold">
                            {totals.calories}
                            <span className="text-sm text-gray-500">
                                {" "} / {CAL_LIMIT} kcal
                            </span>
                        </p>

                        <div className="h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-green-400"
                                style={{ width: `${caloriePercent}%` }}
                            />
                        </div>

                        <p className="text-sm text-gray-500 text-right mt-1">
                            {CAL_LIMIT - totals.calories} kcal remaining
                        </p>
                    </div>

                    {/* MACROS */}
                    <div className="grid grid-cols-3 gap-3">
                        <MacroCard label="Protein" value={`${totals.protein}g`} />
                        <MacroCard label="Carbs" value={`${totals.carbs}g`} />
                        <MacroCard label="Fat" value={`${totals.fat}g`} />
                    </div>
                </section>

                {/* ================= TREND ================= */}
                <section className="px-4 mb-6">
                    <h2 className="text-xl font-bold mb-3">Today’s Trend</h2>

                    <div className="bg-white rounded-xl p-4 shadow border h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="calories"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="protein"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* ================= TIMELINE ================= */}
                <section className="px-4">
                    <h2 className="text-xl font-bold mb-4">Timeline</h2>

                    {meals.map((meal) => (
                        <TimelineItem
                            key={meal._id}
                            id={meal._id}
                            title={meal.mealType}
                            time={new Date(meal.eatenAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                            meal={meal.food}
                            kcal={`${meal.calories} kcal`}
                            tag={`${meal.macros?.protein || 0}g protein`}
                            onDelete={deleteMeal}
                        />
                    ))}
                </section>

                {/* ================= FLOAT BUTTON ================= */}
                <button
                    onClick={() => navigate("/scan")}
                    className="fixed bottom-20 right-4 bg-green-400 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                >
                    <Plus />
                    Log Meal
                </button>

                {/* ================= DASHBOARD BUTTON ================= */}
                <div className="px-4 mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full border border-gray-300 py-3 rounded-xl font-semibold"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
}

/* ================= COMPONENTS ================= */

function MacroCard({ label, value }) {
    return (
        <div className="bg-white rounded-xl p-4 text-center shadow border">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold">{value}</p>
        </div>
    );
}

function TimelineItem({ id, title, time, meal, kcal, tag, onDelete }) {
    return (
        <div className="flex gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border">
                <Utensils />
            </div>

            <div className="flex-1 bg-white p-4 rounded-xl border shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-gray-500 uppercase">
                            {title} • {time}
                        </p>
                        <h3 className="font-bold">{meal}</h3>
                        <p className="text-sm text-gray-500">
                            {kcal} • {tag}
                        </p>
                    </div>

                    <button onClick={() => onDelete(id)}>
                        <Edit className="text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}
