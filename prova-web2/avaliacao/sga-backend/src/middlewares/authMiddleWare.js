// sga-backend/src/middlewares/authMiddleware.js
// Verifica se o usuário está logado na sessão
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        // Se houver userId na sessão, o usuário está logado
        next();
    } else {
        // Retorna 401 (Não Autorizado) se não estiver logado
        res.status(401).json({ erro: 'Não autorizado. Faça login para acessar este recurso.' });
    }
};

module.exports = isAuthenticated;