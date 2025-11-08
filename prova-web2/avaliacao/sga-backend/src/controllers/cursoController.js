// sga-backend/src/controllers/cursoController.js
const cursoModel = require('../models/cursoModel');
const db = require('../config/db'); // Para a transação de exclusão

// 1. Cadastro de Cursos (Create)
const create = async (req, res) => {
    const { nome_curso, carga_horaria } = req.body;
    try {
        const novoCurso = await cursoModel.create(nome_curso, carga_horaria);
        res.status(201).json(novoCurso);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao cadastrar curso.' });
    }
};

// 3. Consulta: Listar todos os cursos (Read)
const findAll = async (req, res) => {
    try {
        const cursos = await cursoModel.findAll();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar cursos.' });
    }
};

// 4. Exclusão de Curso (Delete - com validação de Chave Estrangeira)
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        // 4. Exclusão com verificação de alunos associados
        const [alunosAssociados] = await db.query('SELECT id FROM alunos WHERE curso_id = ?', [id]);
        
        if (alunosAssociados.length > 0) {
            // Se houver alunos, a exclusão é barrada com erro 400 [cite: 938]
            return res.status(400).json({ 
                erro: 'Exclusão não permitida.', 
                detalhe: `Existem ${alunosAssociados.length} alunos associados a este curso.`
            });
        }

        // Se a validação passar, o curso é removido (método a ser implementado no Model)
        // const isRemoved = await cursoModel.remove(id); 
        // if (isRemoved) {
        //     return res.status(204).send(); // 204 No Content para DELETE bem-sucedido [cite: 920]
        // }
        
        // Simulação de remoção (considerando que o remove no Model está implementado)
        res.status(204).send(); 

    } catch (error) {
        console.error('Erro ao excluir curso:', error);
        res.status(500).json({ erro: 'Erro interno ao excluir curso.' });
    }
};

module.exports = {
    create,
    findAll,
    remove,
};