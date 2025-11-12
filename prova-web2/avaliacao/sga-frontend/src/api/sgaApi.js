// sga-frontend/src/api/sgaApi.js

import axios from 'axios';

// 1. Configura a instância do Axios para a base URL do backend
const sgaApi = axios.create({
    baseURL: 'http://localhost:3001/api', 
    withCredentials: true, 
});

/**
 * FUNÇÃO HELPER: Para extrair o .data automaticamente e padronizar o tratamento de erro.
 * @param {string} method - O método HTTP ('get', 'post', 'put', 'delete').
 * @param {string} url - A URL da API (relativa a baseURL).
 * @param {Object} [data=null] - Os dados a serem enviados no corpo da requisição.
 * @returns {Promise<Object>} - O payload de dados da resposta.
 * @throws {Error} - Lança um erro com uma mensagem amigável (backend ou de rede).
 */
export const apiCall = async (method, url, data = null) => {
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

// Exporta a instância do axios configurada para uso direto, se necessário
export default sgaApi;