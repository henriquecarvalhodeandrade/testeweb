// sga-frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Alunos from './pages/Alunos';
import Cursos from './pages/Cursos';
import Professores from './pages/Professores';
import Dashboard from './pages/Dashboard';

import { AuthProvider, useAuth } from './AuthContext';

// Proteção de rotas
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <Header />
    <main className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <Cursos />
            </PrivateRoute>
          }
        />

        <Route
          path="/professores"
          element={
            <PrivateRoute>
              <Professores />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
    <Footer />
  </>
);

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
