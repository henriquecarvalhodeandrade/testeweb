// sga-frontend/src/components/Forms/ProfessorForm.js
import React, { useState } from 'react';
import { createProfessor, updateProfessor } from '../../api/professoresApi';

const ProfessorForm = ({ professorParaEditar, onSuccess }) => {
    const isEditing = !!professorParaEditar;

    // Estado inicial do formulário (com todos os campos necessários)
    const [professorData, setProfessorData] = useState({
        nome: professorParaEditar?.nome || '',
        siape: professorParaEditar?.siape || '',
        matricula: professorParaEditar?.matricula || '',
        curso_id: professorParaEditar?.curso_id || '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Atualiza os valores conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessorData((prev) => ({ ...prev, [name]: value }));
    };

    // Envia o formulário (cadastro ou edição)
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
                // Limpa o formulário
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
        <div
            style={{
                maxWidth: '600px',
                margin: '20px auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
        >
            <h2>{isEditing ? '✏️ Editar Professor' : '➕ Novo Professor'}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Campo Nome */}
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={professorData.nome}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />

                {/* Campo SIAPE */}
                <label>SIAPE:</label>
                <input
                    type="text"
                    name="siape"
                    value={professorData.siape}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />

                {/* Campo Matrícula */}
                <label>Matrícula:</label>
                <input
                    type="text"
                    name="matricula"
                    value={professorData.matricula}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />

                {/* Campo Curso */}
                <label>ID do Curso:</label>
                <input
                    type="number"
                    name="curso_id"
                    value={professorData.curso_id}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', marginBottom: '20px' }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: isEditing ? '#ffc107' : '#28a745',
                        color: isEditing ? '#333' : '#fff',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    {loading
                        ? 'Salvando...'
                        : isEditing
                        ? 'Salvar Edição'
                        : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
};

export default ProfessorForm;
