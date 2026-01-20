import { useNavigate, useLocation } from "react-router-dom";

export default function ScanResult() {
    const navigate = useNavigate();
    const { state } = useLocation();

    // Get scanned image from ScanFood page
    const scannedImage = state?.image;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">

            {/* ================= HEADER ================= */}
            <header className="sticky top-0 z-50 flex items-center justify-between
                         bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
                         border-b px-4 py-3">
                <button
                    onClick={() => navigate(-1)}
                    className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800
                     flex items-center justify-center"
                >
          <span className="material-symbols-outlined text-2xl">
            arrow_back
          </span>
                </button>

                <h2 className="text-lg font-bold text-center flex-1">
                    Analysis Result
                </h2>

                <div className="size-10" />
            </header>

            {/* ================= CONTENT ================= */}
            <main className="max-w-md mx-auto p-4 pb-28 space-y-6">

                {/* ---------- SCANNED IMAGE ---------- */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-black">
                    {scannedImage ? (
                        <img
                            src={scannedImage}
                            alt="Scanned food"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                            No scanned image found
                        </div>
                    )}

                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60
                          backdrop-blur-sm px-3 py-1.5 rounded-full
                          flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm">
              photo_camera
            </span>
                        <span className="text-xs font-semibold">
              Scanned Image
            </span>
                    </div>
                </div>

                {/* ---------- RESULT CARD ---------- */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5
                        border shadow-sm space-y-4">

                    <div className="flex justify-between items-start gap-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Grilled Salmon Salad
                        </h1>
                        <button className="p-2 rounded-full text-primary hover:bg-primary/10">
              <span className="material-symbols-outlined text-xl">
                edit
              </span>
                        </button>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Detected from image analysis
                    </p>

                    {/* Confidence */}
                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 rounded-lg
                            bg-green-50 dark:bg-green-900/20
                            px-3 py-1.5 border">
              <span className="material-symbols-outlined text-green-600">
                check_circle
              </span>
                            <span className="text-xs font-bold text-green-800">
                98% MATCH
              </span>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-lg
                            bg-slate-50 dark:bg-slate-700
                            px-3 py-1.5 border">
              <span className="material-symbols-outlined text-slate-500">
                restaurant
              </span>
                            <span className="text-xs font-medium">
                Healthy Choice
              </span>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-700" />

                    {/* Analysis Details */}
                    <div>
                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                info
              </span>
                            Analysis Details
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            Our medical AI identified a grilled salmon fillet as the primary
                            protein source, accompanied by fresh vegetables. The preparation
                            appears low-oil and suitable for a cardiac-friendly diet.
                        </p>
                    </div>

                    {/* Nutrition */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg p-3 text-center bg-primary/5 border">
                            <div className="text-xs font-bold uppercase text-primary">
                                Protein
                            </div>
                            <div className="text-lg font-bold">High</div>
                        </div>

                        <div className="rounded-lg p-3 text-center bg-slate-50 dark:bg-slate-700 border">
                            <div className="text-xs font-bold uppercase text-slate-500">
                                Carbs
                            </div>
                            <div className="text-lg font-bold">Low</div>
                        </div>

                        <div className="rounded-lg p-3 text-center bg-slate-50 dark:bg-slate-700 border">
                            <div className="text-xs font-bold uppercase text-slate-500">
                                Fats
                            </div>
                            <div className="text-lg font-bold">Med</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ================= BOTTOM ACTION ================= */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900
                      border-t p-4 max-w-md mx-auto">
                <button
                    onClick={() => navigate("/portion")}
                    className="w-full py-4 rounded-xl bg-primary text-white
                     font-bold flex items-center justify-center gap-2
                     shadow-lg shadow-primary/20
                     active:scale-[0.98] transition"
                >
                    Proceed to Portion Estimation
                    <span className="material-symbols-outlined">
            arrow_forward
          </span>
                </button>
            </div>
        </div>
    );
}
