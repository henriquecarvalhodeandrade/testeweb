// sga-backend/src/routes/professorRoutes.js
const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
const isAuthenticated = require('../middlewares/authMiddleWare'); 

// Rotas RESTful CRUD para Professores (Protegidas)

// 1. Cadastro: Criar novo professor (POST /api/professores)
router.post('/', isAuthenticated, professorController.create);

// 3. Consulta: Listar todos os professores com nome do curso (GET /api/professores)
router.get('/', isAuthenticated, professorController.findAll); 

// 3. Consulta: Obter professor específico por ID (GET /api/professores/:id)
router.get('/:id', isAuthenticated, professorController.findById);

// 2. Edição: Atualizar dados do professor (PUT /api/professores/:id)
router.put('/:id', isAuthenticated, professorController.update);

// 2. Edição: Alterar curso do professor (PUT /api/professores/:id/curso) - Chave Estrangeira
router.put('/:id/curso', isAuthenticated, professorController.updateCourse); 

// 4. Exclusão: Excluir professor (DELETE /api/professores/:id)
router.delete('/:id', isAuthenticated, professorController.remove);

module.exports = router;