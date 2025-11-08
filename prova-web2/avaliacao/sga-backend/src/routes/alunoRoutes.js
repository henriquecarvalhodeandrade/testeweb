
// sga-backend/src/routes/alunoRoutes.js
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const isAuthenticated = require('../middlewares/authMiddleWare');

// Rotas RESTful CRUD para Alunos (Protegidas)

// 1. Cadastro: Criar novo aluno (POST /api/alunos)
router.post('/', isAuthenticated, alunoController.create);

// 3. Consulta: Listar todos os alunos com nome do curso (GET /api/alunos)
router.get('/', isAuthenticated, alunoController.findAll); // 3. Consulta com JOIN

// 2. Edição: Atualizar dados do aluno (PUT /api/alunos/:id)
router.put('/:id', isAuthenticated, alunoController.update);

// 2. Edição: Alterar curso do aluno (PUT /api/alunos/:id/curso) - Chave Estrangeira
router.put('/:id/curso', isAuthenticated, alunoController.updateCourse); // 2. Edição com Chave Estrangeira

// 4. Exclusão: Excluir aluno (DELETE /api/alunos/:id)
router.delete('/:id', isAuthenticated, alunoController.remove);

module.exports = router;

// sga-backend/src/routes/alunoRoutes.js (Adição)
// ... (código existente)

// 3. Consulta: Obter aluno específico por ID (GET /api/alunos/:id)
router.get('/:id', isAuthenticated, alunoController.findById);

// ... (Restante das rotas)