import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "../supabaseClient";
import "../css/cadastro.css";

const universities = ["UERJ", "UFRJ", "UFF", "PUC-Rio", "UNIRIO", "IFRJ", "Outra"];

function Cadastro() {
    const [submitted, setSubmitted] = useState(false);
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        const f = Object.fromEntries(new FormData(e.target));

        const { error } = await supabase.auth.signUp({
            email: f.email,
            password: f.password,
            options: {
                data: {
                    nome: f.name,
                    universidade: f.university,
                    curso: f.course,
                    whatsapp: f.phone,
                },
            },
        });

        if (error) setErro(error.message);
        else setSubmitted(true);
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
                            Bem-vindo à família! Confirme o seu e-mail pelo link que enviamos
                            e, depois, aguarde a aprovação da coordenação para liberar a área
                            de membros e os grupos da comunidade.
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
                                        name="name"
                                        className="cadastro-input"
                                        required
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="field col-12 sm:col-6">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="cadastro-input"
                                        required
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="password">Senha</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="cadastro-input"
                                    minLength={8}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Mínimo 8 caracteres"
                                />
                            </div>

                            <div className="formgrid grid">
                                <div className="field col-12 sm:col-6">
                                    <label htmlFor="university">Universidade</label>
                                    <select
                                        id="university"
                                        name="university"
                                        className="cadastro-input"
                                        required
                                    >
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
                                        name="course"
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
                                    name="phone"
                                    type="tel"
                                    className="cadastro-input"
                                    placeholder="(21) 90000-0000"
                                />
                            </div>

                            {erro && <p className="cadastro-erro">{erro}</p>}

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