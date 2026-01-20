import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomeRedirect() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />;
}
