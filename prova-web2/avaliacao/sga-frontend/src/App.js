// sga-frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importando páginas e o contexto de autenticação
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Alunos from './pages/Alunos';
// sga-frontend/src/App.js


import Cursos from './pages/Cursos'; // IMPORTAÇÃO DE CURSOS
import Professores from './pages/Professores'; // 1. IMPORTAÇÃO DO NOVO COMPONENTE
import Dashboard from './pages/Dashboard'; 
import { AuthProvider, useAuth } from './AuthContext'; 


// Componente PrivateRoute para proteger rotas
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    
    if (loading) {
        return <div>Carregando...</div>; 
    }
    
    // Se não estiver logado, redireciona para a página de Login
    return isLoggedIn ? children : <Navigate to="/login" />;
};


// Componente principal AppRoutes
const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> 
                    
                    {/* Rotas Protegidas */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/alunos" 
                        element={
                            <PrivateRoute>
                                <Alunos />
                            </PrivateRoute>
                        } 
                    />
                    <Route // Rota protegida para Cursos
                        path="/cursos" 
                        element={
                            <PrivateRoute>
                                <Cursos />
                            </PrivateRoute>
                        } 
                    />

                    

                    <Route // NOVA ROTA PROTEGIDA PARA PROFESSORES
                        path="/professores" 
                        element={
                            <PrivateRoute>
                                <Professores />
                            </PrivateRoute>
                        } 
                    />
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