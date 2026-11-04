import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Menu, X, Sun, Moon } from "lucide-react";
import "../css/header.css"

const navLinks = [
    {to: "/", label: "Início"},
    {to: "/Sobre", label: "Sobre Nós"},
    {to: "/guia", label: "Guia do Recém-Chegado"},
    {to: "/eventos", label: "Eventos"},
    {to: "/apoio", label: "Apoio & Comunidade"}
];

function Header(){
    const [visible, setVisible] = useState(false);
    const [dark, setDark] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const stored = localStorage.getItem("aerj-theme");
        //verificar qual é a preferência do sistema operacional do usuário (Windows, macOS, Android, iOS) -> Boolean.
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = stored ? stored === "dark" : prefersDark;
        
        setDark(isDark);
        // adiciona a class CSS "dark" se isDark = True
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    // Fecha o Menu Lateral sempre que a página muda
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

    return(
        <header className="header">
            <div className="header-content flex align-items-center justify-content-between">
                <Link to="/" className="header-logo flex align-items-center gap-2">
                    <span className="header-logo-icon">AE</span>
                    <span className="header-logo-text hidden md:inline">UEBRA</span>
                </Link>

                {/* Menu descktop */}
                <nav className="hidden md:flex align-items-center gap-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.to}
                        to={link.to}
                        className={`header-link ${isActive(link.to) ? "active": ""}`}
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
                    aria-label="Alterar tema"
                    onClick={toggleTheme}
                    icon={dark ? <Sun size={20}/> : <Moon size={20}/>}
                    />

                    <Button
                    text
                    rounded
                    className="md:hidden"
                    aria-label="Abrir menu"
                    onClick={() => setVisible(true)}
                    icon={<Menu size={20}/>}
                    />
                </div>
            </div>

            {/* Menu mobile */}
            <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
                    <nav className="flex flex-column gap-3">
                        {navLinks.map((link) => (
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
    )
}

export default Header;