import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";
import "../css/Membros.css";

const universities = ["UERJ", "UFRJ", "UFF", "PUC-Rio", "UNIRIO", "IFRJ", "Outra"];

function Perfil() {
    const { perfil, recarregarPerfil } = useAuth();
    const [msg, setMsg] = useState("");
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setErro("");
        setSalvando(true);
        const f = Object.fromEntries(new FormData(e.target));

        const { error } = await supabase
            .from("perfis")
            .update({
                nome: f.nome,
                universidade: f.universidade,
                curso: f.curso,
                whatsapp: f.whatsapp,
            })
            .eq("id", perfil.id);

        setSalvando(false);
        if (error) {
            setErro("Não foi possível salvar. Tente de novo.");
        } else {
            setMsg("Dados atualizados!");
            recarregarPerfil();
        }
    };

    return (
        <div className="mb-page">
            <h1 className="mb-title">Meu perfil</h1>
            <p className="mb-subtitle">Mantenha seus dados atualizados.</p>

            {perfil.aprovado ? (
                <p className="mb-notice mb-notice-ok">
                    <i className="pi pi-check-circle"></i> Cadastro aprovado: você já pode ver
                    os grupos e confirmar presença nos eventos.
                </p>
            ) : (
                <p className="mb-notice mb-notice-warn">
                    <i className="pi pi-clock"></i> Seu cadastro está aguardando aprovação da
                    coordenação. Assim que for aprovado, a área de membros será liberada.
                </p>
            )}

            <form className="mb-card mb-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" className="mb-input" value={perfil.email} disabled />
                </div>

                <div className="field">
                    <label htmlFor="nome">Nome completo</label>
                    <input
                        id="nome"
                        name="nome"
                        className="mb-input"
                        defaultValue={perfil.nome}
                        required
                    />
                </div>

                <div className="formgrid grid">
                    <div className="field col-12 sm:col-6">
                        <label htmlFor="universidade">Universidade</label>
                        <select
                            id="universidade"
                            name="universidade"
                            className="mb-input"
                            defaultValue={perfil.universidade ?? ""}
                            required
                        >
                            <option value="">Selecione</option>
                            {universities.map((u) => (
                                <option key={u} value={u}>
                                    {u}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="field col-12 sm:col-6">
                        <label htmlFor="curso">Curso</label>
                        <input
                            id="curso"
                            name="curso"
                            className="mb-input"
                            defaultValue={perfil.curso ?? ""}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="whatsapp">WhatsApp (opcional)</label>
                    <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        className="mb-input"
                        defaultValue={perfil.whatsapp ?? ""}
                    />
                </div>

                {erro && <p className="mb-error">{erro}</p>}
                {msg && <p className="mb-success">{msg}</p>}

                <button type="submit" className="mb-btn" disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
            </form>
        </div>
    );
}

export default Perfil;