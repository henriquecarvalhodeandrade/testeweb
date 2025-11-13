// sga-frontend/src/pages/Professores.js (REFATORADO COM TABELA)
import React, { useState, useEffect } from 'react';
import ProfessorForm from '../components/Forms/ProfessorForm';
import { fetchProfessores, deleteProfessor, fetchProfessorById } from '../api/professoresApi';
// ATUALIZAR IMPORTS:
import managementStyles from '../styles/pages/Management.module.css';
import tableStyles from '../styles/components/Tables.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const Professores = () => {
    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProfessor, setEditingProfessor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        loadProfessores();
    };

    // DEPOIS (corrigido):
    const filteredProfessores = professores.filter(professor => {
    // Verifica se professor e professor.nome existem
    if (!professor || !professor.nome) return false;
    
    const nome = professor.nome.toString().toLowerCase();
    const term = searchTerm.toString().toLowerCase();
    
    return nome.includes(term);
    });

    if (loading) return (
        <div className={managementStyles.managementPage}>
            <div className={tableStyles.tableLoading}>Carregando professores...</div>
        </div>
    );

    if (error && !professores.length) return (
        <div className={managementStyles.managementPage}>
            <div style={{ color: 'var(--error-color)' }}>{error}</div>
        </div>
    );

    return (
        <div className={managementStyles.managementPage}>
            {/* Header */}
            <div className={managementStyles.pageHeader}>
                <h1 className={managementStyles.pageTitle}>
                    🧑‍🏫 Gerenciamento de Professores
                </h1>
                <p className={managementStyles.pageDescription}>
                    Cadastre e gerencie todos os professores do sistema
                </p>
            </div>

            {/* Barra de Ações e Estatísticas */}
            <div className={managementStyles.pageActions}>
                <button 
                    onClick={() => { setShowForm(true); setEditingProfessor(null); }}
                    className={`${buttonStyles.button} ${buttonStyles.primary}`}
                >
                    ➕ Novo Professor
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
                                {editingProfessor ? '✏️ Editar Professor' : '➕ Novo Professor'}
                            </h2>
                            <button 
                                onClick={() => {setShowForm(false); setEditingProfessor(null);}} 
                                className={`${buttonStyles.button} ${buttonStyles.outlineSecondary} ${buttonStyles.small}`}
                            >
                                ✕ Fechar
                            </button>
                        </div>
                        <div className={managementStyles.formModalBody}>
                            <ProfessorForm professorParaEditar={editingProfessor} onSuccess={handleSuccess} />
                        </div>
                    </div>
                </div>
            )}

            {/* Tabela de Professores */}
            <div className={tableStyles.tableContainer}>
                <div className={tableStyles.tableHeader}>
                    <h3 className={tableStyles.tableTitle}>
                        Lista de Professores ({filteredProfessores.length})
                    </h3>
                </div>

                <div className={tableStyles.tableResponsive}>
                    <table className={tableStyles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                <th>Curso</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProfessores.map(professor => (
                                <tr key={professor.id}>
                                    <td>
                                        <span className={tableStyles.badge}>
                                            #{professor.id}
                                        </span>
                                    </td>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{professor.nome}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {professor.matricula || '-'}
                                    </td>
                                    <td>
                                        {professor.nome_curso || (
                                            <span style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>
                                                Não definido
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div className={tableStyles.actionsCell}>
                                            <button 
                                                onClick={() => handleEdit(professor.id)} 
                                                className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}
                                                title="Editar professor"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(professor.id)} 
                                                className={`${buttonStyles.button} ${buttonStyles.danger} ${buttonStyles.small}`}
                                                title="Excluir professor"
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

                {filteredProfessores.length === 0 && (
                    <div className={tableStyles.tableEmpty}>
                        <div className={tableStyles.emptyIcon}>🧑‍🏫</div>
                        <div className={tableStyles.emptyText}>
                            {searchTerm ? 'Nenhum professor encontrado' : 'Nenhum professor cadastrado'}
                        </div>
                        {!searchTerm && (
                            <button 
                                onClick={() => setShowForm(true)}
                                className={`${buttonStyles.button} ${buttonStyles.primary}`}
                            >
                                ➕ Cadastrar Primeiro Professor
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Professores;