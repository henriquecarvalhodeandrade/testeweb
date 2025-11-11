const express = require("express");
const app = express();
const PORT = 3000;

// Listas
const produtos = [
  { id: 1, nome: "Caderno", preco: 15 },
  { id: 2, nome: "Caneta", preco: 5 },
  { id: 3, nome: "Lápis", preco: 3 },
];

// Rota dinâmica: buscar produto pelo ID
app.get("/produto/:id", (req, res) => {
  const { id } = req.params;          // pega o valor da URL
  const produto = produtos.find(p => p.id === parseInt(id));

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado!" });
  }

  res.json(produto);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


// curl http://localhost:3000/produto/1