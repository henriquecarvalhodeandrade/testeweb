// sga-frontend/src/pages/Home.js
import React from 'react';

const Home = ({ user }) => {
    const nomeUsuario = user && user.nome ? user.nome : 'Visitante';
    
    return (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
            <h1 style={{ color: '#0056b3' }}>Bem-vindo ao Sistema de Gerenciamento Acadêmico (SGA) 🏫</h1>
            <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
                Olá, **{nomeUsuario}**! Utilize o menu de navegação para gerenciar alunos e cursos.
            </p>
            
            {!user || !user.isLoggedIn ? (
                // --- BOTÕES ADICIONADOS/MODIFICADOS AQUI ---
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                    <p>
                        <a href="/login" style={{ fontSize: '1.1em', color: '#28a745', textDecoration: 'none', fontWeight: 'bold', padding: '10px 20px', border: '2px solid #28a745', borderRadius: '5px' }}>
                            Fazer Login
                        </a>
                    </p>
                    <p>
                        <a href="/register" style={{ fontSize: '1.1em', color: '#fff', backgroundColor: '#007bff', textDecoration: 'none', fontWeight: 'bold', padding: '10px 20px', borderRadius: '5px' }}>
                            Cadastre-se
                        </a>
                    </p>
                </div>
                // ------------------------------------------
            ) : (
                <p style={{ color: '#007bff' }}>Você está autenticado e pronto para começar.</p>
            )}
        </div>
    );
};

export default Home;