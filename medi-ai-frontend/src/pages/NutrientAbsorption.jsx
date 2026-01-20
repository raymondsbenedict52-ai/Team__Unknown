import React from "react";
import {
    Info,
    CheckCircle,
    Lightbulb,
    Droplet,
    Clock,
    Plus,
} from "lucide-react";

export default function NutrientAbsorption() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111318] dark:text-white flex">
            {/* Sidebar */}
            <aside className="w-20 bg-white dark:bg-[#1A202C] border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-6 justify-between">
                <div className="flex flex-col items-center gap-8">
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                    <nav className="flex flex-col gap-6">
            <span className="material-symbols-outlined text-gray-400">
              home
            </span>
                        <span className="material-symbols-outlined text-primary">
              nutrition
            </span>
                        <span className="material-symbols-outlined text-gray-400">
              warning
            </span>
                        <span className="material-symbols-outlined text-gray-400">
              person
            </span>
                    </nav>
                </div>
                <span className="material-symbols-outlined text-gray-400">
          settings
        </span>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 bg-white dark:bg-[#1A202C] px-6 py-4 shadow-sm flex justify-between items-center">
                    <h1 className="text-xl font-bold">Nutrient Absorption</h1>
                    <Info className="text-gray-400" />
                </header>

                {/* Meta */}
                <div className="px-6 pt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs bg-white dark:bg-white/5 border px-3 py-1 rounded-full">
                        <CheckCircle className="text-green-500 w-4 h-4" />
                        Based on today’s logs
                    </div>
                    <button className="text-primary font-semibold text-sm">
                        View Log
                    </button>
                </div>

                {/* Overall Score */}
                <section className="px-6 mt-6">
                    <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                        <p className="text-sm opacity-80">Overall Bioavailability</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-extrabold">64%</span>
                            <span className="text-sm opacity-80 mb-1">
                Efficiency Score
              </span>
                        </div>
                        <div className="mt-4 h-2 bg-black/20 rounded-full">
                            <div className="h-2 bg-white rounded-full w-[64%]" />
                        </div>
                        <p className="mt-3 text-xs opacity-80">
                            Optimization suggested for Iron and Calcium.
                        </p>
                    </div>
                </section>

                {/* Breakdown */}
                <section className="px-6 mt-8 space-y-6">
                    <h2 className="text-lg font-bold">Nutrient Breakdown</h2>

                    {/* Iron */}
                    <div className="bg-white dark:bg-[#1A202C] rounded-2xl p-5 border shadow-sm">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold">Iron (Fe)</h3>
                                <p className="text-xs text-amber-500 font-bold">
                                    Low Absorption Detected
                                </p>
                            </div>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                18mg Total
              </span>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex justify-between text-xs">
                                    <span>Raw Intake</span>
                                    <span>18.0 mg</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-bold text-primary">
                                    <span>Net Absorbed</span>
                                    <span>1.2 mg (7%)</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                                    <div className="h-3 bg-amber-500 rounded-full w-[7%]" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex gap-2 text-xs text-gray-500">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            Coffee with meals may reduce iron absorption.
                        </div>
                    </div>

                    {/* Calcium */}
                    <div className="bg-white dark:bg-[#1A202C] rounded-2xl p-5 border shadow-sm">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold">Calcium</h3>
                                <p className="text-xs text-green-500 font-bold">
                                    Optimal Absorption
                                </p>
                            </div>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                1000mg Total
              </span>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex justify-between text-xs">
                                    <span>Raw Intake</span>
                                    <span>1000 mg</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-bold text-primary">
                                    <span>Net Absorbed</span>
                                    <span>320 mg (32%)</span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                                    <div className="h-3 bg-green-500 rounded-full w-[32%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Suggestions */}
                <section className="px-6 mt-8 space-y-4">
                    <h2 className="text-lg font-bold">Optimization Suggestions</h2>

                    <Suggestion
                        icon={<Lightbulb />}
                        title="Boost Iron Uptake"
                        text="Pair meals with Vitamin C-rich foods."
                    />
                    <Suggestion
                        icon={<Clock />}
                        title="Timing Matters"
                        text="Separate Magnesium and Calcium intake."
                    />
                    <Suggestion
                        icon={<Droplet />}
                        title="Fat Soluble Vitamins"
                        text="Consume healthy fats with Vitamin D."
                    />
                </section>

                <div className="h-24" />
            </main>

            {/* FAB */}
            <button className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                <Plus />
            </button>
        </div>
    );
}

function Suggestion({ icon, title, text }) {
    return (
        <div className="flex gap-4 bg-blue-50 dark:bg-blue-900/10 border rounded-2xl p-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-blue-900/30 text-primary">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-sm">{title}</h4>
                <p className="text-xs text-gray-500">{text}</p>
            </div>
        </div>
    );
}
