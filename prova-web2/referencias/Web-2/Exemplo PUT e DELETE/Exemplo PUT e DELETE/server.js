const express = require("express");
const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta "public"

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Habilitar leitura de dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas que processam os formulários
app.get("/formulario", (req, res) => {
  res.json({ via: "GET", dados: req.query });
});

app.post("/formulario", (req, res) => {
  res.json({ via: "POST", dados: req.body });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
