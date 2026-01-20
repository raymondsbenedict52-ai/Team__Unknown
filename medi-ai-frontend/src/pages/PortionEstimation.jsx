import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function PortionEstimation() {
    const navigate = useNavigate();
    const { state } = useLocation();

    // 🔐 Guard: prevent direct access
    if (!state?.image) {
        return <Navigate to="/scan" replace />;
    }

    const scannedImage = state.image;

    const goTo = (path) => {
        navigate(path, {
            state: {
                image: scannedImage,
            },
        });
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
            {/* ================= HEADER ================= */}
            <header className="sticky top-0 z-20 bg-white dark:bg-background-dark border-b px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <h2 className="text-lg font-bold">Estimate Portion</h2>

                <button
                    onClick={() => navigate("/profile")}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <span className="material-symbols-outlined">account_circle</span>
                </button>
            </header>

            {/* ================= CONTENT ================= */}
            <main className="max-w-md mx-auto p-4 pb-28 space-y-6">
                {/* ---------- IMAGE CARD ---------- */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-black">
                    <img
                        src={scannedImage}
                        alt="Scanned food"
                        className="w-full h-full object-cover"
                    />

                    {/* Detection Box */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3/5 h-3/5 border-2 border-primary/70 rounded-lg bg-primary/10 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Detected
                            </div>
                        </div>
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-xl font-bold">
                            Grilled Salmon
                        </p>
                        <div className="flex items-center gap-1 text-sm text-green-400">
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>
                            98% Confidence
                        </div>
                    </div>
                </div>

                {/* ---------- WEIGHT ---------- */}
                <div className="text-center">
                    <p className="text-slate-500 text-sm uppercase tracking-wide">
                        Estimated Weight
                    </p>
                    <h1 className="text-5xl font-bold">
                        185<span className="text-2xl text-slate-400 ml-1">g</span>
                    </h1>
                </div>

                {/* ---------- SLIDER ---------- */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border">
                    <div className="flex justify-between mb-4">
                        <span className="font-bold text-sm">Adjust Portion Size</span>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
              Medium
            </span>
                    </div>

                    <input type="range" min="0" max="100" defaultValue="50" className="w-full" />

                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>S</span>
                        <span>M</span>
                        <span>L</span>
                    </div>
                </div>

                {/* ---------- NUTRITION ---------- */}
                <div className="grid grid-cols-3 gap-3">
                    <Stat icon="local_fire_department" value="350" label="Kcal" color="text-orange-500" />
                    <Stat icon="fitness_center" value="25g" label="Protein" color="text-blue-500" />
                    <Stat icon="bakery_dining" value="0g" label="Carbs" color="text-yellow-500" />
                </div>
            </main>

            {/* ================= ACTIONS ================= */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t p-4 max-w-md mx-auto">
                <button
                    onClick={() => goTo("/analysis")}
                    className="w-full h-14 bg-primary hover:bg-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined">check</span>
                    Confirm Portion
                </button>

                <button
                    onClick={() => navigate("/scan")}
                    className="w-full mt-3 text-sm font-semibold text-slate-500 hover:text-primary flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Not correct? Edit Food
                </button>
            </div>
        </div>
    );
}

/* ---------- Small reusable stat card ---------- */
function Stat({ icon, value, label, color }) {
    return (
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border flex flex-col items-center gap-1">
      <span className={`material-symbols-outlined ${color}`}>
        {icon}
      </span>
            <p className="font-bold text-lg">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
        </div>
    );
}
