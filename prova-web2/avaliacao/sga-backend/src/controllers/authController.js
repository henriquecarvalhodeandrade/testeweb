// sga-backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// 1. Cadastro de Usuário (CRUD - Create)
const register = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        // 5. Criptografar Senha [cite: 1404, 1536]
        const hashedPassword = await bcrypt.hash(senha, 10);
        
        const newUser = await userModel.create(nome, email, hashedPassword);
        
        // Cria sessão após o cadastro
        req.session.userId = newUser.id; 
        res.status(201).json({ id: newUser.id, nome: newUser.nome, message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ erro: 'Email já cadastrado.' });
        }
        res.status(500).json({ erro: 'Erro interno ao cadastrar.' });
    }
};

// 2. Login de Usuário
const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await userModel.findByEmail(email);

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }

        // 5. Compara a senha digitada com o hash salvo [cite: 1538, 1590]
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }

        // 5. Criação de Sessão (login de sucesso) [cite: 1318, 1592]
        req.session.userId = user.id;
        req.session.nome = user.nome; // Adiciona nome para exibição no frontend

        res.json({ message: 'Login realizado com sucesso!', nome: user.nome, userId: user.id });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};

// 3. Logout de Usuário (5. Destruição de Sessão)
const logout = (req, res) => {
    // 5. Destrói a sessão [cite: 1381, 1387, 1624]
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir sessão:', err);
            return res.status(500).json({ erro: 'Erro ao fazer logout.' });
        }
        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        res.json({ message: 'Logout realizado com sucesso.' });
    });
};

// 3. Exibir dados de um usuário logado (CRUD - Read)
const getLoggedInUser = (req, res) => {
    // req.session.userId foi definido no login e verificado pelo authMiddleware
    if (req.session.userId && req.session.nome) {
        return res.json({ 
            isLoggedIn: true, 
            userId: req.session.userId, 
            nome: req.session.nome 
        });
    }
    // O authMiddleware já trata o caso de não logado
    res.status(401).json({ isLoggedIn: false, erro: 'Nenhum usuário logado.' });
};


module.exports = {
    register,
    login,
    logout,
    getLoggedInUser
};