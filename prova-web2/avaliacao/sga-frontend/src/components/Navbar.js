// sga-frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/sgaApi';

const Navbar = ({ user, setUser, isAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(); // 5. Destrói sessão no backend [cite: 332]
            setUser(false); // Atualiza o estado no frontend (App.js)
            navigate('/login'); // Redireciona para o login [cite: 1406]
        } catch (error) {
            alert('Erro ao fazer logout.');
        }
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        margin: '0 15px',
        padding: '8px 12px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        backgroundColor: '#0056b3', // 8. Uso adequado de cores (azul institucional)
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flexWrap: 'wrap', // 7. Responsividade
    };

    return (
        <nav style={navStyle} className="navbar">
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.4em' }}>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>🎓 SGA</Link>
            </h2>

            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/" style={linkStyle}>Início</Link>
                
                {/* 7. Renderização Condicional: Links de gestão só aparecem se logado */}
                {isAuthenticated && (
                    <>
                        <Link to="/alunos" style={linkStyle}>Alunos</Link>
                        <Link to="/cursos" style={linkStyle}>Cursos</Link>
                    </>
                )}

                {/* 5. Renderização Condicional: Botão de Login/Logout */}
                {isAuthenticated ? (
                    <>
                        <span style={{ color: '#fff', margin: '0 15px' }}>
                            Bem-vindo, **{user.nome}**!
                        </span>
                        <button 
                            onClick={handleLogout}
                            style={{ ...linkStyle, background: '#dc3545', border: 'none', cursor: 'pointer' }}
                        >
                            Sair (Logout)
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ ...linkStyle, background: '#28a745' }}>Entrar</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;