// sga-frontend/src/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthStatus, login as apiLogin, logout as apiLogout, register as apiRegister } from './api/sgaApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função que verifica o status de autenticação (usada na inicialização)
    const verifyAuthStatus = async () => {
        try {
            const response = await checkAuthStatus(); // GET /api/auth/me
            if (response.data.isLoggedIn) {
                setIsLoggedIn(true);
                setUser({ 
                    userId: response.data.userId, 
                    nome: response.data.nome 
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

    const login = async (email, senha) => {
        setLoading(true);
        try {
            const response = await apiLogin(email, senha); // POST /api/auth/login
            setIsLoggedIn(true);
            setUser({ 
                userId: response.data.userId, 
                nome: response.data.nome 
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

    const register = async (nome, email, senha) => {
        setLoading(true);
        try {
            const response = await apiRegister(nome, email, senha); // POST /api/auth/register
            // Assumimos que o registro faz o login automaticamente (como no seu authController)
            setIsLoggedIn(true);
            setUser({ 
                userId: response.data.id, 
                nome: response.data.nome 
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