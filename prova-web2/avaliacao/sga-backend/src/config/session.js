// sga-backend/src/config/session.js
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const sessionConfig = session({
    secret: process.env.SESSION_SECRET, // Chave para assinar o ID da sessão [cite: 1370]
    resave: false,
    saveUninitialized: false, // Não salva sessões não modificadas
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Duração de 1 dia (em milissegundos)
        secure: false, // Deve ser 'true' em produção (HTTPS) [cite: 1627]
        httpOnly: true, // Impede acesso via JavaScript do cliente (segurança)
        sameSite: 'lax'
    }
});

module.exports = sessionConfig;