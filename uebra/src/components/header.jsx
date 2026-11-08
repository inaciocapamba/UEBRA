import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Sun, Moon, Menu } from "lucide-react";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";
import "../css/header.css";

const navLinks = [
    { to: "/", label: "Início" },
    { to: "/sobre", label: "Sobre Nós" },
    { to: "/guia", label: "Guia do Recém-Chegado" },
    { to: "/eventos", label: "Eventos" },
    { to: "/apoio", label: "Apoio & Comunidade" },
];

function Header() {
    const [visible, setVisible] = useState(false); // menu lateral (mobile)
    const [dark, setDark] = useState(false);       // tema escuro
    const location = useLocation();
    const { session, perfil, sair } = useAuth();

    // Monta a lista de links conforme o login
    const links = [...navLinks];
    if (session) {
        links.push({ to: "/grupos", label: "Grupos" }, { to: "/perfil", label: "Meu perfil" });
    }
    if (perfil?.papel === "coordenacao") {
        links.push({ to: "/admin", label: "Painel" });
    }
    if (!session) {
        links.push({ to: "/entrar", label: "Entrar" });
    }

    // Roda uma vez, quando o componente aparece na tela
    useEffect(() => {
        const stored = localStorage.getItem("aerj-theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = stored ? stored === "dark" : prefersDark;

        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    // Fecha o menu lateral sempre que a página muda
    useEffect(() => {
        setVisible(false);
    }, [location.pathname]);

    const toggleTheme = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("aerj-theme", next ? "dark" : "light");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="header-content flex align-items-center justify-content-between">
                {/* Logo */}
                <Link to="/" className="header-logo flex align-items-center gap-2">
                <img src={logo} alt="Logotipo da UEBRA" className="header-logo-img" />
                <span className="header-logo-text hidden md:inline">UEBRA</span>
            </Link>

                {/* Menu desktop */}
                <nav className="hidden lg:flex align-items-center gap-4">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`header-link ${isActive(link.to) ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Botões da direita */}
                <div className="flex align-items-center gap-2">
                    <Button
                        text
                        rounded
                        aria-label="Alternar tema"
                        onClick={toggleTheme}
                        icon={dark ? <Sun size={20} /> : <Moon size={20} />}
                    />

                    {session && (
                        <Button
                            text
                            rounded
                            aria-label="Sair"
                            icon="pi pi-sign-out"
                            onClick={sair}
                        />
                    )}

                    <Button
                        text
                        rounded
                        className="lg:hidden"
                        aria-label="Abrir menu"
                        onClick={() => setVisible(true)}
                        icon={<Menu size={20} />}
                    />
                </div>
            </div>

            {/* Menu mobile */}
            <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
                <nav className="flex flex-column gap-3">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`header-link ${isActive(link.to) ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </Sidebar>
        </header>
    );
}

export default Header;