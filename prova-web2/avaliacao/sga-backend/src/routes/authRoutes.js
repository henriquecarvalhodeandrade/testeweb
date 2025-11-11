// sga-backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middlewares/authMiddleWare');

// Cadastro de novo usuário
router.post('/register', authController.register); // POST /api/auth/register

// Login de usuário
router.post('/login', authController.login);       // POST /api/auth/login

// Logout de usuário
router.post('/logout', authController.logout);     // POST /api/auth/logout

// 3. Consulta: Obter dados do usuário logado (protegido)
router.get('/me', isAuthenticated, authController.getLoggedInUser); // GET /api/auth/me

module.exports = router;