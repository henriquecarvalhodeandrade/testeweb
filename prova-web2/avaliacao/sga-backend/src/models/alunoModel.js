
// sga-backend/src/models/alunoModel.js
const db = require('../config/db');

// 1. Cadastro de Aluno (CRUD - Create)
const create = async (nome, matricula, curso_id, data_nascimento) => {
    const [result] = await db.query(
        'INSERT INTO alunos (nome, matricula, curso_id, data_nascimento) VALUES (?, ?, ?, ?)',
        [nome, matricula, curso_id, data_nascimento]
    );
    return { id: result.insertId, nome, matricula, curso_id };
};

// 3. Consulta: Listar todos os alunos COM o nome do curso (JOIN)
const findAllWithCourse = async () => {
    const [rows] = await db.query(`
        SELECT 
            a.id, 
            a.nome, 
            a.matricula, 
            a.data_nascimento, 
            a.ativo, 
            c.nome_curso 
        FROM alunos a
        LEFT JOIN cursos c ON a.curso_id = c.id
        ORDER BY a.nome
    `); // 3. Consulta com Junção (JOIN) [cite: 1910]
    return rows;
};

// 2. Edição: Atualizar dados de um aluno (CRUD - Update)
const update = async (id, nome, matricula, data_nascimento) => {
    const [result] = await db.query(
        'UPDATE alunos SET nome = ?, matricula = ?, data_nascimento = ? WHERE id = ?',
        [nome, matricula, data_nascimento, id]
    );
    return result.affectedRows > 0;
};

// 2. Edição: Alterar o curso de um aluno (Relacionamento - Chave Estrangeira)
const updateCourse = async (alunoId, novoCursoId) => {
    const [result] = await db.query(
        'UPDATE alunos SET curso_id = ? WHERE id = ?',
        [novoCursoId, alunoId] // 2. Edição com Chave Estrangeira
    );
    return result.affectedRows > 0;
};

// 4. Exclusão: Excluir aluno (CRUD - Delete)
const remove = async (id) => {
    const [result] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    create,
    findAllWithCourse,
    update,
    updateCourse,
    remove,
};

// sga-backend/src/models/alunoModel.js (Adição)
// ... (código existente)

// Busca um aluno pelo ID
const findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);
    return rows[0]; 
};

module.exports = {
    create,
    findAllWithCourse,
    update,
    updateCourse,
    remove,
    findById, // Exportar o novo método
};