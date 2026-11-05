import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "../css/cadastro.css";

const universities = ["UERJ", "UFRJ", "UFF", "PUC-Rio", "UNIRIO", "IFRJ", "Outra"];

function Cadastro() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="cadastro-page flex align-items-center justify-content-center">
            <div className="cadastro-box">
                {submitted ? (
                    /* MENSAGEM DE SUCESSO */
                    <div className="text-center">
                        <span className="cadastro-icon cadastro-icon-success">
                            <i className="pi pi-check-circle"></i>
                        </span>
                        <h1 className="cadastro-title">Cadastro recebido!</h1>
                        <p className="cadastro-text cadastro-success-text">
                            Bem-vindo à família! Nossa equipe entrará em contato em até 48
                            horas com o kit de boas-vindas e o convite para os grupos da
                            comunidade.
                        </p>
                        <Link to="/" className="cadastro-btn cadastro-btn-inline">
                            Voltar ao início
                        </Link>
                    </div>
                ) : (
                    /* FORMULÁRIO */
                    <>
                        <span className="cadastro-icon">
                            <i className="pi pi-user-plus"></i>
                        </span>
                        <h1 className="cadastro-title">Junte-se à comunidade</h1>
                        <p className="cadastro-text">
                            Cadastro gratuito para estudantes angolanos no Rio de Janeiro.
                        </p>

                        <form className="cadastro-form" onSubmit={handleSubmit}>
                            <div className="formgrid grid">
                                <div className="field col-12 sm:col-6">
                                    <label htmlFor="name">Nome completo</label>
                                    <input
                                        id="name"
                                        className="cadastro-input"
                                        required
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="field col-12 sm:col-6">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="cadastro-input"
                                        required
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="formgrid grid">
                                <div className="field col-12 sm:col-6">
                                    <label htmlFor="university">Universidade</label>
                                    <select id="university" className="cadastro-input" required>
                                        <option value="">Selecione</option>
                                        {universities.map((u) => (
                                            <option key={u} value={u}>
                                                {u}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field col-12 sm:col-6">
                                    <label htmlFor="course">Curso</label>
                                    <input
                                        id="course"
                                        className="cadastro-input"
                                        required
                                        placeholder="Ex: Engenharia"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="phone">WhatsApp (opcional)</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="cadastro-input"
                                    placeholder="(21) 90000-0000"
                                />
                            </div>

                            <button type="submit" className="cadastro-btn">
                                Cadastrar-se na Comunidade
                            </button>
                        </form>

                        <p className="cadastro-login text-center">
                            Já tem cadastro?{" "}
                            <Link to="/entrar" className="cadastro-link">
                                Entrar
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cadastro;