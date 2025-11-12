// sga-backend/server.js
require('dotenv').config(); // Carrega .env antes de tudo
const express = require('express');
const cors = require('cors');

// Importa configurações e rotas
const db = require('./src/config/db'); // Apenas para inicializar a conexão
const sessionConfig = require('./src/config/session');
const authRoutes = require('./src/routes/authRoutes');
const alunoRoutes = require('./src/routes/alunoRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const professorRoutes = require('./src/routes/professorRoutes'); // Importar novas rotas

const app = express();
const PORT = process.env.PORT || 3001;

// sga-backend/server.js
app.use(cors({
    origin: 'http://localhost:3000', // OK
    credentials: true // OK
}));
app.use(express.json()); // Interpreta corpo da requisição JSON
app.use(express.urlencoded({ extended: true })); // Interpreta dados de formulário
app.use(sessionConfig); // Configura o middleware de sessão

// Rotas da API (Prefixadas com /api para clareza e versionamento)
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes); // Rotas RESTful para Alunos
app.use('/api/cursos', cursoRoutes); // Rotas RESTful para Cursos
app.use('/api/professores', professorRoutes); // Adicionar Rotas RESTful para Professores

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API SGA rodando.' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});