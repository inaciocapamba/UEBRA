import { Link } from "@tanstack/react-router";
import "../css/sobre.css";

const values = [
    {
        icon: "pi pi-flag",
        title: "Nossa História",
        text: "Fundada por estudantes angolanos que chegaram ao Rio em busca de formação superior, a AEA-RJ nasceu da necessidade de acolher quem desembarca sozinho na cidade maravilhosa.",
    },
    {
        icon: "pi pi-bullseye",
        title: "Nossa Missão",
        text: "Garantir que nenhum estudante angolano se sinta desamparado no Rio: oferecemos orientação acadêmica, apoio documental, rede de mentoria e celebração da nossa cultura.",
    },
    {
        icon: "pi pi-users",
        title: "Nossa Comunidade",
        text: "Centenas de estudantes em universidades como UFRJ, UERJ, PUC-Rio e UFF, unidos por laços de amizade, solidariedade e orgulho das raízes angolanas.",
    },
];

function Sobre() {
    return (
        <>
            <section className="sobre-hero">
                <div className="sobre-container sobre-hero-content">
                    <h1 className="sobre-title">
                        Sobre <span className="sobre-gradient">Nós</span>
                    </h1>
                    <p className="sobre-subtitle">
                        Somos mais do que uma associação: somos uma família que mantém
                        viva a cultura angolana enquanto constrói futuros no Brasil.
                    </p>
                </div>
            </section>

            <section className="sobre-container sobre-body">
                <div className="grid">
                    {values.map(({ icon, title, text }) => (
                        <div key={title} className="col-12 md:col-4">
                            <div className="sobre-card">
                                <span className="sobre-card-icon">
                                    <i className={icon}></i>
                                </span>
                                <h2 className="sobre-card-title">{title}</h2>
                                <p className="sobre-card-text">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sobre-cta text-center">
                    <h2 className="sobre-cta-title">Faça parte dessa história</h2>
                    <p className="sobre-cta-text">
                        Seja você recém-chegado ou veterano, há sempre um lugar para você
                        na nossa comunidade.
                    </p>
                    <Link to="/cadastro" className="sobre-btn">
                        Cadastrar-se na Comunidade
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Sobre;