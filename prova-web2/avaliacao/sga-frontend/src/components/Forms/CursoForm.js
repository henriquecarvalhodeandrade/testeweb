// sga-frontend/src/components/Forms/CursoForm.js
import React, { useState, useEffect } from 'react';
// IMPORT REFACTOR: Importando de cursosApi
import { createCurso, updateCurso } from '../../api/cursosApi';

const formContainerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#f8f9fa'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
};

const buttonStyle = {
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
};

const CursoForm = ({ cursoParaEditar, onSuccess }) => {
    const isEditing = !!cursoParaEditar;
    
    // Inicializa o estado com valores vazios ou com os dados para edição
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
            [name]: name === 'carga_horaria' ? parseInt(value) || 0 : value // Converte para número
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSuccessMessage('');

        // Validação simples
        if (!formData.nome_curso || !formData.carga_horaria || formData.carga_horaria <= 0) {
            setError('Preencha todos os campos corretamente (carga horária deve ser maior que 0).');
            setLoading(false);
            return;
        }

        try {
            if (isEditing) {
                // Chama a função de edição da API
                await updateCurso(cursoParaEditar.id, formData);
                setSuccessMessage('Curso atualizado com sucesso!');
            } else {
                // Chama a função de criação da API
                await createCurso(formData);
                setSuccessMessage('Curso cadastrado com sucesso!');
                // Limpa o formulário após o cadastro
                setFormData({ nome_curso: '', carga_horaria: '' }); 
            }

            // Avisa o componente pai para recarregar a lista
            if (onSuccess) {
                setTimeout(onSuccess, 1500); // Dá um tempo para o usuário ver a mensagem
            }

        } catch (err) {
            // Usa err.message que é o erro padronizado pelo apiCall
            setError(err.message || 'Erro de rede ou servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2>{isEditing ? 'Editar Curso' : 'Cadastrar Novo Curso'}</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Nome do Curso:
                    <input
                        type="text"
                        name="nome_curso"
                        value={formData.nome_curso}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                        disabled={loading}
                    />
                </label>
                <label>
                    Carga Horária (horas):
                    <input
                        type="number"
                        name="carga_horaria"
                        value={formData.carga_horaria}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                        min="1"
                        disabled={loading}
                    />
                </label>
                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? 'Processando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Curso')}
                </button>
            </form>
        </div>
    );
};

export default CursoForm;