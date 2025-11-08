// sga-frontend/src/api/sgaApi.js
import axios from 'axios';

// 1. Configuração da instância Axios
const api = axios.create({
    baseURL: 'http://localhost:3001/api', // URL base do nosso backend
    withCredentials: true, // ESSENCIAL para enviar os cookies de sessão com cada requisição
    headers: {
        'Content-Type': 'application/json',
    }
});

// 2. Funções de Consulta (Read - Alunos)
export const fetchAlunos = async () => {
    try {
        const response = await api.get('/alunos'); // GET /api/alunos
        return response.data; // Array de alunos (incluindo nome do curso via JOIN)
    } catch (error) {
        throw error;
    }
};

// 3. Função de Exclusão (Delete - Alunos)
export const deleteAluno = async (id) => {
    try {
        const response = await api.delete(`/alunos/${id}`); // DELETE /api/alunos/:id
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 4. Funções de Autenticação (Login/Logout)
export const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha }); // POST /api/auth/login
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout'); // POST /api/auth/logout
    return response.data;
};

export const checkAuthStatus = async () => {
    try {
        // GET /api/auth/me (protegida pelo middleware de autenticação no backend)
        const response = await api.get('/auth/me'); // 3. Consulta: Dados do usuário logado [cite: 547]
        return response.data;
    } catch (error) {
        return { isLoggedIn: false };
    }
};

// Exportar a instância configurada para uso em outras requisições
export default api;

// sga-frontend/src/api/sgaApi.js (Adições)
// ... (código existente)

// Consulta (Read - Cursos) - Necessário para o relacionamento no formulário de aluno
export const fetchCursos = async () => {
    try {
        const response = await api.get('/cursos'); // GET /api/cursos
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Consulta (Read - Aluno Específico)
export const fetchAlunoById = async (id) => {
    try {
        const response = await api.get(`/alunos/${id}`); 
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Cadastro (Create - Alunos)
export const createAluno = async (alunoData) => {
    try {
        const response = await api.post('/alunos', alunoData); // POST /api/alunos
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edição (Update - Alunos) - Para dados básicos
export const updateAluno = async (id, alunoData) => {
    try {
        // PUT /api/alunos/:id (dados básicos)
        const response = await api.put(`/alunos/${id}`, alunoData); 
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Edição (Update - Alunos) - Para relacionamento (Chave Estrangeira)
export const updateAlunoCourse = async (alunoId, novo_curso_id) => {
    try {
        // PUT /api/alunos/:id/curso (Chave Estrangeira)
        const response = await api.put(`/alunos/${alunoId}/curso`, { novo_curso_id });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ... (Restante das exportações)