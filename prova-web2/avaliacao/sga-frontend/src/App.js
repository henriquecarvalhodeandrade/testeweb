// sga-frontend/src/App.js (Versão Completa com AuthProvider)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importando páginas e o contexto de autenticação
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Adicionar esta linha
import Alunos from './pages/Alunos';
import { AuthProvider, useAuth } from './AuthContext'; // Importando AuthProvider e useAuth


// Componente PrivateRoute para proteger rotas
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    
    if (loading) {
        return <div>Carregando...</div>; 
    }
    
    // Se não estiver logado, redireciona para a página de Login
    return isLoggedIn ? children : <Navigate to="/login" />;
};


// Componente principal AppRoutes (agora sem o useEffect problemático)
const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* ADICIONADO A ROTA DE REGISTRO */}
                    
                    {/* Rotas Protegidas */}
                    <Route 
                        path="/alunos" 
                        element={
                            <PrivateRoute>
                                <Alunos />
                            </PrivateRoute>
                        } 
                    />
                    {/* Adicione outras rotas protegidas aqui (ex: Cursos, Professores, etc) */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

// Componente Wrapper para fornecer o contexto de autenticação
function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;