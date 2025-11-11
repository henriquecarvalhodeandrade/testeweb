// sga-frontend/src/pages/Login.js (Assumindo a estrutura padrão com useNavigate)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);

    // useAuth fornece a função de login
    const { login: authLogin } = useAuth();
    // useNavigate é usado para redirecionar o usuário
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Chama a função de login do contexto
            await authLogin(email, senha);
            
            // REDIRECIONAMENTO ALTERADO: Vai para o Dashboard
            navigate('/dashboard'); 

        } catch (err) {
            // Tenta obter a mensagem de erro do objeto de resposta do Axios
            const errorMessage = err.response?.data?.erro || 'Erro ao tentar logar. Verifique suas credenciais.';
            setError(errorMessage);
            console.error('Login error:', err);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="card-form">
                <h2>Login no SGA</h2>
                
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input 
                        type="password" 
                        id="senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" className="btn-primary">Entrar</button>
                
                <p className="link-text">
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;