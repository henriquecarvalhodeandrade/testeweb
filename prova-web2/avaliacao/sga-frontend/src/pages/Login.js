// sga-frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/sgaApi';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState(''); // Estado para o email [cite: 1124]
    const [senha, setSenha] = useState(''); // Estado para a senha [cite: 1124]
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento padrão do formulário [cite: 1128]
        setError('');

        try {
            const userData = await login(email, senha); // Chama API de login
            
            // Atualiza o estado global com os dados do usuário
            setUser({ isLoggedIn: true, nome: userData.nome, userId: userData.userId }); 
            
            navigate('/alunos'); // Redireciona após login bem-sucedido [cite: 538]
        } catch (err) {
            // Tratamento de erro (ex: credenciais inválidas)
            setError(err.response?.data?.erro || 'Erro desconhecido ao tentar logar.');
        }
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    };
    
    // ... (Estilos para inputs e botão, seguindo 8. Design limpo e intuitivo)

    return (
        <div style={formStyle}>
            <h3>Acesso ao Sistema Acadêmico 🔑</h3>
            
            {error && <p style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '4px' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado no onChange
                        required
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Fazer Login
                </button>
            </form>
        </div>
    );
};

export default Login;