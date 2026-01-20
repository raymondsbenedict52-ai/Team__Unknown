import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login-illustration.png";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // ✅ Save user + token
            login(data.token, data.user);

            navigate("/", { replace: true });
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display overflow-x-hidden">
            {/* ================= IMAGE SECTION ================= */}
            <div className="relative w-full h-[35vh] min-h-[260px] overflow-hidden">
                <img
                    src={loginImage}
                    alt="AI Healthcare Illustration"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-light dark:to-background-dark opacity-90" />

                {/* Logo */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/90 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-2xl">
                        health_and_safety
                    </span>
                    <span className="text-sm font-bold tracking-wide">MEDI-AI</span>
                </div>
            </div>

            {/* ================= LOGIN CARD ================= */}
            <div className="relative z-30 -mt-24 px-4 pb-10">
                <div className="bg-white dark:bg-[#1A2230] rounded-2xl shadow-xl max-w-md mx-auto p-6 border border-gray-100 dark:border-gray-800">
                    <div className="mb-6 text-center">
                        <h1 className="text-[28px] font-bold mb-2">Welcome Back</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Please sign in to your patient portal.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#101622] px-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium block mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#101622] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition active:scale-[0.98] disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Log In"}
                        </button>

                        {/* Register */}
                        <p className="text-sm text-center text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-primary font-bold hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>

                <p className="text-xs text-center text-gray-400 mt-6">
                    By logging in, you agree to our{" "}
                    <span className="underline cursor-pointer">Terms</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
}
