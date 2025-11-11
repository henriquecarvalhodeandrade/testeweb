const express = require('express');
const app = express();
app.use(express.json());

let produtos = [
  { id: 1, nome: "Caneta", preco: 2.5 },
  { id: 2, nome: "Caderno", preco: 15.0 }
];

// CREATE → POST /produtos
app.post('/produtos', (req, res) => {
  const novo = { id: produtos.length + 1, ...req.body };
  produtos.push(novo);
  res.status(201).json(novo);
});

// READ → GET /produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.listen(3000, () => console.log("http://localhost:3000"));


/**
 * curl http://localhost:3000/produtos → lista inicial.
 * curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d "{\"nome\":\"Lápis\",\"preco\":1.5}"
 * 
 */