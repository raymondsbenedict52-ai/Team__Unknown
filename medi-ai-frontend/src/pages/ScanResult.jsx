import { useNavigate } from "react-router-dom";
import { useScan } from "../context/ScanContext";

export default function ScanResult() {
    const { scanResult } = useScan();
    const actual = scanResult?.result;

    const navigate = useNavigate();

    if (!scanResult) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-lg font-semibold">No scan data found.</p>
                <button
                    onClick={() => navigate("/scan")}
                    className="text-primary underline mt-2"
                >
                    Scan again
                </button>
            </div>
        );
    }

    const {
        food,
        estimatedCalories,
        macros = {},
        medicalBenefits = [],
        medicalRisks = [],
        recommendedFor = [],
        avoidIf = [],
        doctorNotes,
        safety = {},
    } = actual;

    return (
        <div className="min-h-screen p-6 max-w-xl mx-auto space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold capitalize">{food}</h1>
                <p className="text-gray-500">
                    Estimated Calories: <b>{estimatedCalories ?? "—"} kcal</b>
                </p>
            </div>

            {/* MACROS */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Protein" value={`${macros.protein_g ?? "—"} g`} />
                <StatCard label="Carbs" value={`${macros.carbs_g ?? "—"} g`} />
                <StatCard label="Fat" value={`${macros.fat_g ?? "—"} g`} />
            </div>

            {/* SAFETY */}
            <Card title="Safety Scores">
                <p>Overall: <b>{safety.overall ?? "—"}/10</b></p>
                <p>Diabetes: <b>{safety.diabetes ?? "—"}/10</b></p>
                <p>Hypertension: <b>{safety.hypertension ?? "—"}/10</b></p>
            </Card>

            {/* BENEFITS */}
            {medicalBenefits.length > 0 && (
                <Card title="Medical Benefits">
                    <ul className="list-disc pl-5 space-y-1">
                        {medicalBenefits.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>
                </Card>
            )}

            {/* RISKS */}
            {medicalRisks.length > 0 && (
                <Card title="Medical Risks" danger>
                    <ul className="list-disc pl-5 space-y-1">
                        {medicalRisks.map((r, i) => (
                            <li key={i}>{r}</li>
                        ))}
                    </ul>
                </Card>
            )}

            {/* RECOMMENDED */}
            {recommendedFor.length > 0 && (
                <Card title="Recommended For">
                    <ul className="list-disc pl-5 space-y-1">
                        {recommendedFor.map((r, i) => (
                            <li key={i}>{r}</li>
                        ))}
                    </ul>
                </Card>
            )}

            {/* AVOID */}
            {avoidIf.length > 0 && (
                <Card title="Avoid If" danger>
                    <ul className="list-disc pl-5 space-y-1">
                        {avoidIf.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </Card>
            )}

            {/* DOCTOR NOTES */}
            {doctorNotes && (
                <Card title="Doctor’s Note">
                    <p className="text-gray-700">{doctorNotes}</p>
                </Card>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 pt-4">

                {/* 🔍 SAFETY ANALYSIS */}
                <button
                    onClick={() =>
                        navigate("/safety", {
                            state: {
                                foodName: scanResult.food || scanResult.result?.food
                            }
                        })
                    }
                    className="flex-1 border py-3 rounded-xl font-bold"
                >
                    Safety Analysis
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/scan")}
                        className="flex-1 bg-primary text-white py-3 rounded-xl font-bold"
                    >
                        Scan Again
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 border border-gray-300 py-3 rounded-xl font-bold"
                    >
                        Dashboard
                    </button>
                </div>
            </div>

        </div>
    );
}

/* ---------- UI HELPERS ---------- */

function Card({ title, children, danger }) {
    return (
        <div className={`bg-white rounded-xl shadow p-4 ${danger ? "border border-red-200" : ""}`}>
            <h3 className={`font-bold mb-2 ${danger ? "text-red-600" : ""}`}>
                {title}
            </h3>
            {children}
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-xl font-bold">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
        </div>
    );
}
