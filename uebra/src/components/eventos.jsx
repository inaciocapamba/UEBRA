import { Link } from "@tanstack/react-router";
import "../css/eventos.css";

const events = [
    {
        date: "11 NOV",
        title: "Festa da Independência de Angola",
        location: "Centro Cultural — Centro, Rio de Janeiro",
        time: "18h00",
        description:
            "Celebração do 11 de Novembro com música ao vivo, gastronomia típica e apresentações culturais.",
        tag: "Cultural",
    },
    {
        date: "25 OUT",
        title: "Roda de Conversa: Adaptação Acadêmica",
        location: "UFRJ — Cidade Universitária",
        time: "14h00",
        description:
            "Veteranos compartilham experiências e dicas para os calouros angolanos do semestre.",
        tag: "Acadêmico",
    },
    {
        date: "08 NOV",
        title: "Feijoada Angolana & Kizomba",
        location: "Lapa, Rio de Janeiro",
        time: "13h00",
        description:
            "Almoço comunitário com funje, muamba e aula de kizomba aberta a todos.",
        tag: "Gastronomia",
    },
    {
        date: "22 NOV",
        title: "Mutirão de Documentação",
        location: "Sede da UEBRA",
        time: "09h00",
        description:
            "Apoio coletivo para renovação de vistos, registros e validação de documentos.",
        tag: "Apoio",
    },
];

function Eventos() {
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
                    {events.map((event) => (
                        <div key={event.title} className="col-12 md:col-6">
                            <article className="eventos-card flex gap-4">
                                {/* Data */}
                                <div className="eventos-date flex flex-column align-items-center justify-content-center">
                                    <span className="eventos-date-day">
                                        {event.date.split(" ")[0]}
                                    </span>
                                    <span className="eventos-date-month">
                                        {event.date.split(" ")[1]}
                                    </span>
                                </div>

                                {/* Informações */}
                                <div className="eventos-info">
                                    <span className="eventos-tag">{event.tag}</span>
                                    <h2 className="eventos-card-title">{event.title}</h2>
                                    <p className="eventos-card-text">{event.description}</p>
                                    <div className="eventos-meta flex flex-wrap gap-3">
                                        <span className="flex align-items-center gap-1">
                                            <i className="pi pi-map-marker"></i>
                                            {event.location}
                                        </span>
                                        <span className="flex align-items-center gap-1">
                                            <i className="pi pi-clock"></i>
                                            {event.time}
                                        </span>
                                    </div>
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