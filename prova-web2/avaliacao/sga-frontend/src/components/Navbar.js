// sga-frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

const Navbar = () => {
    const { isLoggedIn, logout, nome } = useAuth();

    return (
        <nav className="navbar">
            <div className="container">
                <Link to={isLoggedIn ? "/dashboard" : "/"} className="navbar-logo">
                    SGA 🎓
                </Link>
                <ul className="navbar-nav">
                    {isLoggedIn ? (
                        <>
                            {/* O link "Painel" foi removido pois o logo já direciona para /dashboard,
                            e os sub-links para Alunos/Cursos/Professores não são necessários
                            conforme sua solicitação de usar cards no Dashboard. */}
                            <li className="welcome-text">
                                Olá, {nome || 'Usuário'}!
                            </li>
                            <li>
                                <button onClick={logout} className="btn-link">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="nav-link">Cadastrar</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;