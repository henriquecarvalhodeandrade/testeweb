// sga-frontend/src/pages/Professores.js
import React, { useState, useEffect } from 'react';
import ProfessorCard from '../components/ProfessorCard'; 
import ProfessorForm from '../components/Forms/ProfessorForm'; 
import { fetchProfessores, deleteProfessor, fetchProfessorById } from '../api/sgaApi';

const Professores = ({ user }) => {
    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar formulário de cadastro
    const [editingProfessor, setEditingProfessor] = useState(null); // Estado para edição

    const loadProfessores = async () => {
        try {
            const data = await fetchProfessores(); 
            setProfessores(data);
            setLoading(false);
        } catch (err) {
            setError('Falha ao carregar professores. Tente recarregar ou fazer login novamente.');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfessores();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este professor? Esta ação é irreversível.')) {
            try {
                await deleteProfessor(id); 
                setProfessores(professores.filter(professor => professor.id !== id));
            } catch (err) {
                alert('Erro ao excluir professor. Verifique se o backend está rodando.');
            }
        }
    };
    
    const handleEdit = async (id) => {
        try {
            const professor = await fetchProfessorById(id); 
            setEditingProfessor(professor);
            setShowForm(true);
        } catch(err) {
             setError('Erro ao carregar dados para edição.');
        }
    }

    const handleSuccess = () => {
        setShowForm(false);
        setEditingProfessor(null);
        loadProfessores(); // Recarrega a lista após CRUD
    };

    if (loading) return <h2>Carregando professores...</h2>;
    if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Gerenciamento de Professores 🧑‍🏫</h1>
            
            <button 
                onClick={() => { setShowForm(true); setEditingProfessor(null); }}
                style={{ background: '#0056b3', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
            >
                ➕ Cadastrar Novo Professor
            </button>
            
            {/* Renderização Condicional do Formulário */}
            {(showForm || editingProfessor) && (
                <div style={{ padding: '20px', border: '1px dashed #0056b3', marginBottom: '20px' }}>
                     <button onClick={() => {setShowForm(false); setEditingProfessor(null);}} style={{ float: 'right', background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc3545' }}>
                         X Fechar
                     </button>
                    <ProfessorForm professorParaEditar={editingProfessor} onSuccess={handleSuccess} />
                </div>
            )}
            
            <h2>Lista de Professores ({professores.length} cadastrados)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {professores.map(professor => (
                    <ProfessorCard 
                        key={professor.id}
                        professor={professor}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default Professores;