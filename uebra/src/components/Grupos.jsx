import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";
import "../css/Membros.css";

function Grupos() {
    const { perfil } = useAuth();
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        if (!perfil.aprovado) return;
        supabase
            .from("grupos")
            .select("*")
            .order("nome")
            .then(({ data }) => setGrupos(data ?? []));
    }, [perfil.aprovado]);

    if (!perfil.aprovado) {
        return (
            <div className="mb-page">
                <h1 className="mb-title">Grupos da comunidade</h1>
                <p className="mb-notice mb-notice-warn">
                    <i className="pi pi-lock"></i> Os links dos grupos são liberados depois que a
                    coordenação aprova o seu cadastro.
                </p>
            </div>
        );
    }

    return (
        <div className="mb-page">
            <h1 className="mb-title">Grupos da comunidade</h1>
            <p className="mb-subtitle">
                Entre nos grupos da sua universidade e do seu bairro. Não compartilhe estes links
                fora da comunidade.
            </p>

            {grupos.length === 0 && <p className="mb-subtitle">Nenhum grupo cadastrado ainda.</p>}

            <div className="grid">
                {grupos.map((g) => (
                    <div key={g.id} className="col-12 md:col-6">
                        <div className="mb-card mb-card-full">
                            <h2 className="mb-section-title">{g.nome}</h2>
                            <p className="mb-card-text">{g.descricao}</p>
                            <a
                                href={g.link}
                                target="_blank"
                                rel="noreferrer"
                                className="mb-btn mb-btn-inline"
                            >
                                Entrar no grupo <i className="pi pi-external-link"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Grupos;