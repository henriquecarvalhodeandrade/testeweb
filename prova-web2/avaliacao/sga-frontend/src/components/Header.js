// sga-frontend/src/components/Header.js (AJUSTADO)
import React from 'react';
import { useLocation } from 'react-router-dom';
// ATUALIZAR IMPORTS:
import layoutStyles from '../styles/components/Layout.module.css';

const Header = () => {
    const location = useLocation();

    // Não mostrar Header na página Home
    if (location.pathname === '/') {
        return null;
    }

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
        <header className={layoutStyles.header}>
            <div className="container">
                <h1 className={layoutStyles.headerTitle}>{title}</h1>
            </div>
        </header>
    );
};

export default Header;