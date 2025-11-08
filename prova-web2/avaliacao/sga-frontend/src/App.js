// sga-frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { checkAuthStatus } from './api/sgaApi';

// Componentes Reutilizáveis
import Navbar from './components/Navbar'; // 7. Componente Reutilizável
import Footer from './components/Footer'; // 7. Componente Reutilizável

// Páginas (Views)
import Home from './pages/Home';
import Login from './pages/Login';
import Alunos from './pages/Alunos';
import Cursos from './pages/Cursos';

// Componente para proteger rotas (Similar ao Middleware no Backend)
const ProtectedRoute = ({ children, isAuthenticated }) => {
    // Redireciona para o login se não estiver autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    // Estado para armazenar informações do usuário logado 
    const [user, setUser] = useState(null); // null: não checado, false: deslogado, object: logado
    const [loading, setLoading] = useState(true);

    // Efeito para checar o status de autenticação ao carregar a aplicação
    useEffect(() => {
        const verifyAuth = async () => {
            const authData = await checkAuthStatus();
            setUser(authData.isLoggedIn ? authData : false);
            setLoading(false);
        };
        verifyAuth();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h2>Carregando sistema... ⌛</h2>
                <p>Verificando autenticação...</p>
            </div>
        );
    }

    // Passamos o estado do usuário e a função para atualizá-lo para os componentes
    const isAuthenticated = user && user.isLoggedIn;

    return (
        <Router>
            <div className="App-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar user={user} setUser={setUser} isAuthenticated={isAuthenticated} />
                
                <main style={{ flexGrow: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home user={user} />} />
                        
                        {/* Rota de Login */}
                        <Route path="/login" element={<Login setUser={setUser} />} />

                        {/* Rotas Protegidas (requerem login) */}
                        <Route 
                            path="/alunos" 
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Alunos user={user} />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/cursos" 
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Cursos />
                                </ProtectedRoute>
                            } 
                        />
                        {/* Rota para edição (exemplo) */}
                        <Route 
                            path="/alunos/editar/:id" 
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    {/* Componente de formulário de edição irá aqui */}
                                    <p>Página de Edição de Aluno...</p> 
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>
                
                <Footer /> {/* 7. Componente Reutilizável */}
            </div>
        </Router>
    );
}

export default App;