// sga-frontend/src/components/Navbar.js (REFATORADO)
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
// ATUALIZAR IMPORTS:
import layoutStyles from '../styles/components/Layout.module.css';

const Navbar = () => {
    const { isLoggedIn, logout, nome } = useAuth();

    return (
        <nav className={layoutStyles.navbar}>
            <div className={`container ${layoutStyles.navbarContainer}`}>
                <Link to={isLoggedIn ? "/dashboard" : "/"} className={layoutStyles.navbarLogo}>
                    🎓 SGA
                </Link>
                <ul className={layoutStyles.navbarNav}>
                    {isLoggedIn ? (
                        <>
                            <li className={layoutStyles.welcomeText}>
                                Olá, {nome || 'Usuário'}!
                            </li>
                            <li>
                                <button onClick={logout} className={layoutStyles.btnLink}>
                                    Sair
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className={layoutStyles.navLink}>Entrar</Link>
                            </li>
                            <li>
                                <Link to="/register" className={layoutStyles.navLink}>Cadastrar</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;