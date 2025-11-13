// sga-frontend/src/components/Forms/CursoForm.js (REFATORADO)
import React, { useState, useEffect } from 'react';
import { createCurso, updateCurso } from '../../api/cursosApi';
// ATUALIZAR IMPORTS:
import formStyles from '../../styles/components/Forms.module.css';
import buttonStyles from '../../styles/components/Buttons.module.css';

const CursoForm = ({ cursoParaEditar, onSuccess }) => {
    const isEditing = !!cursoParaEditar;
    
    const [formData, setFormData] = useState({
        nome_curso: cursoParaEditar?.nome_curso || '',
        carga_horaria: cursoParaEditar?.carga_horaria || '',
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (cursoParaEditar) {
            setFormData({
                nome_curso: cursoParaEditar.nome_curso || '',
                carga_horaria: cursoParaEditar.carga_horaria || '',
            });
        }
    }, [cursoParaEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'carga_horaria' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSuccessMessage('');

        // Validação
        if (!formData.nome_curso || !formData.carga_horaria || formData.carga_horaria <= 0) {
            setError('Preencha todos os campos corretamente (carga horária deve ser maior que 0).');
            setLoading(false);
            return;
        }

        try {
            if (isEditing) {
                await updateCurso(cursoParaEditar.id, formData);
                setSuccessMessage('Curso atualizado com sucesso!');
            } else {
                await createCurso(formData);
                setSuccessMessage('Curso cadastrado com sucesso!');
                setFormData({ nome_curso: '', carga_horaria: '' });
            }

            if (onSuccess) {
                setTimeout(onSuccess, 1500);
            }

        } catch (err) {
            setError(err.message || 'Erro de rede ou servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={formStyles.formContainer}>
            <h2 className={formStyles.formTitle}>
                {isEditing ? '✏️ Editar Curso' : '➕ Novo Curso'}
            </h2>
            
            {error && <div className={formStyles.errorMessage}>{error}</div>}
            {successMessage && <div className={formStyles.successMessage}>{successMessage}</div>}
            
            <form onSubmit={handleSubmit} className={loading ? formStyles.loading : ''}>
                <div className={formStyles.formGrid}>
                    {/* Campo Nome do Curso */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="nome_curso" className={formStyles.formLabel}>
                            Nome do Curso *
                        </label>
                        <input
                            type="text"
                            id="nome_curso"
                            name="nome_curso"
                            className={formStyles.formInput}
                            value={formData.nome_curso}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Digite o nome do curso"
                        />
                    </div>

                    {/* Campo Carga Horária */}
                    <div className={formStyles.formGroup}>
                        <label htmlFor="carga_horaria" className={formStyles.formLabel}>
                            Carga Horária (horas) *
                        </label>
                        <input
                            type="number"
                            id="carga_horaria"
                            name="carga_horaria"
                            className={formStyles.formInput}
                            value={formData.carga_horaria}
                            onChange={handleChange}
                            required
                            min="1"
                            disabled={loading}
                            placeholder="Ex: 60"
                        />
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
                        {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Curso')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CursoForm;