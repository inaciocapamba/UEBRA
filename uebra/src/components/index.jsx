import { Link } from "@tanstack/react-router";
import "../css/index.css";

const highlights = [
    {
        icon: "pi pi-graduation-cap",
        title: "Integração Acadêmica & Vistos",
        description:
            "Orientação sobre matrícula, validação de diplomas, visto de estudante e documentação junto às universidades cariocas.",
        color: "primary",
    },
    {
        icon: "pi pi-map",
        title: "Guia da Cidade",
        description:
            "Moradia acessível, transporte, bairros recomendados e dicas práticas para viver bem no Rio de Janeiro.",
        color: "ocean",
    },
    {
        icon: "pi pi-calendar",
        title: "Eventos & Encontros Culturais",
        description:
            "Semanas culturais, festas da independência, rodas de conversa, música e gastronomia angolana o ano todo.",
        color: "terra",
    },
    {
        icon: "pi pi-heart",
        title: "Rede de Apoio e Mentoria",
        description:
            "Estudantes veteranos acompanham os recém-chegados com mentoria, apoio emocional e rede de contatos.",
        color: "sun",
    },
];

function Inicio() {
    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="section-content text-center">
                    <span className="hero-badge inline-flex align-items-center gap-2">
                        <i className="pi pi-star-fill"></i>
                        Comunidade angolana no Rio de Janeiro
                    </span>

                    <h1 className="hero-title">
                        Sua casa longe de casa:{" "}
                        <span className="text-gradient">
                            a comunidade de estudantes angolanos no RJ
                        </span>
                    </h1>

                    <p className="hero-text">
                        Acolhemos, orientamos e conectamos estudantes angolanos que
                        escolheram o Rio de Janeiro para estudar. Do primeiro dia na
                        cidade à formatura, você nunca caminha sozinho.
                    </p>

                    <div className="hero-buttons flex flex-column sm:flex-row align-items-center justify-content-center gap-3">
                        <Link to="/cadastro" className="btn btn-primary">
                            Cadastrar-se na Comunidade
                            <i className="pi pi-arrow-right"></i>
                        </Link>
                        <Link to="/guia" className="btn btn-outline">
                            Explorar Guia do Estudante
                        </Link>
                    </div>
                </div>
            </section>

            {/* DESTAQUES */}
            <section className="highlights">
                <div className="section-content">
                    <div className="highlights-header text-center">
                        <h2 className="section-title">Como podemos te ajudar</h2>
                        <p className="section-subtitle">
                            Quatro pilares que sustentam a jornada de cada estudante
                            angolano no Rio.
                        </p>
                    </div>

                    <div className="grid">
                        {highlights.map(({ icon, title, description, color }) => (
                            <div key={title} className="col-12 sm:col-6 lg:col-3">
                                <div className="card">
                                    <span className={`card-icon card-icon-${color}`}>
                                        <i className={icon}></i>
                                    </span>
                                    <h3 className="card-title">{title}</h3>
                                    <p className="card-text">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="section-content cta-section">
                <div className="cta text-center">
                    <h2 className="cta-title">
                        Chegou agora ao Rio? A gente te recebe de braços abertos.
                    </h2>
                    <p className="cta-text">
                        Cadastre-se e receba o kit de boas-vindas com o guia completo,
                        contatos de emergência e convite para o próximo encontro.
                    </p>
                    <Link to="/cadastro" className="btn btn-sun">
                        Quero fazer parte
                        <i className="pi pi-arrow-right"></i>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Inicio;