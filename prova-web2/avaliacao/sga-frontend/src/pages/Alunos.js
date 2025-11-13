// sga-frontend/src/pages/Alunos.js (REFATORADO COM TABELA)
import React, { useState, useEffect } from 'react';
import AlunoForm from '../components/Forms/AlunoForm';
import { fetchAlunos, deleteAluno, fetchAlunoById } from '../api/alunosApi';
// ATUALIZAR IMPORTS:
import managementStyles from '../styles/pages/Management.module.css';
import tableStyles from '../styles/components/Tables.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const Alunos = () => {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingAluno, setEditingAluno] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const loadAlunos = async () => {
        try {
            const data = await fetchAlunos();
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
                await deleteAluno(id);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            } catch (err) {
                alert('Erro ao excluir aluno. Verifique se o backend está rodando.');
            }
        }
    };
    
    const handleEdit = async (id) => {
        try {
            const aluno = await fetchAlunoById(id);
            setEditingAluno(aluno);
            setShowForm(true);
        } catch(err) {
             setError('Erro ao carregar dados para edição.');
        }
    }

    const handleSuccess = () => {
        setShowForm(false);
        setEditingAluno(null);
        loadAlunos();
    };

    // Filtro de busca
    const filteredAlunos = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (aluno.nome_curso && aluno.nome_curso.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className={managementStyles.managementPage}>
            <div className={tableStyles.tableLoading}>Carregando alunos...</div>
        </div>
    );

    if (error && !alunos.length) return (
        <div className={managementStyles.managementPage}>
            <div style={{ color: 'var(--error-color)' }}>{error}</div>
        </div>
    );

    return (
        <div className={managementStyles.managementPage}>
            {/* Header */}
            <div className={managementStyles.pageHeader}>
                <h1 className={managementStyles.pageTitle}>
                    👨‍🎓 Gerenciamento de Alunos
                </h1>
                <p className={managementStyles.pageDescription}>
                    Cadastre, visualize e gerencie todos os alunos do sistema
                </p>
            </div>

            {/* Barra de Ações e Estatísticas */}
            <div className={managementStyles.pageActions}>
                <button 
                    onClick={() => { setShowForm(true); setEditingAluno(null); }}
                    className={`${buttonStyles.button} ${buttonStyles.primary}`}
                >
                    ➕ Novo Aluno
                </button>
                
                <div className={managementStyles.searchBox}>
                    <input
                        type="text"
                        placeholder="Buscar por nome, matrícula ou curso..."
                        className={managementStyles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span>🔍</span>
                </div>
            </div>
            
            {/* Modal do Formulário */}
            {showForm && (
                <div className={managementStyles.formModal}>
                    <div className={managementStyles.formModalContent}>
                        <div className={managementStyles.formModalHeader}>
                            <h2 className={managementStyles.formModalTitle}>
                                {editingAluno ? '✏️ Editar Aluno' : '➕ Novo Aluno'}
                            </h2>
                            <button 
                                onClick={() => {setShowForm(false); setEditingAluno(null);}} 
                                className={`${buttonStyles.button} ${buttonStyles.outlineSecondary} ${buttonStyles.small}`}
                            >
                                ✕ Fechar
                            </button>
                        </div>
                        <div className={managementStyles.formModalBody}>
                            <AlunoForm alunoParaEditar={editingAluno} onSuccess={handleSuccess} />
                        </div>
                    </div>
                </div>
            )}

            {/* Tabela de Alunos */}
            <div className={tableStyles.tableContainer}>
                <div className={tableStyles.tableHeader}>
                    <h3 className={tableStyles.tableTitle}>
                        Lista de Alunos ({filteredAlunos.length})
                    </h3>
                </div>

                <div className={tableStyles.tableResponsive}>
                    <table className={tableStyles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Matrícula</th>
                                <th>Nome</th>
                                <th>Curso</th>
                                <th>Data Nasc.</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlunos.map(aluno => (
                                <tr key={aluno.id}>
                                    <td>
                                        <span className={tableStyles.badge}>
                                            #{aluno.id}
                                        </span>
                                    </td>
                                    <td>
                                        <strong>{aluno.matricula}</strong>
                                    </td>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{aluno.nome}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {aluno.nome_curso || (
                                            <span style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>
                                                Não associado
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {aluno.data_nascimento || '-'}
                                    </td>
                                    <td>
                                        <div className={tableStyles.actionsCell}>
                                            <button 
                                                onClick={() => handleEdit(aluno.id)} 
                                                className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}
                                                title="Editar aluno"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(aluno.id)} 
                                                className={`${buttonStyles.button} ${buttonStyles.danger} ${buttonStyles.small}`}
                                                title="Excluir aluno"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAlunos.length === 0 && (
                    <div className={tableStyles.tableEmpty}>
                        <div className={tableStyles.emptyIcon}>👨‍🎓</div>
                        <div className={tableStyles.emptyText}>
                            {searchTerm ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado'}
                        </div>
                        {!searchTerm && (
                            <button 
                                onClick={() => setShowForm(true)}
                                className={`${buttonStyles.button} ${buttonStyles.primary}`}
                            >
                                ➕ Cadastrar Primeiro Aluno
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alunos;