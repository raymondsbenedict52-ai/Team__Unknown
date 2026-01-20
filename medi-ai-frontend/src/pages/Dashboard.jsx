import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useScan } from "../context/ScanContext";
import { Droplet, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const WATER_GOAL = 2000; // ml
const WATER_STEP = 250; // ml per click

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { scanResult } = useScan();
    const actual = scanResult?.result;

    /* ================= WATER INTAKE ================= */
    const todayKey = `water-${new Date().toISOString().split("T")[0]}`;
    const [water, setWater] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(todayKey);
        if (saved) setWater(Number(saved));
    }, []);

    const addWater = () => {
        const updated = Math.min(water + WATER_STEP, WATER_GOAL);
        setWater(updated);
        localStorage.setItem(todayKey, updated);
    };

    const waterPercent = Math.min((water / WATER_GOAL) * 100, 100);

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen p-6 max-w-xl mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Good morning, {user?.name}
                    </h1>
                    <p className="text-gray-500">
                        Your health dashboard
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-red-600 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50"
                >
                    Logout
                </button>
            </div>

            {/* LAST SCAN */}
            {scanResult ? (
                <div className="bg-white rounded-2xl shadow p-5 mb-6">
                    <h2 className="text-lg font-bold mb-2">
                        Last Scan: {actual.food}
                    </h2>

                    <p className="text-sm mb-3">
                        Calories: <b>{actual.estimatedCalories} kcal</b>
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div className="bg-white rounded-xl shadow p-4">
                            <p className="text-xl font-bold">
                                {actual?.macros?.protein_g ?? "—"} g
                            </p>
                            <p className="text-gray-500">Protein</p>
                        </div>

                        <div className="bg-white rounded-xl shadow p-4">
                            <p className="text-xl font-bold">
                                {actual?.macros?.carbs_g ?? "—"} g
                            </p>
                            <p className="text-gray-500">Carbs</p>
                        </div>

                        <div className="bg-white rounded-xl shadow p-4">
                            <p className="text-xl font-bold">
                                {actual?.macros?.fat_g ?? "—"} g
                            </p>
                            <p className="text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow p-5 mb-6 text-center">
                    <p className="text-gray-600">
                        No scans yet. Scan your first meal.
                    </p>
                </div>
            )}

            {/* 🟦 WATER INTAKE (NEW) */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 text-white p-3 rounded-xl">
                            <Droplet />
                        </div>
                        <div>
                            <p className="font-bold">Water Intake</p>
                            <p className="text-sm text-gray-600">
                                {water} ml / {WATER_GOAL} ml
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={addWater}
                        className="bg-white border p-2 rounded-lg hover:bg-blue-100"
                    >
                        <Plus />
                    </button>
                </div>

                <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${waterPercent}%` }}
                    />
                </div>
            </div>

            {/* DAILY NUTRITION */}
            <div
                onClick={() => navigate("/daily")}
                className="cursor-pointer mb-6 rounded-2xl bg-white border p-5 hover:shadow-lg transition"
            >
                <h3 className="text-xl font-bold mb-2">
                    Daily Nutrition
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    View today’s meals, calories, and macros logged.
                </p>

                <button className="bg-green-500 text-white px-6 py-2.5 rounded-lg font-bold">
                    View Today
                </button>
            </div>

            {/* CTA */}
            <button
                onClick={() => navigate("/scan")}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold"
            >
                Scan New Food
            </button>
        </div>
    );
}
