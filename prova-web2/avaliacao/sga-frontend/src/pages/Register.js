// sga-frontend/src/pages/Register.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';
import { useAuth } from '../AuthContext'; 

/**
 * Componente da página de Registro de Novo Usuário.
 */
function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); 
    
    // Hook para redirecionamento
    const navigate = useNavigate();
    
    // Obtém a função de login do contexto para atualizar o estado global após o registro
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        // Validação básica
        if (!nome || !email || !senha) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        try {
            // Chama a função de registro na API
            const response = await register(nome, email, senha);
            
            // Se o registro for bem-sucedido (status 201), 
            // a sessão já foi criada no backend (authController.js)
            setMessage(response.message || 'Cadastro realizado com sucesso!');
            
            // Atualiza o estado global de autenticação
            login(response.nome, response.userId); 

            // Redireciona para a página protegida (ex: /alunos)
            navigate('/alunos');

        } catch (err) {
            // Tenta extrair a mensagem de erro específica do backend (ex: "Email já cadastrado.")
            const errorMsg = err.response && err.response.data && err.response.data.erro 
                             ? err.response.data.erro
                             : 'Falha ao realizar o cadastro. Verifique seus dados.';
            setError(errorMsg);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Registro de Novo Usuário</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {message && <div className="alert alert-success">{message}</div>}

                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome Completo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Registrar</button>
                            </form>

                            <p className="mt-3 text-center">
                                Já tem uma conta? <Link to="/login">Faça Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;