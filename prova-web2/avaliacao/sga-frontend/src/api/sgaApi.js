// sga-frontend/src/api/sgaApi.js

import axios from 'axios';

// 1. Configura a instância do Axios para a base URL do backend
const sgaApi = axios.create({
    baseURL: 'http://localhost:3001/api', 
    withCredentials: true, 
});

// FUNÇÃO HELPER: Para extrair o .data automaticamente e padronizar o tratamento de erro.
const apiCall = async (method, url, data = null) => {
    try {
        const response = await sgaApi.request({ method, url, data });
        return response.data; // Retorna APENAS o payload de dados
    } catch (error) {
        // CORREÇÃO: Padroniza o erro para garantir que ele seja sempre lançado e contenha uma mensagem útil.
        const errorMessage = error.response 
            ? error.response.data.erro || 'Erro do servidor.' // Pega a mensagem de erro do backend (ex: 'Credenciais inválidas.')
            : 'Erro de conexão de rede.'; // Para falhas de rede (onde error.response é undefined)

        // Lança o erro com a mensagem extraída para ser pego pelo catch em AuthContext.js/Login.js
        throw new Error(errorMessage); 
    }
}

// =================================================================
// 2. Funções de Autenticação (Rotas: /api/auth)
// =================================================================

export const register = (nome, email, senha) => {
    return apiCall('post', '/auth/register', { nome, email, senha });
};

export const login = (email, senha) => {
    return apiCall('post', '/auth/login', { email, senha });
};

export const logout = () => {
    // Não precisa de .data, pois 204 No Content é comum, mas mantemos o padrão
    return apiCall('post', '/auth/logout');
};

// Mapeado do getLoggedInUser (Backend) para o nome esperado pelo Frontend (checkAuthStatus)
export const checkAuthStatus = () => { 
    return apiCall('get', '/auth/me'); // Retorna response.data
};

// =================================================================
// 3. Funções CRUD para Alunos (Rotas: /api/alunos)
// =================================================================

// Mapeado de getAllAlunos para o nome esperado pelo Frontend (fetchAlunos)
export const fetchAlunos = () => { 
    return apiCall('get', '/alunos'); // Retorna response.data (Array de alunos)
};

// Função para buscar um único aluno por ID
export const fetchAlunoById = (id) => { 
    return apiCall('get', `/alunos/${id}`); // Retorna response.data (Objeto aluno)
};

export const createAluno = (alunoData) => {
    return apiCall('post', '/alunos', alunoData); // Retorna response.data
};

// Nome da função que o AlunoForm.js espera
export const updateAluno = (id, alunoData) => { 
    return apiCall('put', `/alunos/${id}`, alunoData); // Retorna response.data (Objeto/Mensagem de sucesso)
};

// Mantemos o updateAlunoCourse por compatibilidade
export const updateAlunoCourse = (id, alunoData) => { 
    return apiCall('put', `/alunos/${id}/curso`, { novo_curso_id: alunoData.curso_id }); 
};

export const deleteAluno = (id) => {
    // Retorna 204 No Content, mas o helper retorna response.data (vazio/mensagem de sucesso)
    return apiCall('delete', `/alunos/${id}`); 
};


// =================================================================
// 4. Funções CRUD para Cursos (Rotas: /api/cursos)
// =================================================================

// Mapeado de getAllCursos para o nome esperado pelo Frontend (fetchCursos)
export const fetchCursos = () => { 
    return apiCall('get', '/cursos'); // Retorna response.data (Array de cursos)
};

export const createCurso = (cursoData) => {
    return apiCall('post', '/cursos', cursoData);
};

export const updateCurso = (id, cursoData) => {
    return apiCall('put', `/cursos/${id}`, cursoData);
};

export const deleteCurso = (id) => {
    return apiCall('delete', `/cursos/${id}`);
};


// Exporta a instância do axios configurada para uso direto, se necessário
export default sgaApi;