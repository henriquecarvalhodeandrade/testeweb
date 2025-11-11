// sga-frontend/src/components/ProfessorCard.js
import React from 'react';

const ProfessorCard = ({ professor, onDelete, onEdit }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
            <h3>{professor.nome}</h3>
            <p><strong>ID:</strong> {professor.id}</p>
            {/* O campo 'siape' é um palpite para o identificador único, similar a 'matricula' dos alunos */}
            <p><strong>SIAPE/ID:</strong> {professor.siape || 'N/A'}</p> 
            
            <div style={{ marginTop: '15px' }}>
                <button 
                    onClick={() => onEdit(professor.id)} 
                    style={{ background: '#007bff', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                >
                    Editar
                </button>
                <button 
                    onClick={() => onDelete(professor.id)} 
                    style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default ProfessorCard;