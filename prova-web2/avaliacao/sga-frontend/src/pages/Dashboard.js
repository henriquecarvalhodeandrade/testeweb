// sga-frontend/src/pages/Dashboard.js (VERSÃO SIMPLIFICADA)
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// ATUALIZAR IMPORTS:
import dashboardStyles from '../styles/pages/Dashboard.module.css';
import cardStyles from '../styles/components/Cards.module.css';

const Dashboard = () => {
    const { nome } = useAuth();
    
    const quickActions = [
        { 
            title: 'Gerenciar Alunos', 
            description: 'Cadastrar, listar e editar informações de alunos.', 
            link: '/alunos',
            icon: '👨‍🎓',
            color: '#3B82F6'
        },
        { 
            title: 'Gerenciar Cursos', 
            description: 'Cadastrar, listar e excluir cursos.', 
            link: '/cursos',
            icon: '📚',
            color: '#10B981'
        },
        { 
            title: 'Gerenciar Professores', 
            description: 'Cadastrar, listar e editar informações de professores.', 
            link: '/professores',
            icon: '🧑‍🏫',
            color: '#F59E0B'
        }
    ];

    return (
        <div className={dashboardStyles.dashboard}>
            {/* Header Simples */}
            <div className={dashboardStyles.dashboardHeader}>
                <h1 className={dashboardStyles.dashboardTitle}>
                    Olá, {nome || 'Usuário'}! 👋
                </h1>
                <p className={dashboardStyles.dashboardSubtitle}>
                    O que você gostaria de gerenciar hoje?
                </p>
            </div>

            {/* Ações Rápidas - Foco Principal */}
            <section className={dashboardStyles.quickActions}>
                <div className={dashboardStyles.actionsGrid}>
                    {quickActions.map((action) => (
                        <Link 
                            key={action.title}
                            to={action.link}
                            className={cardStyles.dashboardCard}
                            style={{ 
                                '--primary-color': action.color,
                                '--primary-light': `${action.color}20`
                            }}
                        >
                            <span 
                                className={cardStyles.dashboardCardIcon}
                                style={{ color: action.color }}
                            >
                                {action.icon}
                            </span>
                            <h3 className={cardStyles.dashboardCardTitle}>
                                {action.title}
                            </h3>
                            <p className={cardStyles.dashboardCardDescription}>
                                {action.description}
                            </p>
                            <div style={{ 
                                marginTop: 'var(--spacing-sm)', 
                                color: action.color,
                                fontWeight: '600',
                                fontSize: '0.875rem'
                            }}>
                                Acessar →
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Mensagem Simples no Rodapé */}
            <div style={{ 
                textAlign: 'center', 
                marginTop: 'var(--spacing-xl)',
                color: 'var(--gray-500)',
                fontSize: '0.875rem'
            }}>
                <p>Sistema de Gerenciamento Acadêmico - Todos os sistemas operacionais</p>
            </div>
        </div>
    );
};

export default Dashboard;