// sga-frontend/src/components/CursoCard.js (REFATORADO)
import React from 'react';
import cardStyles from '../styles/components/Cards.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const CursoCard = ({ curso, onDelete, onEdit }) => {
    return (
        <div className={cardStyles.entityCard}>
            <div className={cardStyles.entityCardHeader}>
                <div>
                    <h3 className={cardStyles.entityCardTitle}>
                        📚 {curso.nome_curso}
                    </h3>
                </div>
            </div>
            
            <div className={cardStyles.entityCardContent}>
                <div className={cardStyles.entityCardMeta}>
                    <div className={cardStyles.metaItem}>
                        <strong>ID:</strong> {curso.id}
                    </div>
                    <div className={cardStyles.metaItem}>
                        <strong>Carga Horária:</strong> {curso.carga_horaria} horas
                    </div>
                </div>
            </div>
            
            <div className={cardStyles.entityCardActions}>
                <button
                    onClick={() => onEdit(curso.id)}
                    className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}
                >
                    ✏️ Editar
                </button>
                <button
                    onClick={() => onDelete(curso.id)}
                    className={`${buttonStyles.button} ${buttonStyles.danger} ${buttonStyles.small}`}
                >
                    🗑️ Excluir
                </button>
            </div>
        </div>
    );
};

export default CursoCard;