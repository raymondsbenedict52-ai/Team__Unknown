import {
    ArrowLeft,
    Calendar,
    ThumbsUp,
    AlertTriangle,
    TrendingUp,
    ArrowRight,
    Edit3,
    Home,
    BarChart2,
    User,
    Droplet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DietFeedback() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f6f8f7] text-[#111814] flex justify-center">
            <div className="w-full max-w-md flex flex-col pb-24">

                {/* Header */}
                <header className="sticky top-0 z-20 bg-[#f6f8f7]/95 backdrop-blur p-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft />
                    </button>

                    <h1 className="font-bold text-lg">Diet Feedback</h1>

                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Calendar size={20} />
                    </button>
                </header>

                {/* Date */}
                <div className="px-4 py-2 flex justify-center">
                    <div className="px-4 py-2 bg-white rounded-full shadow border text-sm font-semibold">
                        Today, Oct 24
                    </div>
                </div>

                {/* Health Score */}
                <section className="px-4 py-4">
                    <div className="bg-gradient-to-b from-green-100 to-transparent border border-green-200 rounded-2xl p-6 text-center">
                        <div className="relative w-24 h-24 mx-auto">
                            <svg viewBox="0 0 36 36" className="-rotate-90">
                                <path
                                    d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#19e66f"
                                    strokeWidth="3"
                                    strokeDasharray="84,100"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold">
                                84
                            </div>
                        </div>

                        <p className="mt-2 font-bold text-green-600 text-sm uppercase">
                            Health Score
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Great job hitting your protein goals today, Sarah!
                        </p>
                    </div>
                </section>

                {/* What is Good */}
                <section className="px-4 pb-4">
                    <div className="bg-white rounded-xl p-5 shadow border">
                        <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
                            <ThumbsUp className="text-green-500" /> What is Good
                        </h2>

                        <ul className="space-y-3">
                            <li>
                                <p className="font-semibold text-sm">High fiber intake</p>
                                <p className="text-xs text-gray-500">
                                    Breakfast oats provided 40% of daily needs.
                                </p>
                            </li>
                            <li>
                                <p className="font-semibold text-sm">Perfect hydration</p>
                                <p className="text-xs text-gray-500">
                                    You drank 8 glasses of water today.
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* What is Risky */}
                <section className="px-4 pb-4">
                    <div className="bg-white rounded-xl p-5 shadow border">
                        <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
                            <AlertTriangle className="text-orange-500" /> What is Risky
                        </h2>

                        <div className="space-y-3">
                            <div className="bg-orange-50 p-3 rounded-lg">
                                <p className="font-semibold text-sm">Elevated Sodium</p>
                                <p className="text-xs text-gray-600">
                                    Dinner hit 120% of daily limit.
                                </p>
                            </div>

                            <div className="bg-orange-50 p-3 rounded-lg">
                                <p className="font-semibold text-sm">Processed Sugar</p>
                                <p className="text-xs text-gray-600">
                                    Snack contained 24g sugar.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Improve */}
                <section className="px-4 pb-4">
                    <div className="bg-white rounded-xl p-5 shadow border">
                        <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
                            <TrendingUp className="text-blue-500" /> How to Improve
                        </h2>

                        <ul className="divide-y">
                            <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-sm">
                                        Drink water before meals
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Helps digestion and fullness
                                    </p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </li>

                            <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-sm">
                                        Add leafy greens
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Boost iron & vitamin K
                                    </p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Healthy Substitutions */}
                <section className="px-4 pb-6">
                    <h2 className="font-bold text-lg mb-3">Healthy Substitutions</h2>

                    <div className="space-y-3">
                        <Sub from="Soda" to="Sparkling Water" />
                        <Sub from="Potato Chips" to="Popcorn" />
                    </div>
                </section>

                {/* CTA */}
                <div className="px-4 pb-6">
                    <button
                        onClick={() => navigate("/scan")}
                        className="w-full bg-green-500 hover:bg-green-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow"
                    >
                        <Edit3 /> Log Today’s Meal
                    </button>
                </div>

                {/* Bottom Nav */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex justify-between max-w-md mx-auto">
                    <NavItem icon={<Home />} label="Home" onClick={() => navigate("/")} />
                    <NavItem icon={<Droplet />} label="Feedback" active onClick={() => navigate("/feedback")} />
                    <NavItem icon={<BarChart2 />} label="Progress" onClick={() => navigate("/analysis")} />
                    <NavItem icon={<User />} label="Profile" onClick={() => navigate("/profile")} />
                </nav>
            </div>
        </div>
    );
}

/* ---------- Helpers ---------- */

function Sub({ from, to }) {
    return (
        <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{from}</span>
            <ArrowRight className="text-gray-400" size={16} />
            <span className="text-sm font-semibold">{to}</span>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 text-xs ${
                active ? "text-green-600 font-bold" : "text-gray-400"
            }`}
        >
            {icon}
            {label}
        </button>
    );
}
