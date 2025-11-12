// sga-frontend/src/api/cursosApi.js
import { apiCall } from './sgaApi';

// =================================================================
// 4. Funções CRUD para Cursos (Rotas: /api/cursos)
// =================================================================

export const fetchCursos = () => { 
    return apiCall('get', '/cursos'); // Retorna response.data (Array de cursos)
};

// 💡 ADICIONADO: Função para buscar um único curso por ID (necessária pelo Cursos.js)
export const fetchCursoById = (id) => { 
    return apiCall('get', `/cursos/${id}`); // Retorna response.data (Objeto curso)
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