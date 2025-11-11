// sga-frontend/src/pages/Register.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { register, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // CORREÇÃO AQUI: Redireciona para /alunos se já estiver logado
    if (isLoggedIn) {
        navigate('/alunos'); // Redireciona para a página principal após autenticação
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const result = await register(nome, email, senha); 

        if (result.success) {
            setSuccessMessage('Cadastro realizado com sucesso! Você foi logado automaticamente.');
            setTimeout(() => {
                navigate('/alunos'); // Redireciona para a rota protegida após o sucesso
            }, 1500);
        } else {
            setError(result.error || 'Falha no cadastro. Tente novamente.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Cadastrar Novo Usuário</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}
                
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" disabled={successMessage}>Cadastrar</button>
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Faça Login</Link>
            </p>
        </div>
    );
};

export default Register;