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
                            <li>
                                {/* ALTERADO: Link principal para logados agora aponta para o Dashboard */}
                                <Link to="/dashboard" className="nav-link">Painel</Link>
                            </li>
                            {/* Você pode querer manter um link para Alunos se ele for uma seção importante,
                                mas para manter o Painel como ponto de entrada, só colocamos o Painel. */}
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