// sga-frontend/src/api/alunosApi.js
import { apiCall } from './sgaApi';

// =================================================================
// 3. Funções CRUD para Alunos (Rotas: /api/alunos)
// =================================================================

export const fetchAlunos = () => { 
    return apiCall('get', '/alunos');
};

export const fetchAlunoById = (id) => { 
    return apiCall('get', `/alunos/${id}`);
};

export const createAluno = (alunoData) => {
    return apiCall('post', '/alunos', alunoData);
};

export const updateAluno = (id, alunoData) => { 
    return apiCall('put', `/alunos/${id}`, alunoData);
};

export const updateAlunoCourse = (id, alunoData) => { 
    return apiCall('put', `/alunos/${id}/curso`, { novo_curso_id: alunoData.curso_id }); 
};

export const deleteAluno = (id) => {
    return apiCall('delete', `/alunos/${id}`); 
};