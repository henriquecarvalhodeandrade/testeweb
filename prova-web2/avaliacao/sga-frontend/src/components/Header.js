// sga-frontend/src/components/Header.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Mapeamento simples de títulos por rota
    const pageTitles = {
        '/dashboard': 'Painel de Controle 🏫',
        '/alunos': 'Gerenciamento de Alunos 👨‍🎓',
        '/cursos': 'Gerenciamento de Cursos 📚',
        '/professores': 'Gerenciamento de Professores 🧑‍🏫',
        '/login': 'Acesso ao Sistema 🔐',
        '/register': 'Cadastro de Usuário ✍️',
    };

    const title = pageTitles[location.pathname] || 'Sistema de Gerenciamento Acadêmico';

    return (
        <header style={{
            backgroundColor: '#0056b3',
            color: 'white',
            padding: '20px 30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center'
        }}>
            <h1 style={{ margin: 0, fontSize: '1.8em', fontWeight: '500' }}>
                {title}
            </h1>
        </header>
    );
};

export default Header;
