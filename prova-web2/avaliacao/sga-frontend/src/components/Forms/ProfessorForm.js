// sga-frontend/src/components/Forms/ProfessorForm.js (REFATORADO)
import React, { useState, useEffect } from 'react';
import { createProfessor, updateProfessor } from '../../api/professoresApi';
import { fetchCursos } from '../../api/cursosApi';
// ATUALIZAR IMPORTS:
import formStyles from '../../styles/components/Forms.module.css';
import buttonStyles from '../../styles/components/Buttons.module.css';

const ProfessorForm = ({ professorParaEditar, onSuccess }) => {
    const isEditing = !!professorParaEditar;

    const [professorData, setProfessorData] = useState({
        nome: professorParaEditar?.nome || '',
        siape: professorParaEditar?.siape || '',
        matricula: professorParaEditar?.matricula || '',
        curso_id: professorParaEditar?.curso_id || '',
    });

    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Carrega a lista de cursos
    useEffect(() => {
        const loadCursos = async () => {
            try {
                const cursosList = await fetchCursos();
                setCursos(cursosList);
            } catch (err) {
                setError('Erro ao carregar lista de cursos.');
            }
        };
        loadCursos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessorData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isEditing) {
                await updateProfessor(professorParaEditar.id, professorData);
                alert('✅ Professor atualizado com sucesso!');
            } else {
                await createProfessor(professorData);
                alert('✅ Professor cadastrado com sucesso!');
                setProfessorData({
                    nome: '',
                    siape: '',
                    matricula: '',
                    curso_id: '',
                });
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setError(err.message || 'Erro ao salvar o professor. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={formStyles.formContainer}>
            <h2 className={formStyles.formTitle}>
                {isEditing ? '✏️ Editar Professor' : '➕ Novo Professor'}
            </h2>

            {error && <div className={formStyles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} className={loading ? formStyles.loading : ''}>
                <div className={formStyles.formGrid}>
                    {/* Campo Nome */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="nome" className={formStyles.formLabel}>
                            Nome Completo *
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            className={formStyles.formInput}
                            value={professorData.nome}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Digite o nome completo do professor"
                        />
                    </div>

                    {/* Campo SIAPE */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="siape" className={formStyles.formLabel}>
                            SIAPE *
                        </label>
                        <input
                            type="text"
                            id="siape"
                            name="siape"
                            className={formStyles.formInput}
                            value={professorData.siape}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Número do SIAPE"
                        />
                    </div>

                    {/* Campo Matrícula */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="matricula" className={formStyles.formLabel}>
                            Matrícula *
                        </label>
                        <input
                            type="text"
                            id="matricula"
                            name="matricula"
                            className={formStyles.formInput}
                            value={professorData.matricula}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Número de matrícula"
                        />
                    </div>

                    {/* Campo Curso */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="curso_id" className={formStyles.formLabel}>
                            Curso Principal *
                        </label>
                        <select
                            id="curso_id"
                            name="curso_id"
                            className={formStyles.formSelect}
                            value={professorData.curso_id}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            <option value="">Selecione um curso</option>
                            {cursos.map(curso => (
                                <option key={curso.id} value={curso.id}>
                                    {curso.nome_curso}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={formStyles.formActions}>
                    <button 
                        type="button" 
                        onClick={() => onSuccess()}
                        className={`${buttonStyles.button} ${buttonStyles.outlineSecondary}`}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`${buttonStyles.button} ${buttonStyles.primary}`}
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Professor')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfessorForm;