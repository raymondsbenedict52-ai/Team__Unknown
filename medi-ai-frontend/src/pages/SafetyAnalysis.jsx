import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SafetyAnalysis() {
    const navigate = useNavigate();
    const location = useLocation();

    const foodName = location.state?.foodName;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!foodName) {
            setError("No food provided");
            setLoading(false);
            return;
        }

        const fetchSafety = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(
                    "http://localhost:5000/api/ai/safety-analysis",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ foodName }),
                    }
                );

                const json = await res.json();

                if (!res.ok) {
                    throw new Error(json.message || "Failed to fetch safety");
                }

                setData(json.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSafety();
    }, [foodName]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold">Analyzing safety…</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-600 font-bold mb-2">
                    {error || "No data available"}
                </p>
                <button
                    onClick={() => navigate("/scan")}
                    className="text-primary underline"
                >
                    Scan again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold capitalize">
                        Safety Analysis – {data.food}
                    </h1>
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm underline"
                    >
                        Dashboard
                    </button>
                </div>

                {/* SCORE */}
                <div className="bg-white border rounded-xl p-6 shadow">
                    <p className="text-sm uppercase text-gray-500 font-bold">
                        Compatibility Score
                    </p>
                    <p className="text-4xl font-bold text-red-500">
                        {data.compatibilityScore}%
                    </p>
                </div>

                {/* CONDITIONS */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Medical Impact
                    </h2>

                    {data.conditions.length === 0 ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                            <p className="font-semibold text-green-700">
                                No significant medical risks identified.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.conditions.map((c, i) => (
                                <ConditionCard key={i} condition={c} />
                            ))}
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 pt-6">
                    <button
                        onClick={() => navigate("/scan")}
                        className="flex-1 bg-primary text-white py-3 rounded-xl font-bold"
                    >
                        Scan Another Food
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 border py-3 rounded-xl font-bold"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ================= CONDITION CARD ================= */

function ConditionCard({ condition }) {
    const colors = {
        SAFE: "bg-green-100 text-green-700",
        MODERATE: "bg-yellow-100 text-yellow-700",
        AVOID: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-white border rounded-xl p-5 shadow space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold">{condition.name}</h3>
                    <p className="text-sm text-gray-500">
                        {condition.category}
                    </p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                        colors[condition.status]
                    }`}
                >
                    {condition.status}
                </span>
            </div>

            <p className="text-gray-700 text-sm">
                {condition.description}
            </p>

            <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <b>Recommendation:</b> {condition.recommendation}
            </div>
        </div>
    );
}
