// sga-frontend/src/pages/Register.js (REFATORADO)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';
import { useAuth } from '../AuthContext';
// ATUALIZAR IMPORTS:
import authStyles from '../styles/pages/Auth.module.css';
import formStyles from '../styles/components/Forms.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        if (!nome || !email || !senha) {
            setError('Todos os campos são obrigatórios.');
            setLoading(false);
            return;
        }

        try {
            const response = await register(nome, email, senha);
            setMessage(response.message || 'Cadastro realizado com sucesso!');
            login(response.nome, response.userId);
            navigate('/alunos');
        } catch (err) {
            const errorMsg = err.response && err.response.data && err.response.data.erro 
                             ? err.response.data.erro
                             : 'Falha ao realizar o cadastro. Verifique seus dados.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={authStyles.authContainer}>
            <div className={authStyles.authCard}>
                <div className={authStyles.authHeader}>
                    <h1 className={authStyles.authTitle}>Criar Conta</h1>
                    <p className={authStyles.authSubtitle}>Cadastre-se para começar a usar o SGA</p>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className={`${formStyles.formContainer} ${loading ? authStyles.loading : ''}`}
                    style={{ maxWidth: 'none', boxShadow: 'none', padding: 0 }}
                >
                    {error && <div className={formStyles.errorMessage}>{error}</div>}
                    {message && <div className={formStyles.successMessage}>{message}</div>}

                    <div className={formStyles.formGroup}>
                        <label htmlFor="nome" className={formStyles.formLabel}>
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            className={formStyles.formInput}
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Seu nome completo"
                        />
                    </div>

                    <div className={formStyles.formGroup}>
                        <label htmlFor="email" className={formStyles.formLabel}>
                            Email
                        </label>
                        <input
                            type="email"
                            className={formStyles.formInput}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className={formStyles.formGroup}>
                        <label htmlFor="senha" className={formStyles.formLabel}>
                            Senha
                        </label>
                        <input
                            type="password"
                            className={formStyles.formInput}
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Crie uma senha segura"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.fullWidth} ${buttonStyles.large}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className={authStyles.loadingSpinner}></span>
                                Cadastrando...
                            </>
                        ) : (
                            '✍️ Criar Conta'
                        )}
                    </button>
                </form>

                <div className={authStyles.authFooter}>
                    <p>
                        Já tem uma conta?{' '}
                        <Link to="/login" className={formStyles.formLink}>
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;