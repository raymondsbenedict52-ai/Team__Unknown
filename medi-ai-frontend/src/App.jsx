import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DailyNutrition from "./pages/DailyNutrition";
import ScanFood from "./pages/ScanFood";
import ScanResult from "./pages/ScanResult";
import SafetyAnalysis from "./pages/SafetyAnalysis";
import ProfileSettings from "./pages/ProfileSettings";

export default function App() {
    return (

            <Routes>
                {/* Public */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/daily"
                    element={
                        <ProtectedRoute>
                            <DailyNutrition />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scan"
                    element={
                        <ProtectedRoute>
                            <ScanFood />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scan-result"
                    element={
                        <ProtectedRoute>
                            <ScanResult />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/safety"
                    element={
                        <ProtectedRoute>
                            <SafetyAnalysis />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfileSettings />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

    );
}
