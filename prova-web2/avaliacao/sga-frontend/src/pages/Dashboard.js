// sga-frontend/src/pages/Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Estilo simples para os cards no painel
const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    textDecoration: 'none',
    color: '#333',
    flex: '1 1 300px', // Flexível para responsividade
    margin: '10px',
};

const Dashboard = () => {
    const { nome } = useAuth();
    
    // Lista de opções do menu. Adicionamos a URL de destino
    const options = [
        { title: 'Gerenciar Alunos', description: 'Cadastrar, listar e editar informações de alunos.', link: '/alunos' },
        { title: 'Gerenciar Cursos', description: 'Cadastrar, listar e excluir cursos.', link: '/cursos' },
        // ALTERADO: Habilitar o link para Professores e definir a rota
        { title: 'Gerenciar Professores', description: 'Cadastrar, listar e editar informações de professores.', link: '/professores', disabled: false }
    ];

    return (
        <div className="container">
            <h1>Painel de Controle, {nome || 'Usuário'}!</h1>
            <p>Selecione a entidade que deseja gerenciar.</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '20px 0' }}>
                {options.map(option => (
                    <Link 
                        key={option.title} 
                        to={option.link}
                        style={{ 
                            ...cardStyle,
                            // A opacidade agora será 1 para Professores, pois disabled é false
                            opacity: option.disabled ? 0.6 : 1,
                            cursor: option.disabled ? 'not-allowed' : 'pointer'
                        }}
                        onClick={(e) => option.disabled && e.preventDefault()}
                    >
                        <h2>{option.title}</h2>
                        <p>{option.description}</p>
                    </Link>
                ))}
            </div>
            
            <p style={{ marginTop: '30px' }}>Você está logado e tem acesso a todas as funcionalidades do Sistema de Gerenciamento Acadêmico (SGA).</p>
        </div>
    );
};

export default Dashboard;