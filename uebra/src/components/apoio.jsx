import { Link } from "@tanstack/react-router";
import "../css/apoio.css";

const supportChannels = [
    {
        icon: "pi pi-heart",
        title: "Mentoria de Veteranos",
        description:
            "Todo recém-chegado é acompanhado por um estudante veterano que ajuda na adaptação acadêmica e na vida na cidade.",
    },
    {
        icon: "pi pi-comments",
        title: "Grupos da Comunidade",
        description:
            "Grupos de WhatsApp e Telegram por universidade e por bairro, para trocar dicas, avisos e oportunidades.",
    },
    {
        icon: "pi pi-shield",
        title: "Apoio em Situações Difíceis",
        description:
            "Rede de solidariedade para emergências: problemas de saúde, documentação, moradia ou dificuldades financeiras.",
    },
];

const emergencyContacts = [
    "Coordenação UEBRA: (21) 90000-0000",
    "Consulado de Angola no RJ: (21) 30000-0000",
    "E-mail: contato@uebra.org.br",
];

function Apoio() {
    return (
        <>
            <section className="apoio-hero">
                <div className="apoio-container apoio-hero-content">
                    <h1 className="apoio-title">
                        Apoio & <span className="apoio-gradient">Comunidade</span>
                    </h1>
                    <p className="apoio-subtitle">
                        Ninguém caminha sozinho. Conheça os canais de apoio da nossa
                        rede de estudantes.
                    </p>
                </div>
            </section>

            <section className="apoio-container apoio-body">
                <div className="grid">
                    {supportChannels.map(({ icon, title, description }) => (
                        <div key={title} className="col-12 md:col-4">
                            <div className="apoio-card">
                                <span className="apoio-card-icon">
                                    <i className={icon}></i>
                                </span>
                                <h2 className="apoio-card-title">{title}</h2>
                                <p className="apoio-card-text">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid apoio-bottom">
                    <div className="col-12 lg:col-6">
                        <div className="apoio-help">
                            <i className="pi pi-phone apoio-help-icon"></i>
                            <h2 className="apoio-help-title">Precisa de ajuda agora?</h2>
                            <p className="apoio-help-text">
                                Nossa coordenação atende todos os dias, das 8h às 22h.
                            </p>
                            <ul className="apoio-help-list flex flex-column gap-2">
                                {emergencyContacts.map((contact) => (
                                    <li key={contact}>{contact}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 lg:col-6">
                        <div className="apoio-join flex flex-column justify-content-center">
                            <h2 className="apoio-join-title">Entre para a rede de apoio</h2>
                            <p className="apoio-join-text">
                                Cadastre-se para ser conectado a um mentor e aos grupos da
                                sua universidade.
                            </p>
                            <Link to="/cadastro" className="apoio-btn">
                                Quero participar
                                <i className="pi pi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Apoio;