// sga-frontend/src/pages/Cursos.js (REFATORADO COM TABELA)
import React, { useState, useEffect } from 'react';
import CursoForm from '../components/Forms/CursoForm';
import { fetchCursos, deleteCurso, fetchCursoById } from '../api/cursosApi';
// ATUALIZAR IMPORTS:
import managementStyles from '../styles/pages/Management.module.css';
import tableStyles from '../styles/components/Tables.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingCurso, setEditingCurso] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        loadCursos();
    };

    // Filtro de busca
    const filteredCursos = cursos.filter(curso =>
        curso.nome_curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.carga_horaria.toString().includes(searchTerm)
    );

    if (loading) return (
        <div className={managementStyles.managementPage}>
            <div className={tableStyles.tableLoading}>Carregando cursos...</div>
        </div>
    );

    if (error && !cursos.length) return (
        <div className={managementStyles.managementPage}>
            <div style={{ color: 'var(--error-color)' }}>{error}</div>
        </div>
    );

    return (
        <div className={managementStyles.managementPage}>
            {/* Header */}
            <div className={managementStyles.pageHeader}>
                <h1 className={managementStyles.pageTitle}>
                    📚 Gerenciamento de Cursos
                </h1>
                <p className={managementStyles.pageDescription}>
                    Crie e gerencie todos os cursos disponíveis no sistema
                </p>
            </div>

            {/* Barra de Ações e Estatísticas */}
            <div className={managementStyles.pageActions}>
                <button 
                    onClick={() => { setShowForm(true); setEditingCurso(null); }}
                    className={`${buttonStyles.button} ${buttonStyles.primary}`}
                >
                    ➕ Novo Curso
                </button>
                
                <div className={managementStyles.searchBox}>
                    <input
                        type="text"
                        placeholder="Buscar por nome do curso ou carga horária..."
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
                                {editingCurso ? '✏️ Editar Curso' : '➕ Novo Curso'}
                            </h2>
                            <button 
                                onClick={() => {setShowForm(false); setEditingCurso(null);}} 
                                className={`${buttonStyles.button} ${buttonStyles.outlineSecondary} ${buttonStyles.small}`}
                            >
                                ✕ Fechar
                            </button>
                        </div>
                        <div className={managementStyles.formModalBody}>
                            <CursoForm cursoParaEditar={editingCurso} onSuccess={handleSuccess} />
                        </div>
                    </div>
                </div>
            )}

            {/* Tabela de Cursos */}
            <div className={tableStyles.tableContainer}>
                <div className={tableStyles.tableHeader}>
                    <h3 className={tableStyles.tableTitle}>
                        Lista de Cursos ({filteredCursos.length})
                    </h3>
                </div>

                <div className={tableStyles.tableResponsive}>
                    <table className={tableStyles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome do Curso</th>
                                <th>Carga Horária</th>
                                <th style={{ width: '150px', textAlign: 'center' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCursos.map(curso => (
                                <tr key={curso.id}>
                                    <td>
                                        <span className={tableStyles.badge}>
                                            #{curso.id}
                                        </span>
                                    </td>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '1rem' }}>
                                                {curso.nome_curso}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${tableStyles.badge} ${tableStyles.badgePrimary}`}>
                                            {curso.carga_horaria} horas
                                        </span>
                                    </td>
                                    <td>
                                        <div className={tableStyles.actionsCell}>
                                            <button 
                                                onClick={() => handleEdit(curso.id)} 
                                                className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}
                                                title="Editar curso"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(curso.id)} 
                                                className={`${buttonStyles.button} ${buttonStyles.danger} ${buttonStyles.small}`}
                                                title="Excluir curso"
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

                {filteredCursos.length === 0 && (
                    <div className={tableStyles.tableEmpty}>
                        <div className={tableStyles.emptyIcon}>📚</div>
                        <div className={tableStyles.emptyText}>
                            {searchTerm ? 'Nenhum curso encontrado' : 'Nenhum curso cadastrado'}
                        </div>
                        {!searchTerm && (
                            <button 
                                onClick={() => setShowForm(true)}
                                className={`${buttonStyles.button} ${buttonStyles.primary}`}
                            >
                                ➕ Cadastrar Primeiro Curso
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cursos;