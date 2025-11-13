// sga-frontend/src/pages/Home.js (CORRIGIDO)
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// ATUALIZAR IMPORTS:
import homeStyles from '../styles/pages/Home.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const Home = () => {
    const { isLoggedIn, nome } = useAuth();
    
    const features = [
        {
            icon: '👨‍🎓',
            title: 'Gerenciar Alunos',
            description: 'Cadastre, edite e visualize informações completas dos alunos de forma organizada.'
        },
        {
            icon: '📚',
            title: 'Gerenciar Cursos',
            description: 'Crie e administre cursos, definindo carga horária e outras informações importantes.'
        },
        {
            icon: '🧑‍🏫',
            title: 'Gerenciar Professores',
            description: 'Controle o cadastro de professores e suas atribuições aos cursos.'
        }
    ];

    return (
        <div className="container">
            {/* Hero Section - SOMENTE quando não está logado */}
            {!isLoggedIn && (
                <section className={homeStyles.hero}>
                    <h1 className={homeStyles.heroTitle}>
                        Sistema de Gerenciamento Acadêmico 🎓
                    </h1>
                    <p className={homeStyles.heroSubtitle}>
                        Gerencie alunos, cursos e professores de forma eficiente e moderna
                    </p>
                    
                    <div className={homeStyles.heroActions}>
                        <Link 
                            to="/login" 
                            className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.large}`}
                            style={{ color: 'white', borderColor: 'white' }}
                        >
                            🔐 Fazer Login
                        </Link>
                        <Link 
                            to="/register" 
                            className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.large}`}
                            style={{ background: 'white', color: 'var(--primary-color)' }}
                        >
                            ✍️ Cadastre-se
                        </Link>
                    </div>
                </section>
            )}

            {/* Welcome Section para usuários logados */}
            {isLoggedIn && (
                <section className={homeStyles.welcomeSection}>
                    <h2>Bem-vindo de volta, {nome || 'Usuário'}! 👋</h2>
                    <p className={homeStyles.welcomeText}>
                        Você está autenticado e pronto para começar a gerenciar o sistema.
                    </p>
                    <Link 
                        to="/dashboard" 
                        className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.large}`}
                    >
                        📊 Acessar Painel
                    </Link>
                </section>
            )}

            {/* Features Section - MOSTRAR SEMPRE */}
            <section className={homeStyles.features}>
                <h2 className="text-center mb-4">Recursos Principais</h2>
                <div className={homeStyles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={homeStyles.featureCard}>
                            <div className={homeStyles.featureIcon}>{feature.icon}</div>
                            <h3 className={homeStyles.featureTitle}>{feature.title}</h3>
                            <p className={homeStyles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;