import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NutritionAnalysis() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-light font-display text-[#111318]">
            {/* Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl transition-transform
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-6 border-b">
                    <p className="font-bold text-lg">Alex Doe</p>
                    <p className="text-sm text-gray-500">Patient ID: #8492</p>
                </div>

                <nav className="p-4 space-y-2">
                    <NavItem icon="dashboard" label="Dashboard" onClick={() => navigate("/")} />
                    <NavItem icon="edit_note" label="Diet Log" onClick={() => navigate("/daily")} />
                    <NavItem icon="analytics" label="Analysis" active />
                    <NavItem icon="summarize" label="Reports" onClick={() => navigate("/trends")} />
                    <NavItem icon="settings" label="Settings" onClick={() => navigate("/profile")} />
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={() => navigate("/login")}
                        className="flex items-center gap-3 text-red-600 font-bold"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center justify-between">
                <button onClick={() => setDrawerOpen(true)}>
                    <span className="material-symbols-outlined">menu</span>
                </button>

                <h1 className="font-bold text-lg">Nutrition Analysis</h1>

                <button>
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>

            {/* Filters */}
            <div className="flex gap-3 px-4 py-3 overflow-x-auto">
                <FilterChip active label="Today" />
                <FilterChip label="Last 7 Days" />
                <FilterChip label="Custom" />
            </div>

            {/* Content */}
            <main className="px-4 pb-20 space-y-6">
                {/* Calories */}
                <section className="bg-white rounded-xl p-5 border">
                    <p className="text-xs uppercase text-gray-500 font-bold">Total Calories</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-extrabold">1,850</span>
                        <span className="text-gray-400">/ 2,200 kcal</span>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Consumed</span>
                            <span>84% of Goal</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-100 mt-1">
                            <div className="h-full bg-primary rounded-full w-[84%]" />
                        </div>
                    </div>
                </section>

                {/* Macronutrients */}
                <section>
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-lg">Macronutrients</h3>
                        <button
                            onClick={() => navigate("/absorption")}
                            className="text-primary font-semibold text-sm"
                        >
                            View Details
                        </button>
                    </div>

                    <div className="space-y-4">
                        <MacroCard label="Protein" value="120g" total="150g" percent={80} color="text-primary" />
                        <MacroCard label="Carbs" value="200g" total="250g" percent={80} color="text-teal-500" />
                        <MacroCard label="Fats" value="55g" total="70g" percent={78} color="text-orange-400" />
                    </div>
                </section>

                {/* Vitamins */}
                <section className="bg-white rounded-xl p-5 border space-y-5">
                    <Vitamin name="Vitamin C" percent={85} status="Optimal" color="bg-green-500" />
                    <Vitamin name="Iron" percent={40} status="Low" color="bg-yellow-500" />
                    <Vitamin name="Calcium" percent={95} status="Optimal" color="bg-green-500" />
                    <Vitamin name="Sodium" percent={110} status="High" color="bg-red-500" />
                </section>

                {/* Doctor Note */}
                <section className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              medical_services
            </span>
                        Doctor’s Note
                    </h3>
                    <p className="text-sm text-gray-600">
                        Good progress on calcium intake. However, iron levels are below
                        the target threshold. Consider adding leafy greens.
                    </p>
                    <button
                        onClick={() => navigate("/feedback")}
                        className="mt-3 text-primary font-bold text-sm"
                    >
                        See Diet Plan →
                    </button>
                </section>
            </main>
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function NavItem({ icon, label, active, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold cursor-pointer
      ${active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"}`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            {label}
        </div>
    );
}

function FilterChip({ label, active }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold shrink-0
      ${active ? "bg-primary text-white" : "bg-white border"}`}
        >
            {label}
        </button>
    );
}

function MacroCard({ label, value, total, percent, color }) {
    return (
        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
            <div className={`font-bold ${color}`}>{percent}%</div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-bold">
                    {value} <span className="text-gray-400">/ {total}</span>
                </p>
            </div>
        </div>
    );
}

function Vitamin({ name, percent, status, color }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <p className="font-bold">{name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white ${color}`}>
          {status}
        </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`${color} h-full`} style={{ width: `${Math.min(percent, 100)}%` }} />
            </div>
            <div className="text-xs text-gray-400 mt-1">{percent}%</div>
        </div>
    );
}
