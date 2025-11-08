// sga-backend/src/routes/cursoRoutes.js
const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const isAuthenticated = require('../middlewares/authMiddleWare');

// Rotas RESTful CRUD para Cursos (Protegidas)

// 1. Cadastro: Criar novo curso (POST /api/cursos)
router.post('/', isAuthenticated, cursoController.create);

// 3. Consulta: Listar todos os cursos (GET /api/cursos)
router.get('/', isAuthenticated, cursoController.findAll);

// 4. Exclusão: Excluir curso (DELETE /api/cursos/:id)
// Implementar lógica de verificação de alunos no Controller!
router.delete('/:id', isAuthenticated, cursoController.remove);

module.exports = router;