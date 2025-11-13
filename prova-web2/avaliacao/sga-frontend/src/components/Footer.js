// sga-frontend/src/components/Footer.js (REFATORADO)
import React from 'react';
// ATUALIZAR IMPORTS:
import layoutStyles from '../styles/components/Layout.module.css';

const Footer = () => {
    return (
        <footer className={layoutStyles.footer}>
            <div className="container">
                <p className={layoutStyles.footerText}>
                    © {new Date().getFullYear()} Sistema de Gerenciamento Acadêmico. 
                    Arquitetura MVC com Node.js e React.
                </p>
            </div>
        </footer>
    );
};

export default Footer;