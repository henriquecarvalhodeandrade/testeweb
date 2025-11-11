// sga-frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // CORREÇÃO AQUI: Redireciona para /alunos se já estiver logado
    if (isLoggedIn) {
        navigate('/alunos'); // Redireciona para a página principal após autenticação
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, senha);

        if (result.success) {
            navigate('/alunos'); // Redireciona para a rota protegida após o sucesso
        } else {
            console.error(result.error);
            setError(result.error || 'Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;