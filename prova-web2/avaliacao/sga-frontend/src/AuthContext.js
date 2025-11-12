// sga-frontend/src/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
    checkAuthStatus, 
    login as apiLogin, 
    logout as apiLogout, 
    register as apiRegister 
} from './api/authApi'; // Deve ser './api/authApi'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função que verifica o status de autenticação (usada na inicialização)
    const verifyAuthStatus = async () => {
        try {
            const response = await checkAuthStatus(); // 'response' é agora { isLoggedIn, userId, nome }
            if (response.isLoggedIn) { // ✅ CORRIGIDO (removida a propriedade '.data')
                setIsLoggedIn(true);
                setUser({ 
                    userId: response.userId, 
                    nome: response.nome 
                });
        } else {
                // Caso a API retorne 200, mas diga que não está logado
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (error) {
            // O erro 401 é esperado se não houver sessão ativa.
            if (error.response && error.response.status === 401) {
                console.log("Sessão não encontrada ou expirada (esperado).");
            } else {
                console.error("Erro ao verificar status de autenticação:", error);
            }
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyAuthStatus();
    }, []);

    // sga-frontend/src/AuthContext.js - Função login
    const login = async (email, senha) => {
        setLoading(true);
        try {
            const response = await apiLogin(email, senha); // 'response' é agora { message, nome, userId }
            setIsLoggedIn(true);
            setUser({ 
                userId: response.userId, // ✅ CORRIGIDO
                nome: response.nome      // ✅ CORRIGIDO
            });
            return { success: true };
        } catch (error) {
            console.error("Erro durante o login:", error);
            setIsLoggedIn(false);
            setUser(null);
            return { 
                success: false, 
                error: error.response?.data?.erro || 'Erro de rede ou credenciais inválidas.' 
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await apiLogout(); // POST /api/auth/logout
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error("Erro durante o logout:", error);
        } finally {
            setLoading(false);
        }
    };

    // sga-frontend/src/AuthContext.js - Função register
    const register = async (nome, email, senha) => {
        setLoading(true);
        try {
            const response = await apiRegister(nome, email, senha); // 'response' é agora { id, nome, message }
            // Assumimos que o registro faz o login automaticamente (como no seu authController)
            setIsLoggedIn(true);
            setUser({ 
                userId: response.id,   // ✅ CORRIGIDO (usando 'response.id')
                nome: response.nome    // ✅ CORRIGIDO
            });
            return { success: true };
        } catch (error) {
            console.error("Erro durante o registro:", error);
            setLoading(false);
            return { 
                success: false, 
                error: error.response?.data?.erro || 'Erro de rede ou email já cadastrado.' 
            };
        }
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, register, verifyAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};