// sga-frontend/src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
            marginTop: 'auto',
            padding: '15px 30px', 
            textAlign: 'center', 
            backgroundColor: '#343a40', 
            color: '#fff',
            fontSize: '0.9em'
        }}>
            <p>© {new Date().getFullYear()} Sistema de Gerenciamento Acadêmico. Arquitetura MVC com Node.js e React.</p>
        </footer>
    );
};

export default Footer;