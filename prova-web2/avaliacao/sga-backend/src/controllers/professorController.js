// sga-backend/src/controllers/professorController.js
const professorModel = require('../models/professorModel');

// 1. Cadastro de Professor (Create)
const create = async (req, res) => {
    // CORREÇÃO: Definimos curso_id como opcional (default null) pois o formulário simples não o envia.
    // O backend agora aceitará o POST com apenas { nome, matricula }
    const { nome, matricula, curso_id = null } = req.body; 
    try {
        const novoProfessor = await professorModel.create(nome, matricula, curso_id);
        res.status(201).json(novoProfessor); 
    } catch (error) {
        console.error('Erro ao cadastrar professor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ erro: 'Matrícula de professor já cadastrada.' });
        }
        res.status(500).json({ erro: 'Erro interno ao cadastrar professor.' });
    }
};

// 3. Consulta: Listar todos os professores com nome do curso (Read - com JOIN)
const findAll = async (req, res) => {
    try {
        const professores = await professorModel.findAllWithCourse(); 
        res.json(professores);
    } catch (error) {
        console.error('Erro ao listar professores:', error);
        res.status(500).json({ erro: 'Erro ao listar professores.' });
    }
};

// 3. Consulta: Obter um professor específico por ID (Read)
const findById = async (req, res) => {
    const { id } = req.params;
    try {
        const professor = await professorModel.findById(id);
        if (professor) {
            return res.json(professor);
        }
        res.status(404).json({ erro: 'Professor não encontrado' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar professor.' });
    }
};


// 2. Edição: Atualizar dados de um professor (Update)
const update = async (req, res) => {
    const { id } = req.params;
    // O frontend envia { nome, matricula } - sem curso_id para edição básica
    const { nome, matricula } = req.body; 

    try {
        const isUpdated = await professorModel.update(id, nome, matricula);
        
        if (isUpdated) {
            return res.json({ message: 'Dados do professor atualizados com sucesso.' });
        }
        res.status(404).json({ erro: 'Professor não encontrado.' }); 

    } catch (error) {
        console.error('Erro ao atualizar professor:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar professor.' });
    }
};

// 2. Edição: Alterar curso do professor (Update - Chave Estrangeira)
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { novo_curso_id } = req.body; 

    try {
        const isUpdated = await professorModel.updateCourse(id, novo_curso_id); 
        
        if (isUpdated) {
            return res.json({ message: 'Curso principal do professor alterado com sucesso.' });
        }
        res.status(404).json({ erro: 'Professor ou curso não encontrado.' });

    } catch (error) {
        console.error('Erro ao alterar curso do professor:', error);
        res.status(500).json({ erro: 'Erro interno ao alterar curso do professor.' });
    }
};

// 4. Exclusão: Excluir professor (Delete)
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const isRemoved = await professorModel.remove(id);
        
        if (isRemoved) {
            return res.status(204).send(); 
        }
        res.status(404).json({ erro: 'Professor não encontrado.' });

    } catch (error) {
        console.error('Erro ao excluir professor:', error);
        res.status(500).json({ erro: 'Erro interno ao excluir professor.' });
    }
};

module.exports = {
    create,
    findAll,
    update,
    updateCourse,
    remove,
    findById,
};