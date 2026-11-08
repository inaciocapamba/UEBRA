import { Navigate } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";

function RotaProtegida({ children, exigir }) {
    const { session, perfil, loading } = useAuth();

    if (loading || (session && !perfil)) {
        return <p className="mb-loading">Carregando...</p>;
    }
    if (!session) return <Navigate to="/entrar" />;
    if (exigir === "coordenacao" && perfil.papel !== "coordenacao") {
        return <Navigate to="/perfil" />;
    }
    return children;
}

export default RotaProtegida;