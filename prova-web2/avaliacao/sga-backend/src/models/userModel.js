// sga-backend/src/models/userModel.js
const db = require('../config/db');

// Busca um usuário pelo email
const findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0]; // Retorna o primeiro usuário encontrado (ou undefined)
};

// Cria um novo usuário
const create = async (nome, email, hashedPassword) => {
    const [result] = await db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, hashedPassword]
    );
    return { id: result.insertId, nome, email };
};

module.exports = {
    findByEmail,
    create,
};