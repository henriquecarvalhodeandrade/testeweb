const express = require("express");
const app = express();
const PORT = 3000;

const lista = [{id: 1, tarefa:'Estudar', feito:1},
    {id: 2, tarefa:'Lavar louça', feito:0}
]

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Servir arquivos estáticos da pasta "public"
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Habilitar leitura de dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'))
});

// Rotas que processam os formulários
app.get("/tarefas", (req, res) => {
  res.json(lista);
});

// Inserir um novo item
app.post("/tarefas", (req, res) => {
    const novo = { id: lista[lista.length-1].id + 1, ...req.body };
    lista.push(novo);
    res.status(201).json(novo);
});

// Alterar um item
app.put("/tarefas", (req, res) => {
    res.json({ metodo:'PUT', ...req.body })
});

// remover um item
app.delete("/tarefas", (req, res) => {
    res.json({ metodo:'DELETE', ...req.body })
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
