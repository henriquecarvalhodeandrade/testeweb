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

// NOVO: 3. Consulta: Buscar curso por ID (CRUD - Read)
const findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM cursos WHERE id = ?', [id]);
    return rows[0]; // Retorna o primeiro curso encontrado ou undefined
};

// NOVO: 2. Atualização de Curso (CRUD - Update)
const update = async (id, nome_curso, carga_horaria) => {
    const [result] = await db.query(
        'UPDATE cursos SET nome_curso = ?, carga_horaria = ? WHERE id = ?',
        [nome_curso, carga_horaria, id]
    );
    // Verifica se alguma linha foi alterada
    return result.affectedRows > 0;
};

// NOVO: 4. Exclusão de Curso (CRUD - Delete)
const remove = async (id) => {
    const [result] = await db.query('DELETE FROM cursos WHERE id = ?', [id]);
    return result.affectedRows > 0; 
};


module.exports = {
    create,
    findAll,
    findById, 
    update,   
    remove,   
};