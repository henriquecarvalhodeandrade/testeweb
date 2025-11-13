// sga-frontend/src/App.js (REFATORADO)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Componentes de Layout
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Alunos from './pages/Alunos';
import Cursos from './pages/Cursos';
import Professores from './pages/Professores';

// Estilos
// ATUALIZAR IMPORTS:
import layoutStyles from './styles/components/Layout.module.css';

// Proteção de rotas
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="container text-center mt-4">
        <div>Carregando...</div>
      </div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <div className={layoutStyles.app}>
    <Navbar />
    <Header />
    <main className={layoutStyles.content}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas Protegidas */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/alunos" element={<PrivateRoute><Alunos /></PrivateRoute>} />
        <Route path="/cursos" element={<PrivateRoute><Cursos /></PrivateRoute>} />
        <Route path="/professores" element={<PrivateRoute><Professores /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
    <Footer />
  </div>
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