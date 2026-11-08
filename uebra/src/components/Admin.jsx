import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "../css/membros.css";

function Admin() {
    const [pendentes, setPendentes] = useState([]);
    const [events, setEvents] = useState([]);
    const [erro, setErro] = useState("");

    const carregar = async () => {
        const p = await supabase
            .from("perfis")
            .select("*")
            .eq("aprovado", false)
            .order("criado_em");
        const e = await supabase.from("eventos").select("*").order("data");
        setPendentes(p.data ?? []);
        setEvents(e.data ?? []);
    };

    useEffect(() => {
        carregar();
    }, []);

    const aprovar = async (id) => {
        const { error } = await supabase.rpc("aprovar_membro", { alvo: id });
        if (error) setErro("Não foi possível aprovar.");
        else carregar();
    };

    const criarEvento = async (e) => {
        e.preventDefault();
        setErro("");
        const form = e.target; // guarda antes do await
        const f = Object.fromEntries(new FormData(form));

        const { error } = await supabase.from("eventos").insert({
            titulo: f.titulo,
            data: f.data,
            horario: f.horario,
            local: f.local,
            descricao: f.descricao,
            tag: f.tag,
        });

        if (error) {
            setErro("Não foi possível criar o evento.");
        } else {
            form.reset();
            carregar();
        }
    };

    const apagarEvento = async (id) => {
        if (!window.confirm("Apagar este evento?")) return;
        await supabase.from("eventos").delete().eq("id", id);
        carregar();
    };

    return (
        <div className="mb-page">
            <h1 className="mb-title">Painel da coordenação</h1>
            <p className="mb-subtitle">Aprove cadastros e gerencie os eventos.</p>

            {erro && <p className="mb-error">{erro}</p>}

            {/* CADASTROS PENDENTES */}
            <h2 className="mb-section-title">Cadastros aguardando aprovação ({pendentes.length})</h2>
            <div className="mb-card">
                {pendentes.length === 0 && <p className="mb-card-text">Nenhum cadastro pendente.</p>}
                {pendentes.map((p) => (
                    <div key={p.id} className="mb-row">
                        <div>
                            <strong>{p.nome}</strong>
                            <p className="mb-card-text">
                                {p.email} · {p.universidade} · {p.curso}
                                {p.whatsapp ? ` · ${p.whatsapp}` : ""}
                            </p>
                        </div>
                        <button className="mb-btn mb-btn-small" onClick={() => aprovar(p.id)}>
                            Aprovar
                        </button>
                    </div>
                ))}
            </div>

            {/* NOVO EVENTO */}
            <h2 className="mb-section-title mb-space">Novo evento</h2>
            <form className="mb-card mb-form" onSubmit={criarEvento}>
                <div className="formgrid grid">
                    <div className="field col-12 sm:col-8">
                        <label htmlFor="titulo">Título</label>
                        <input id="titulo" name="titulo" className="mb-input" required />
                    </div>
                    <div className="field col-12 sm:col-4">
                        <label htmlFor="tag">Categoria</label>
                        <input
                            id="tag"
                            name="tag"
                            className="mb-input"
                            placeholder="Cultural, Apoio..."
                        />
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col-12 sm:col-4">
                        <label htmlFor="data">Data</label>
                        <input id="data" name="data" type="date" className="mb-input" required />
                    </div>
                    <div className="field col-12 sm:col-4">
                        <label htmlFor="horario">Horário</label>
                        <input id="horario" name="horario" className="mb-input" placeholder="18h00" />
                    </div>
                    <div className="field col-12 sm:col-4">
                        <label htmlFor="local">Local</label>
                        <input id="local" name="local" className="mb-input" />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" name="descricao" rows="3" className="mb-input"></textarea>
                </div>
                <button type="submit" className="mb-btn">
                    Criar evento
                </button>
            </form>

            {/* EVENTOS EXISTENTES */}
            <h2 className="mb-section-title mb-space">Eventos cadastrados</h2>
            <div className="mb-card">
                {events.length === 0 && <p className="mb-card-text">Nenhum evento cadastrado.</p>}
                {events.map((ev) => (
                    <div key={ev.id} className="mb-row">
                        <div>
                            <strong>{ev.titulo}</strong>
                            <p className="mb-card-text">
                                {ev.data} · {ev.horario} · {ev.local}
                            </p>
                        </div>
                        <button
                            className="mb-btn mb-btn-small mb-btn-danger"
                            onClick={() => apagarEvento(ev.id)}
                        >
                            Apagar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;