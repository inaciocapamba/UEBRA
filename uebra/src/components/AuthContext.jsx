import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    // Descobre se já existe um login (e acompanha entradas e saídas)
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            if (!data.session) setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            if (!newSession) {
                setPerfil(null);
                setLoading(false);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    // Quando há login, busca o perfil dessa pessoa
    useEffect(() => {
        if (!session) return;
        carregarPerfil(session.user.id);
    }, [session]);

    const carregarPerfil = async (userId) => {
        const { data } = await supabase.from("perfis").select("*").eq("id", userId).single();
        setPerfil(data);
        setLoading(false);
    };

    const recarregarPerfil = () => session && carregarPerfil(session.user.id);
    const sair = () => supabase.auth.signOut();

    return (
        <AuthContext.Provider value={{ session, perfil, loading, recarregarPerfil, sair }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}