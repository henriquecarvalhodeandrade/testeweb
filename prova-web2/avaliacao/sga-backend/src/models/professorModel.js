// sga-backend/src/models/professorModel.js
const db = require('../config/db');

// 1. Cadastro de Professor (CRUD - Create)
const create = async (nome, matricula, curso_id) => {
    // A matrícula pode ser definida como UNIQUE no banco de dados para evitar duplicidade
    const [result] = await db.query(
        'INSERT INTO professores (nome, matricula, curso_id) VALUES (?, ?, ?)',
        [nome, matricula, curso_id]
    );
    return { id: result.insertId, nome, matricula, curso_id };
};

// 3. Consulta: Listar todos os professores COM o nome do curso (JOIN)
const findAllWithCourse = async () => {
    const [rows] = await db.query(`
        SELECT 
            p.id, 
            p.nome, 
            p.matricula, 
            c.nome_curso 
        FROM professores p
        LEFT JOIN cursos c ON p.curso_id = c.id
        ORDER BY p.nome
    `);
    return rows;
};

// Busca um professor pelo ID
const findById = async (id) => {
    // Retorna todos os campos, incluindo a matrícula, que será usada no formulário de edição do front
    const [rows] = await db.query('SELECT * FROM professores WHERE id = ?', [id]);
    return rows[0]; 
};

// 2. Edição: Atualizar dados de um professor (CRUD - Update)
const update = async (id, nome, matricula) => {
    const [result] = await db.query(
        'UPDATE professores SET nome = ?, matricula = ? WHERE id = ?',
        [nome, matricula, id]
    );
    return result.affectedRows > 0;
};

// 2. Edição: Alterar o curso principal do professor (Relacionamento - Chave Estrangeira)
const updateCourse = async (professorId, novoCursoId) => {
    const [result] = await db.query(
        'UPDATE professores SET curso_id = ? WHERE id = ?',
        [novoCursoId, professorId]
    );
    return result.affectedRows > 0;
};

// 4. Exclusão: Excluir professor (CRUD - Delete)
const remove = async (id) => {
    const [result] = await db.query('DELETE FROM professores WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    create,
    findAllWithCourse,
    findById,
    update,
    updateCourse,
    remove,
};