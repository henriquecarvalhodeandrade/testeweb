// sga-frontend/src/components/ProfessorCard.js (REFATORADO)
import React from 'react';
import cardStyles from '../styles/components/Cards.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const ProfessorCard = ({ professor, onDelete, onEdit }) => {
    return (
        <div className={cardStyles.entityCard}>
            <div className={cardStyles.entityCardHeader}>
                <div>
                    <h3 className={cardStyles.entityCardTitle}>
                        🧑‍🏫 {professor.nome}
                    </h3>
                    <p className={cardStyles.entityCardSubtitle}>
                        SIAPE: {professor.siape} | Matrícula: {professor.matricula || 'N/A'}
                    </p>
                </div>
            </div>
            
            <div className={cardStyles.entityCardContent}>
                <p><strong>Curso Principal:</strong> {professor.nome_curso || 'Não Definido'}</p>
            </div>
            
            <div className={cardStyles.entityCardActions}>
                <button 
                    onClick={() => onEdit(professor.id)} 
                    className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}
                >
                    ✏️ Editar Dados
                </button>
                <button 
                    onClick={() => onDelete(professor.id)} 
                    className={`${buttonStyles.button} ${buttonStyles.danger} ${buttonStyles.small}`}
                >
                    🗑️ Excluir
                </button>
            </div>
        </div>
    );
};

export default ProfessorCard;