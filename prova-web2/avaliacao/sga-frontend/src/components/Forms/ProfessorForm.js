// sga-frontend/src/components/Forms/ProfessorForm.js
import React, { useState } from 'react';
// IMPORT REFACTOR: Importando de professoresApi
import { createProfessor, updateProfessor } from '../../api/professoresApi';

const ProfessorForm = ({ professorParaEditar, onSuccess }) => {
    const isEditing = !!professorParaEditar;
    
    // Inicializa o estado do formulário com dados vazios ou do professor para edição
    const [professorData, setProfessorData] = useState({
        nome: professorParaEditar?.nome || '',
        siape: professorParaEditar?.siape || '', // Mantendo um campo de ID único
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessorData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing) {
                // Edição (Update)
                await updateProfessor(professorParaEditar.id, professorData);
                
                alert('Professor atualizado com sucesso!');
            } else {
                // Cadastro (Create)
                await createProfessor(professorData);
                alert('Professor cadastrado com sucesso!');
                setProfessorData({ nome: '', siape: '' }); // Limpa o form
            }
            onSuccess(); // Chama a função para atualizar a lista na página pai
        } catch (err) {
            // Acessa a mensagem de erro padronizada pela apiCall em sgaApi.js
            setError(err.message || 'Erro na operação.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h2>{isEditing ? '✏️ Editar Professor' : '➕ Novo Professor'}</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Campo Nome */}
                <label>Nome:</label>
                <input type="text" name="nome" value={professorData.nome} onChange={handleChange} required />
                
                {/* Campo SIAPE (Identificação Única) */}
                <label>SIAPE/ID:</label>
                <input type="text" name="siape" value={professorData.siape} onChange={handleChange} required />
                
                <button type="submit" style={{ 
                    backgroundColor: isEditing ? '#ffc107' : '#28a745', 
                    color: isEditing ? '#333' : '#fff', 
                    border: 'none', 
                    padding: '10px 15px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    marginTop: '20px' 
                }}>
                    {isEditing ? 'Salvar Edição' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
};

export default ProfessorForm;