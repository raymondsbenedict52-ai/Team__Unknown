import {
    Calendar,
    AlertTriangle,
    TrendingDown,
    MoreHorizontal,
    Plus,
    Droplet,
    Bolt,
    Egg,
} from "lucide-react";

export default function NutrientTrends() {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-16 bg-white border-r flex flex-col items-center py-6 gap-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    H
                </div>
                <nav className="flex flex-col gap-6 text-slate-500">
                    <span>▦</span>
                    <span className="text-blue-600">📈</span>
                    <span>🍽️</span>
                    <span>👤</span>
                </nav>
                <span className="mt-auto text-slate-400">⚙️</span>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0">
                    <div>
                        <p className="text-xs uppercase text-slate-400 font-semibold">
                            Health Analytics
                        </p>
                        <h1 className="text-xl font-bold">Nutrient Trends</h1>
                    </div>
                    <button className="p-2 rounded-lg border hover:bg-slate-100">
                        <Calendar size={18} />
                    </button>
                </header>

                {/* Tabs */}
                <div className="px-6 py-4 flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">
                        Weekly
                    </button>
                    <button className="px-4 py-2 bg-white border rounded-full text-sm">
                        Monthly
                    </button>
                    <button className="px-4 py-2 bg-white border rounded-full text-sm">
                        3 Months
                    </button>
                </div>

                {/* Alert Card */}
                <div className="px-6">
                    <div className="bg-white rounded-2xl border p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                <AlertTriangle />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold">Vitamin D Risk</h3>
                                <p className="text-sm text-slate-500">
                                    Levels are dropping below optimal range (30ng/mL).
                                    Consider sun exposure or D3 supplements.
                                </p>
                            </div>
                        </div>

                        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-xl font-semibold">
                            View Recommendation →
                        </button>
                    </div>
                </div>

                {/* Detailed Analysis */}
                <div className="px-6 mt-6">
                    <h2 className="text-lg font-bold mb-4">Detailed Analysis</h2>

                    <div className="bg-white rounded-2xl border p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs uppercase text-slate-400 font-semibold">
                                    Vitamin D
                                </p>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-3xl font-bold">22</h3>
                                    <span className="text-slate-400">ng/mL</span>
                                    <span className="flex items-center gap-1 text-amber-600 text-sm bg-amber-100 px-2 py-0.5 rounded">
                    <TrendingDown size={14} /> 5%
                  </span>
                                </div>
                            </div>
                            <button className="p-2 rounded hover:bg-slate-100">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        {/* Fake Chart */}
                        <div className="h-40 flex items-end gap-2">
                            {[60, 55, 50, 40, 65, 30, 45].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-blue-500/20 rounded-md relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute bottom-0 w-full bg-blue-600 rounded-md" style={{ height: "40%" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Nutrient Status */}
                <div className="px-6 mt-6 pb-24">
                    <h2 className="text-lg font-bold mb-4">Nutrient Status</h2>

                    {[
                        { icon: <Droplet />, name: "Iron", value: "14mg / 18mg", status: "Optimal" },
                        { icon: <Bolt />, name: "Magnesium", value: "310mg / 400mg", status: "Good" },
                        { icon: <Egg />, name: "Calcium", value: "1300mg / 1000mg", status: "Excess" },
                    ].map((n, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between bg-white p-4 rounded-xl border mb-3"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    {n.icon}
                                </div>
                                <div>
                                    <p className="font-bold">{n.name}</p>
                                    <p className="text-xs text-slate-500">{n.value}</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold">{n.status}</span>
                        </div>
                    ))}
                </div>

                {/* FAB */}
                <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Plus size={28} />
                </button>
            </main>
        </div>
    );
}
