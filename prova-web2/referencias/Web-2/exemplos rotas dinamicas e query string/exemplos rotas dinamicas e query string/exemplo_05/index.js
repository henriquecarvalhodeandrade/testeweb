const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Dados previamente cadastrados
const alunos = [
  { id: 1, prontuario: "JC3032116", nome: "Vivian Santos Carvalho" , curso: "Informática", ano: 2},
  { id: 2, prontuario: "JC3032302", nome: "Vinicius Ferreira Custodio" , curso: "Informática", ano: 2},
  { id: 3, prontuario: "JC3031659", nome: "Isabelli Pereira da Nobrega" , curso: "Informática", ano: 2},
  ];


// Consultar  
// Query Strins
app.get("/buscar", (req, res) => {
    const { nome } = req.query; 

    if (!nome) {
        return res.status(400).json({ erro: "Informe o parâmetro 'nome' na query string" });
    }

    // Normaliza para evitar problema de maiúsc/minúscula
    const termo = nome.toLowerCase();

    const resultados = alunos.filter(p =>
        p.nome.toLowerCase().includes(termo)
    );

    if (resultados.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum aluno encontrado." });
    }

  return res.json(resultados);
});

/*
  app.get('/buscar', (req, res) => {
  const termo = (req.query.nome || "").toLowerCase().trim();
  const resultados = alunos.filter(p => p.nome.toLowerCase() === termo);
  res.json(resultados);
});

*/


// Inserção  
// POST
// CREATE → POST /produtos
app.post('/alunos', (req, res) => {
  const novo = { id: alunos.length + 1, ...req.body };
  alunos.push(novo);
  res.status(201).json(novo);
});
//curl -X POST "http://localhost:3000/alunos" -H "Content-Type: application/json" -d "{\"prontuario\":\"JC3031756\",\"nome\":\"Jose Antonio Rodrigues Lopes\",\"curso\":\"Informática\",\"ano\":2}"

// Listar todos → GET /alundo
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
