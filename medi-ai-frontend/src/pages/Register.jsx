import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "Female",
        email: "",
        password: "",
        conditions: [],
        diet: "Vegetarian",
    });

    const toggleCondition = (c) => {
        setForm((prev) => ({
            ...prev,
            conditions: prev.conditions.includes(c)
                ? prev.conditions.filter((x) => x !== c)
                : [...prev.conditions, c],
        }));
    };

    const handleRegister = async () => {
        setLoading(true);

        try {
            const res = await API.post("/auth/register", {
                name: form.name,
                age: form.age,
                gender: form.gender,
                email: form.email,
                password: form.password,
                conditions: form.conditions,
                diet: form.diet,
            });

            // 🔐 Save token + user
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // 👉 Go to login (or dashboard if you prefer)
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b">
                <div className="flex items-center h-16 px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="flex-1 text-center font-bold text-lg pr-10">
                        Patient Registration
                    </h2>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 space-y-10">
                {/* PERSONAL DETAILS */}
                <section>
                    <h3 className="text-xl font-bold mb-4 text-center">
                        Personal Details
                    </h3>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 space-y-6 border">
                        <input
                            className="input"
                            placeholder="Full Name"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="number"
                                className="input text-center"
                                placeholder="Age"
                                onChange={(e) =>
                                    setForm({ ...form, age: e.target.value })
                                }
                            />

                            <div className="col-span-2 flex gap-3 bg-gray-100 dark:bg-slate-700 p-2 rounded-xl">
                                {["Female", "Male"].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setForm({ ...form, gender: g })}
                                        className={`flex-1 py-2 rounded-lg font-semibold transition ${
                                            form.gender === g
                                                ? "bg-white dark:bg-slate-900 text-primary shadow"
                                                : "text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-600"
                                        }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-2 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="input"
                                placeholder="name@example.com"
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-2 block">
                                Create Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input pr-12"
                                    placeholder="Create a strong password"
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MEDICAL HISTORY */}
                <section>
                    <h3 className="text-xl font-bold mb-4">
                        Medical History
                    </h3>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border space-y-4">
                        <p className="text-sm font-semibold">Existing Conditions</p>

                        <div className="flex flex-wrap gap-3">
                            {["Hypertension", "Diabetes", "Asthma", "Allergies"].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => toggleCondition(c)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                                        form.conditions.includes(c)
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-gray-100 dark:bg-slate-700 text-gray-500 hover:bg-gray-200"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* LIFESTYLE */}
                <section>
                    <h3 className="text-xl font-bold mb-4">Lifestyle</h3>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border">
                        <p className="text-sm font-semibold mb-4">
                            Dietary Preference
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {["No Restrictions", "Vegetarian", "Keto", "Pescatarian"].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setForm({ ...form, diet: d })}
                                    className={`p-4 rounded-xl text-sm font-semibold border transition ${
                                        form.diet === d
                                            ? "border-primary bg-blue-50 text-primary"
                                            : "bg-gray-100 dark:bg-slate-700 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* BOTTOM BAR */}
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t p-4">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Create Account →"}
                    </button>
                </div>
            </div>
        </div>
    );
}
