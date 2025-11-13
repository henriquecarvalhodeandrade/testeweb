// sga-frontend/src/components/Forms/AlunoForm.js (REFATORADO)
import React, { useState, useEffect } from 'react';
import { createAluno, updateAluno, updateAlunoCourse } from '../../api/alunosApi'; 
import { fetchCursos } from '../../api/cursosApi';
// ATUALIZAR IMPORTS:
import formStyles from '../../styles/components/Forms.module.css';
import buttonStyles from '../../styles/components/Buttons.module.css';

const AlunoForm = ({ alunoParaEditar, onSuccess }) => {
    const isEditing = !!alunoParaEditar;
    
    const [alunoData, setAlunoData] = useState({
        nome: alunoParaEditar?.nome || '',
        matricula: alunoParaEditar?.matricula || '',
        data_nascimento: alunoParaEditar?.data_nascimento?.split('T')[0] || '',
        curso_id: alunoParaEditar?.curso_id || '',
    });
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Carrega a lista de cursos para o <select>
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
        setAlunoData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isEditing) {
                // Atualiza dados básicos do aluno
                await updateAluno(alunoParaEditar.id, {
                    nome: alunoData.nome,
                    matricula: alunoData.matricula,
                    data_nascimento: alunoData.data_nascimento,
                });
                
                // Atualiza curso se mudou
                if (alunoParaEditar.curso_id !== alunoData.curso_id) {
                    await updateAlunoCourse(alunoParaEditar.id, { curso_id: alunoData.curso_id }); 
                }

                alert('Aluno atualizado com sucesso!');
            } else {
                // Cadastra novo aluno
                await createAluno(alunoData);
                alert('Aluno cadastrado com sucesso!');
                setAlunoData({ nome: '', matricula: '', data_nascimento: '', curso_id: '' });
            }
            onSuccess();
        } catch (err) {
            setError(err.message || 'Erro na operação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={formStyles.formContainer}>
            <h2 className={formStyles.formTitle}>
                {isEditing ? '✏️ Editar Aluno' : '➕ Novo Aluno'}
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
                            value={alunoData.nome} 
                            onChange={handleChange} 
                            required 
                            disabled={loading}
                            placeholder="Digite o nome completo do aluno"
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
                            value={alunoData.matricula} 
                            onChange={handleChange} 
                            required 
                            disabled={loading}
                            placeholder="Número de matrícula"
                        />
                    </div>
                    
                    {/* Campo Data de Nascimento */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="data_nascimento" className={formStyles.formLabel}>
                            Data de Nascimento
                        </label>
                        <input 
                            type="date" 
                            id="data_nascimento"
                            name="data_nascimento" 
                            className={formStyles.formInput}
                            value={alunoData.data_nascimento} 
                            onChange={handleChange} 
                            disabled={loading}
                        />
                    </div>

                    {/* Campo Curso */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="curso_id" className={formStyles.formLabel}>
                            Curso *
                        </label>
                        <select 
                            id="curso_id"
                            name="curso_id" 
                            className={formStyles.formSelect}
                            value={alunoData.curso_id} 
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
                        {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Aluno')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AlunoForm;