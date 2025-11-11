// sga-frontend/src/pages/Alunos.js (Modificado para Tabela)
import React, { useState, useEffect } from 'react';
// import AlunoCard from '../components/AlunoCard'; // Não é mais necessário para a exibição em tabela
import AlunoForm from '../components/Forms/AlunoForm'; 
import { fetchAlunos, deleteAluno, fetchAlunoById } from '../api/sgaApi';

const Alunos = ({ user }) => {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingAluno, setEditingAluno] = useState(null);

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

    // Estilos para a tabela
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '15px',
    };
    
    const thStyle = {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };
    
    const actionButtonStyle = {
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        border: 'none',
        marginRight: '5px',
    };
    
    const editButtonStyle = {
        ...actionButtonStyle,
        background: '#007bff', 
        color: '#fff', 
    };
    
    const deleteButtonStyle = {
        ...actionButtonStyle,
        background: '#dc3545', 
        color: '#fff', 
    };

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
            
            {/* Tabela de Alunos */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{...thStyle, width: '5%'}}>ID</th>
                        <th style={{...thStyle, width: '15%'}}>Matrícula</th>
                        <th style={{...thStyle, width: '25%'}}>Nome</th>
                        <th style={{...thStyle, width: '25%'}}>Curso</th>
                        <th style={{...thStyle, width: '15%'}}>Data Nasc.</th>
                        <th style={{...thStyle, width: '15%'}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map(aluno => (
                        <tr key={aluno.id} style={{ backgroundColor: '#fff' }}>
                            <td style={tdStyle}>{aluno.id}</td>
                            <td style={tdStyle}>{aluno.matricula}</td>
                            <td style={tdStyle}>{aluno.nome}</td>
                            <td style={tdStyle}>{aluno.nome_curso || 'Não Associado'}</td>
                            <td style={tdStyle}>{aluno.data_nascimento}</td>
                            <td style={tdStyle}>
                                <button 
                                    onClick={() => handleEdit(aluno.id)} 
                                    style={editButtonStyle}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(aluno.id)} 
                                    style={deleteButtonStyle}
                                >
                                    🗑️ Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default Alunos;