// sga-backend/src/controllers/cursoController.js
const cursoModel = require('../models/cursoModel');
const db = require('../config/db'); // Para a verificação de alunos associados

// 1. Cadastro de Cursos (Create)
const create = async (req, res) => {
    const { nome_curso, carga_horaria } = req.body;
    if (!nome_curso || !carga_horaria || carga_horaria <= 0) {
        return res.status(400).json({ erro: 'Nome do curso e carga horária válida são obrigatórios.' });
    }
    try {
        const novoCurso = await cursoModel.create(nome_curso, carga_horaria);
        res.status(201).json(novoCurso);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao cadastrar curso.' });
    }
};

// 3. Consulta: Listar todos os cursos (Read All)
const findAll = async (req, res) => {
    try {
        const cursos = await cursoModel.findAll();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar cursos.' });
    }
};

// NOVO: 3. Consulta: Buscar curso por ID (Read One)
const findById = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await cursoModel.findById(id);
        if (!curso) {
            return res.status(404).json({ erro: 'Curso não encontrado.' });
        }
        res.json(curso);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar curso.' });
    }
};

// NOVO: 2. Atualização de Curso (Update)
const update = async (req, res) => {
    const { id } = req.params;
    const { nome_curso, carga_horaria } = req.body;
    
    if (!nome_curso || !carga_horaria || carga_horaria <= 0) {
        return res.status(400).json({ erro: 'Nome do curso e carga horária válida são obrigatórios.' });
    }

    try {
        const isUpdated = await cursoModel.update(id, nome_curso, carga_horaria);
        if (isUpdated) {
            // Retorna o curso atualizado para o frontend
            const cursoAtualizado = await cursoModel.findById(id); 
            return res.json(cursoAtualizado);
        }
        res.status(404).json({ erro: 'Curso não encontrado para atualização.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar curso.' });
    }
};

// 4. Exclusão de Curso (Delete - FINALIZADO)
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        // 4. Exclusão com verificação de alunos associados
        const [alunosAssociados] = await db.query('SELECT id FROM alunos WHERE curso_id = ?', [id]);
        
        if (alunosAssociados.length > 0) {
            // Se houver alunos, a exclusão é barrada com erro 400 
            return res.status(400).json({ 
                erro: 'Exclusão não permitida.', 
                detalhe: `Existem ${alunosAssociados.length} alunos associados a este curso.`
            });
        }

        const isRemoved = await cursoModel.remove(id); 
        if (isRemoved) {
            return res.status(204).send(); // 204 No Content para DELETE bem-sucedido
        }
        
        res.status(404).json({ erro: 'Curso não encontrado para exclusão.' }); 

    } catch (error) {
        console.error('Erro ao excluir curso:', error);
        res.status(500).json({ erro: 'Erro interno ao excluir curso.' });
    }
};

module.exports = {
    create,
    findAll,
    findById, 
    update,   
    remove,
};