// sga-frontend/src/pages/Login.js (REFATORADO)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// ATUALIZAR IMPORTS:
import authStyles from '../styles/pages/Auth.module.css';
import formStyles from '../styles/components/Forms.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await authLogin(email, senha);
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.erro || 'Erro ao tentar logar. Verifique suas credenciais.';
            setError(errorMessage);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={authStyles.authContainer}>
            <div className={authStyles.authCard}>
                <div className={authStyles.authHeader}>
                    <h1 className={authStyles.authTitle}>Entrar no SGA</h1>
                    <p className={authStyles.authSubtitle}>Acesse sua conta para gerenciar o sistema</p>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className={`${formStyles.formContainer} ${loading ? authStyles.loading : ''}`}
                    style={{ maxWidth: 'none', boxShadow: 'none', padding: 0 }}
                >
                    {error && <div className={formStyles.errorMessage}>{error}</div>}
                    
                    <div className={formStyles.formGroup}>
                        <label htmlFor="email" className={formStyles.formLabel}>
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            className={formStyles.formInput}
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
                            id="senha"
                            className={formStyles.formInput}
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                            required 
                            disabled={loading}
                            placeholder="Sua senha"
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
                                Entrando...
                            </>
                        ) : (
                            '🔐 Entrar'
                        )}
                    </button>
                </form>

                <div className={authStyles.authFooter}>
                    <p>
                        Não tem uma conta?{' '}
                        <Link to="/register" className={formStyles.formLink}>
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;