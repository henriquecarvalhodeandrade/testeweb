
// sga-backend/src/models/cursoModel.js
const db = require('../config/db');

// 1. Cadastro de Cursos (CRUD - Create)
const create = async (nome_curso, carga_horaria) => {
    const [result] = await db.query(
        'INSERT INTO cursos (nome_curso, carga_horaria) VALUES (?, ?)',
        [nome_curso, carga_horaria]
    );
    return { id: result.insertId, nome_curso, carga_horaria };
};

// 3. Consulta: Listar todos os cursos (CRUD - Read)
const findAll = async () => {
    const [rows] = await db.query('SELECT * FROM cursos ORDER BY nome_curso');
    return rows;
};

// ... (métodos para findById, update e delete, a serem completados no Controller)

module.exports = {
    create,
    findAll,
    // ...
};