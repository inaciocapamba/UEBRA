import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../supabaseClient";
import "../css/entrar.css";

function Entrar() {
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        const f = Object.fromEntries(new FormData(e.target));

        const { error } = await supabase.auth.signInWithPassword({
            email: f.email,
            password: f.password,
        });

        if (error) setErro("E-mail ou senha incorretos, ou e-mail ainda não confirmado.");
        else navigate({ to: "/perfil" });
    };

    return (
        <div className="entrar-page flex align-items-center justify-content-center">
            <div className="entrar-box">
                <span className="entrar-icon">
                    <i className="pi pi-sign-in"></i>
                </span>
                <h1 className="entrar-title">Bem-vindo de volta</h1>
                <p className="entrar-text">
                    Entre para acessar os grupos, eventos e a rede de mentoria.
                </p>

                <form className="entrar-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="entrar-input"
                            autoComplete="email"
                            required
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="entrar-input"
                            autoComplete="current-password"
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Mensagem de erro: aparece só quando há erro, logo antes do botão */}
                    {erro && <p className="entrar-erro">{erro}</p>}

                    <button type="submit" className="entrar-btn">
                        Entrar
                    </button>
                </form>

                <p className="entrar-signup text-center">
                    Ainda não faz parte?{" "}
                    <Link to="/cadastro" className="entrar-link">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Entrar;