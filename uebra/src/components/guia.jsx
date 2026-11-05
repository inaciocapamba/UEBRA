import { Link } from "@tanstack/react-router";
import "../css/guia.css";

const topics = [
    {
        icon: "pi pi-file",
        title: "Documentos & Visto",
        items: [
            "Registro na Polícia Federal",
            "Validação de diploma e histórico escolar",
            "Carteira de estudante e conta bancária",
        ],
    },
    {
        icon: "pi pi-home",
        title: "Moradia",
        items: [
            "Bairros próximos às universidades: Maracanã, Cidade Universitária, Tijuca, Botafogo",
            "Repúblicas estudantis e moradias compartilhadas",
            "Cuidados com contratos de aluguel e golpes",
        ],
    },
    {
        icon: "pi pi-car",
        title: "Transporte",
        items: [
            "Bilhete Único Universitário com tarifa reduzida",
            "Metrô, VLT, BRT e integrações",
            "Aplicativos de transporte e segurança no deslocamento",
        ],
    },
    {
        icon: "pi pi-book",
        title: "Vida Acadêmica",
        items: [
            "Matrícula e adaptação ao sistema universitário brasileiro",
            "Bolsas, auxílios e programas de permanência",
            "Restaurante universitário e bibliotecas",
        ],
    },
    {
        icon: "pi pi-heart",
        title: "Saúde",
        items: [
            "Como usar o SUS sendo estudante estrangeiro",
            "Postos de saúde e UPAs próximos às universidades",
            "Apoio psicológico gratuito nas universidades",
        ],
    },
    {
        icon: "pi pi-wallet",
        title: "Finanças",
        items: [
            "Programas governamental",
            "Orçamento mensal realista para o Rio",
            "Oportunidades de estágio e trabalho legal",
        ],
    },
];

function Guia() {
    return (
        <>
            <section className="guia-hero">
                <div className="guia-container guia-hero-content">
                    <h1 className="guia-title">
                        Guia do <span className="guia-gradient">Recém-Chegado</span>
                    </h1>
                    <p className="guia-subtitle">
                        Tudo o que você precisa saber para começar sua vida de
                        estudante no Rio de Janeiro com o pé direito.
                    </p>
                </div>
            </section>

            <section className="guia-container guia-body">
                <div className="grid">
                    {topics.map(({ icon, title, items }) => (
                        <div key={title} className="col-12 sm:col-6 lg:col-4">
                            <div className="guia-card">
                                <span className="guia-card-icon">
                                    <i className={icon}></i>
                                </span>
                                <h2 className="guia-card-title">{title}</h2>
                                <ul className="guia-list flex flex-column gap-2">
                                    {items.map((item) => (
                                        <li key={item} className="flex align-items-start gap-2">
                                            <span className="guia-dot"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="guia-cta flex flex-column sm:flex-row align-items-center justify-content-between gap-4">
                    <div>
                        <h2 className="guia-cta-title">Prefere falar com alguém?</h2>
                        <p className="guia-cta-text">
                            Nossa rede de mentores acompanha você pessoalmente nos
                            primeiros meses.
                        </p>
                    </div>
                    <Link to="/apoio" className="guia-btn">
                        Falar com a comunidade
                        <i className="pi pi-arrow-right"></i>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Guia;