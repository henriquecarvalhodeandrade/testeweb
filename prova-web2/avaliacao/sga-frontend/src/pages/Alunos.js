// sga-frontend/src/pages/Alunos.js (Atualização)
import React, { useState, useEffect } from 'react';
import AlunoCard from '../components/AlunoCard';
import AlunoForm from '../components/Forms/AlunoForm'; // Novo
import { fetchAlunos, deleteAluno, fetchAlunoById } from '../api/sgaApi';

const Alunos = ({ user }) => {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar formulário de cadastro
    const [editingAluno, setEditingAluno] = useState(null); // Estado para edição

    const loadAlunos = async () => {
        try {
            const data = await fetchAlunos(); // 3. Consulta: Listar todos (com JOIN)
            setAlunos(data);
            setLoading(false);
        } catch (err) {
            setError('Falha ao carregar alunos. Tente recarregar ou fazer login novamente.');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAlunos();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este aluno? Esta ação é irreversível.')) {
            try {
                await deleteAluno(id); // 4. Exclusão: Chama API DELETE
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            } catch (err) {
                alert('Erro ao excluir aluno. Verifique se o backend está rodando.');
            }
        }
    };
    
    const handleEdit = async (id) => {
        try {
            const aluno = await fetchAlunoById(id); // Busca dados para preencher o formulário
            setEditingAluno(aluno);
            setShowForm(true);
        } catch(err) {
             setError('Erro ao carregar dados para edição.');
        }
    }

    const handleSuccess = () => {
        setShowForm(false);
        setEditingAluno(null);
        loadAlunos(); // Recarrega a lista após CRUD
    };

    if (loading) return <h2>Carregando alunos...</h2>;
    if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Gerenciamento de Alunos 📚</h1>
            
            <button 
                onClick={() => { setShowForm(true); setEditingAluno(null); }}
                style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
            >
                ➕ Cadastrar Novo Aluno
            </button>
            
            {/* Renderização Condicional do Formulário */}
            {(showForm || editingAluno) && (
                <div style={{ padding: '20px', border: '1px dashed #0056b3', marginBottom: '20px' }}>
                     <button onClick={() => {setShowForm(false); setEditingAluno(null);}} style={{ float: 'right', background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc3545' }}>
                         X Fechar
                     </button>
                    <AlunoForm alunoParaEditar={editingAluno} onSuccess={handleSuccess} />
                </div>
            )}
            
            <h2>Lista de Alunos ({alunos.length} cadastrados)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {alunos.map(aluno => (
                    <AlunoCard 
                        key={aluno.id}
                        aluno={aluno}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default Alunos;