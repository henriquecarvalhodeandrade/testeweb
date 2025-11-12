// sga-frontend/src/pages/Cursos.js
import React, { useState, useEffect } from 'react';
import CursoCard from '../components/CursoCard'; 
import CursoForm from '../components/Forms/CursoForm'; 
// IMPORT REFACTOR: Importando de cursosApi
import { fetchCursos, deleteCurso, fetchCursoById } from '../api/cursosApi'; 

const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); 
    const [editingCurso, setEditingCurso] = useState(null); 

    const loadCursos = async () => {
        try {
            const data = await fetchCursos(); 
            setCursos(data);
            setLoading(false);
        } catch (err) {
            setError('Falha ao carregar cursos. Tente recarregar ou fazer login novamente.');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCursos();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este curso? Se houver alunos associados, a exclusão será bloqueada!')) {
            try {
                await deleteCurso(id); 
                setCursos(cursos.filter(curso => curso.id !== id));
            } catch (err) {
                 // A mensagem de erro do backend deve vir via err.message
                alert(`Erro ao excluir curso. Detalhe: ${err.message}`);
            }
        }
    };
    
    const handleEdit = async (id) => {
        try {
            const curso = await fetchCursoById(id); 
            setEditingCurso(curso);
            setShowForm(true);
        } catch(err) {
             setError('Erro ao carregar dados para edição.');
        }
    }

    const handleSuccess = () => {
        setShowForm(false);
        setEditingCurso(null);
        loadCursos(); // Recarrega a lista após CRUD
    };

    if (loading) return <h2>Carregando cursos...</h2>;
    if (error && !cursos.length) return <h2 style={{ color: 'red' }}>{error}</h2>; // Mostra erro se não houver cursos

    return (
        <div style={{ padding: '20px' }}>
            <h1>Gerenciamento de Cursos 📖</h1>
            
            <button 
                onClick={() => { setShowForm(true); setEditingCurso(null); }}
                style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
            >
                ➕ Cadastrar Novo Curso
            </button>
            
            {/* Renderização Condicional do Formulário */}
            {(showForm || editingCurso) && (
                <div style={{ padding: '20px', border: '1px dashed #0056b3', marginBottom: '20px' }}>
                     <button 
                         onClick={() => {setShowForm(false); setEditingCurso(null);}} 
                         style={{ float: 'right', background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc3545', fontSize: '18px' }}
                     >
                         X Fechar
                     </button>
                    <CursoForm cursoParaEditar={editingCurso} onSuccess={handleSuccess} />
                </div>
            )}
            
            <h2>Lista de Cursos ({cursos.length} cadastrados)</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {cursos.map(curso => (
                    <CursoCard 
                        key={curso.id}
                        curso={curso}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
            {!cursos.length && <p>Nenhum curso cadastrado ainda.</p>}
        </div>
    );
};

export default Cursos;