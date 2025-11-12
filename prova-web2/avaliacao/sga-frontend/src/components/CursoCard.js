// sga-frontend/src/components/CursoCard.js
import React from 'react';

const cardStyle = {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
};

const titleStyle = {
    color: '#0056b3',
    borderBottom: '2px solid #0056b3',
    paddingBottom: '5px',
    marginBottom: '10px'
};

const buttonGroupStyle = {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end'
};

const CursoCard = ({ curso, onDelete, onEdit }) => {
    return (
        <div style={cardStyle}>
            <h3 style={titleStyle}>{curso.nome_curso}</h3>
            <p>
                <strong>ID:</strong> {curso.id}<br/>
                <strong>Carga Horária:</strong> {curso.carga_horaria} horas<br/>
            </p>
            
            <div style={buttonGroupStyle}>
                <button
                    onClick={() => onEdit(curso.id)}
                    style={{ background: '#ffc107', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(curso.id)}
                    style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default CursoCard;