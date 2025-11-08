// sga-frontend/src/components/Forms/AlunoForm.js
import React, { useState, useEffect } from 'react';
import { createAluno, updateAluno, fetchCursos, updateAlunoCourse } from '../../api/sgaApi';

const AlunoForm = ({ alunoParaEditar, onSuccess }) => {
    const isEditing = !!alunoParaEditar;
    
    // Inicializa o estado do formulário com dados vazios ou do aluno para edição
    const [alunoData, setAlunoData] = useState({
        nome: alunoParaEditar?.nome || '',
        matricula: alunoParaEditar?.matricula || '',
        data_nascimento: alunoParaEditar?.data_nascimento?.split('T')[0] || '', // Formato yyyy-mm-dd
        curso_id: alunoParaEditar?.curso_id || '', // Chave estrangeira
    });
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState('');

    // Carrega a lista de cursos para o <select>
    useEffect(() => {
        const loadCursos = async () => {
            try {
                const cursosList = await fetchCursos();
                setCursos(cursosList);
            } catch (err) {
                setError('Erro ao carregar lista de cursos.');
            }
        };
        loadCursos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlunoData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing) {
                // 2. Edição (Update)
                await updateAluno(alunoParaEditar.id, {
                    nome: alunoData.nome,
                    matricula: alunoData.matricula,
                    data_nascimento: alunoData.data_nascimento,
                });
                
                // 2. Edição (Update) - Chamada separada para a chave estrangeira
                if (alunoParaEditar.curso_id !== alunoData.curso_id) {
                     await updateAlunoCourse(alunoParaEditar.id, alunoData.curso_id); 
                }

                alert('Aluno atualizado com sucesso!');
            } else {
                // 1. Cadastro (Create)
                await createAluno(alunoData);
                alert('Aluno cadastrado com sucesso!');
                setAlunoData({ nome: '', matricula: '', data_nascimento: '', curso_id: '' }); // Limpa o form
            }
            onSuccess(); // Chama a função para atualizar a lista na página pai
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro na operação.');
        }
    };

    // ... (Design limpo e intuitivo para o formulário)

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h2>{isEditing ? '✏️ Editar Aluno' : '➕ Novo Aluno'}</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Campo Nome */}
                <label>Nome:</label>
                <input type="text" name="nome" value={alunoData.nome} onChange={handleChange} required />
                
                {/* Campo Matrícula */}
                <label>Matrícula:</label>
                <input type="text" name="matricula" value={alunoData.matricula} onChange={handleChange} required />
                
                {/* Campo Data de Nascimento */}
                <label>Data de Nascimento:</label>
                <input type="date" name="data_nascimento" value={alunoData.data_nascimento} onChange={handleChange} />

                {/* Campo Curso (Chave Estrangeira) */}
                <label>Curso:</label>
                <select name="curso_id" value={alunoData.curso_id} onChange={handleChange} required>
                    <option value="">Selecione um Curso</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nome_curso}</option>
                    ))}
                </select>

                <button type="submit" style={{ backgroundColor: isEditing ? '#ffc107' : '#28a745', color: '#333' }}>
                    {isEditing ? 'Salvar Edição' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
};

export default AlunoForm;