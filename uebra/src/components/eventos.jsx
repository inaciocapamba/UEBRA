import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";
import "../css/eventos.css";

const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

function Eventos() {
    const { perfil } = useAuth(); // vale null para visitantes
    const [events, setEvents] = useState([]);
    const [indo, setIndo] = useState([]); // ids dos eventos que a pessoa vai

    // Busca os eventos de hoje em diante, em ordem de data
    useEffect(() => {
        const hoje = new Date().toISOString().slice(0, 10);
        supabase
            .from("eventos")
            .select("*")
            .gte("data", hoje)
            .order("data")
            .then(({ data }) => setEvents(data ?? []));
    }, []);

    // Busca em quais eventos esta pessoa já confirmou
    useEffect(() => {
        if (!perfil) return;
        supabase
            .from("confirmacoes")
            .select("evento_id")
            .eq("usuario_id", perfil.id)
            .then(({ data }) => setIndo((data ?? []).map((c) => c.evento_id)));
    }, [perfil]);

    const alternarPresenca = async (eventoId) => {
        if (indo.includes(eventoId)) {
            await supabase
                .from("confirmacoes")
                .delete()
                .eq("evento_id", eventoId)
                .eq("usuario_id", perfil.id);
            setIndo(indo.filter((id) => id !== eventoId));
        } else {
            const { error } = await supabase
                .from("confirmacoes")
                .insert({ evento_id: eventoId, usuario_id: perfil.id });
            if (!error) setIndo([...indo, eventoId]);
        }
    };

    return (
        <>
            {/* HERO */}
            <section className="eventos-hero">
                <div className="eventos-container eventos-hero-content">
                    <h1 className="eventos-title">
                        Eventos & <span className="eventos-gradient">Encontros</span>
                    </h1>
                    <p className="eventos-subtitle">
                        Cultura, amizade e celebração: confira a agenda da nossa
                        comunidade.
                    </p>
                </div>
            </section>

            <section className="eventos-container eventos-body">
                {/* LISTA DE EVENTOS */}
                <div className="grid">
                    {events.length === 0 && (
                        <p className="eventos-card-text col-12">
                            Nenhum evento marcado por enquanto.
                        </p>
                    )}

                    {events.map((event) => (
                        <div key={event.id} className="col-12 md:col-6">
                            <article className="eventos-card flex gap-4">
                                {/* Data: "2026-11-11" vira dia 11 e mês NOV */}
                                <div className="eventos-date flex flex-column align-items-center justify-content-center">
                                    <span className="eventos-date-day">
                                        {event.data.slice(8, 10)}
                                    </span>
                                    <span className="eventos-date-month">
                                        {MESES[Number(event.data.slice(5, 7)) - 1]}
                                    </span>
                                </div>

                                {/* Informações */}
                                <div className="eventos-info">
                                    <span className="eventos-tag">{event.tag}</span>
                                    <h2 className="eventos-card-title">{event.titulo}</h2>
                                    <p className="eventos-card-text">{event.descricao}</p>
                                    <div className="eventos-meta flex flex-wrap gap-3">
                                        <span className="flex align-items-center gap-1">
                                            <i className="pi pi-map-marker"></i>
                                            {event.local}
                                        </span>
                                        <span className="flex align-items-center gap-1">
                                            <i className="pi pi-clock"></i>
                                            {event.horario}
                                        </span>
                                    </div>

                                    {/* Botão só para membros aprovados */}
                                    {perfil?.aprovado && (
                                        <button
                                            className={`eventos-presenca ${indo.includes(event.id) ? "ativo" : ""}`}
                                            onClick={() => alternarPresenca(event.id)}
                                        >
                                            <i className="pi pi-check"></i>
                                            {indo.includes(event.id) ? "Eu vou" : "Confirmar presença"}
                                        </button>
                                    )}
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                {/* CHAMADA FINAL */}
                <div className="eventos-cta text-center">
                    <i className="pi pi-calendar eventos-cta-icon"></i>
                    <h2 className="eventos-cta-title">Não perca nenhum evento</h2>
                    <p className="eventos-cta-text">
                        Cadastre-se para receber a agenda mensal e os convites
                        exclusivos da comunidade.
                    </p>
                    <Link to="/cadastro" className="eventos-btn">
                        Receber convites
                        <i className="pi pi-arrow-right"></i>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Eventos;