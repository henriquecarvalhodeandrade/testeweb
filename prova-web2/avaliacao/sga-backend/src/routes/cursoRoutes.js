// sga-backend/src/routes/cursoRoutes.js
const express = require('express');
const cursoController = require('../controllers/cursoController');
const { requireAuth } = require('../middlewares/authMiddleWare'); 

const router = express.Router();

// Todas as rotas de curso requerem autenticação
router.use(requireAuth); 

// Rota para listar todos os cursos (Read All)
router.get('/', cursoController.findAll);

// Rota para buscar um curso por ID (Read One)
router.get('/:id', cursoController.findById); 

// Rota para cadastrar um novo curso (Create)
router.post('/', cursoController.create);

// Rota para atualizar um curso por ID (Update)
router.put('/:id', cursoController.update);

// Rota para excluir um curso por ID (Delete)
router.delete('/:id', cursoController.remove);

module.exports = router;