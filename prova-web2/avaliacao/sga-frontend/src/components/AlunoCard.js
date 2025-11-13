// sga-frontend/src/components/AlunoCard.js (REFATORADO)
import React from 'react';
import cardStyles from '../styles/components/Cards.module.css';
import buttonStyles from '../styles/components/Buttons.module.css';

const AlunoCard = ({ aluno, onDelete, onEdit }) => {
    return (
        <div className={cardStyles.entityCard}>
            <div className={cardStyles.entityCardHeader}>
                <div>
                    <h3 className={cardStyles.entityCardTitle}>
                        👨‍🎓 {aluno.nome}
                    </h3>
                    <p className={cardStyles.entityCardSubtitle}>
                        Matrícula: {aluno.matricula}
                    </p>
                </div>
            </div>
            
            <div className={cardStyles.entityCardContent}>
                <p><strong>Curso:</strong> {aluno.nome_curso || 'Não Associado'}</p>
                <p><strong>Data Nasc:</strong> {aluno.data_nascimento}</p>
            </div>
            
            <div className={cardStyles.entityCardActions}>
                <button 
                    onClick={() => onEdit(aluno.id)} 
                    className={`${buttonStyles.button} ${buttonStyles.outline} ${buttonStyles.small}`}
                >
                    ✏️ Editar
                </button>
                <button 
                    onClick={() => onDelete(aluno.id)} 
                    className={`${buttonStyles.button} ${buttonStyles.danger} ${buttonStyles.small}`}
                >
                    🗑️ Excluir
                </button>
            </div>
        </div>
    );
};

export default AlunoCard;