// sga-frontend/src/components/AlunoCard.js
import React from 'react';

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const AlunoCard = ({ aluno, onDelete, onEdit }) => {
    return (
        <div style={cardStyle}>
            <h4>🧑‍🎓 {aluno.nome} <small>({aluno.matricula})</small></h4>
            <p><strong>Curso:</strong> {aluno.nome_curso || 'Não Associado'}</p>
            <p><strong>Data Nasc:</strong> {aluno.data_nascimento}</p>
            <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                <button 
                    onClick={() => onEdit(aluno.id)} 
                    style={{ background: '#007bff', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
                    ✏️ Editar
                </button>
                <button 
                    onClick={() => onDelete(aluno.id)} 
                    style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    🗑️ Excluir
                </button>
            </div>
        </div>
    );
};

export default AlunoCard;