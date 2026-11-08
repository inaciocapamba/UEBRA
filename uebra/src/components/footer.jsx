import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, HeartHandshake, Icon } from "lucide-react";
import logo from "../assets/logo.png";
import "../css/footer.css";

const navLinks = [
    { to: "/sobre", label: "Sobre Nós" },
    { to: "/guia", label: "Guia do Recém-Chegado" },
    { to: "/eventos", label: "Eventos" },
    { to: "/apoio", label: "Apoio & Comunidade" },
    { to: "/cadastro", label: "Cadastrar-se" },
];

const socialLinks = [
    { icon: "pi pi-instagram", label: "Instagram" },
    { icon: "pi pi-facebook", label: "Facebook" },
    { icon: "pi pi-youtube", label: "YouTube" },
    { icon: "pi pi-envelope", label: "E-mail" },
];

const contacts = [
    { icon: "pi pi-phone", text: "Coordenação UEBRA: (21) 90000-0000" },
    { icon: "pi pi-heart", text: "Consulado de Angola no RJ: (21) 30000-0000" },
    { icon: "pi pi-envelope", text: "contato@uebra.org.br" },
    { icon: "pi pi-map-marker", text: "Rio de Janeiro, Brasil" },
];

function Footer(){
    return(
        <footer className="footer">
            <div className="footer-content grid">
                {/* Coluna 1: logo, texto e redes sociais */}
                <div className="col-12 md:col-4">
                    <div className="flex align-items-center gap-2">
                        <img src={logo} alt="Logotipo da UEBRA" className="footer-logo-img" />
                        <span className="footer-logo-text">
                            Associação dos Estudantes Angolanos no RJ
                        </span>
                    </div>
                    <p className="footer-description">
                        Uma comunidade de acolhimento, apoio e celebração da cultura
                        angolana no coração do Rio de Janeiro.
                    </p>
                    <div className="flex gap-2">
                        {socialLinks.map(({icon, label}) => (
                            <a key={label} href="#" aria-label={label} className="footer-social">
                                <i className={icon}></i>
                            </a>
                        ))}
                    </div>
                </div>
                {/* Coluna 2: navegação */}
                <div className="col-12 md:col-4">
                    <h3 className="footer-title">Navegação</h3>
                    <ul className="footer-list flex flex-column gap-3">
                        {navLinks.map((link) => (
                            <li>
                                <Link to={link.to} className="footer-link">
                                {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Coluna 3: contatos */}
                <div className="col-12 md:col-4">
                    <h3 className="footer-title">Contatos de Emergência</h3>
                    <ul className="footer-list flex flex-column gap-3">
                        {contacts.map(({icon, text}) => (
                            <li key={text} className="footer-contact-icon flex align-items-start gap-2">
                                <i className={icon}></i>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} Associação dos Estudantes Angolanos no Rio de
                Janeiro. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}

export default Footer;