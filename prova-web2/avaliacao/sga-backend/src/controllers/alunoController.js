// sga-backend/src/controllers/alunoController.js
const alunoModel = require('../models/alunoModel');

// 1. Cadastro de Aluno (Create)
const create = async (req, res) => {
    const { nome, matricula, curso_id, data_nascimento } = req.body;
    try {
        const novoAluno = await alunoModel.create(nome, matricula, curso_id, data_nascimento);
        res.status(201).json(novoAluno); 
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ erro: 'Matrícula já cadastrada.' });
        }
        res.status(500).json({ erro: 'Erro interno ao cadastrar aluno.' });
    }
};

// 3. Consulta: Listar todos os alunos com nome do curso (Read - com JOIN)
const findAll = async (req, res) => {
    try {
        const alunos = await alunoModel.findAllWithCourse(); 
        res.json(alunos);
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(500).json({ erro: 'Erro ao listar alunos.' });
    }
};

// 3. Consulta: Obter um aluno específico por ID (Read)
const findById = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await alunoModel.findById(id);
        if (aluno) {
            return res.json(aluno);
        }
        res.status(404).json({ erro: 'Aluno não encontrado' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar aluno.' });
    }
};


// 2. Edição: Atualizar dados de um aluno (Update)
const update = async (req, res) => {
    const { id } = req.params;
    const { nome, matricula, data_nascimento } = req.body; 

    try {
        const isUpdated = await alunoModel.update(id, nome, matricula, data_nascimento);
        
        if (isUpdated) {
            return res.json({ message: 'Dados do aluno atualizados com sucesso.' });
        }
        res.status(404).json({ erro: 'Aluno não encontrado.' }); 

    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar aluno.' });
    }
};

// 2. Edição: Alterar curso do aluno (Update - Chave Estrangeira)
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { novo_curso_id } = req.body; 

    try {
        const isUpdated = await alunoModel.updateCourse(id, novo_curso_id); 
        
        if (isUpdated) {
            return res.json({ message: 'Curso do aluno alterado com sucesso.' });
        }
        res.status(404).json({ erro: 'Aluno ou curso não encontrado.' });

    } catch (error) {
        console.error('Erro ao alterar curso do aluno:', error);
        res.status(500).json({ erro: 'Erro interno ao alterar curso.' });
    }
};

// 4. Exclusão: Excluir aluno (Delete)
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const isRemoved = await alunoModel.remove(id);
        
        if (isRemoved) {
            return res.status(204).send(); 
        }
        res.status(404).json({ erro: 'Aluno não encontrado.' });

    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        res.status(500).json({ erro: 'Erro interno ao excluir aluno.' });
    }
};

module.exports = {
    create,
    findAll,
    update,
    updateCourse,
    remove,
    findById, // Exportação necessária para findById
};