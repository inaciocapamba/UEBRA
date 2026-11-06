import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "../css/entrar.css"

function Entrar() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // impede a página de recarregar
        setSubmitted(true);
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

                {submitted ? (
                    /* AVISO: área de membros ainda não liberada */
                    <div className="entrar-notice">
                        <p className="entrar-notice-title">Quase lá!</p>
                        <p className="entrar-notice-text">
                            O acesso à área de membros será liberado em breve. Enquanto
                            isso, fale conosco pelo e-mail contato@uebra.org.br.
                        </p>
                    </div>
                ) : (
                    /* FORMULÁRIO */
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

                        <button type="submit" className="entrar-btn">
                            Entrar
                        </button>
                    </form>
                )}

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