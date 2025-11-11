const express = require('express');
const app = express();


const produtos = [
  { id: 1, nome: "Caderno" },
  { id: 2, nome: "Caneta" },
  { id: 3, nome: "Lápis" }
];



app.get('/buscar', (req, res) => {
  const { nome } = req.query; // captura query string
  //percorre o array produtos.
  const resultados = produtos.filter(p =>
    p.nome.toLowerCase().includes(nome?.toLowerCase() || "")
  ); //deixa o texto em minúsculas 
  res.json(resultados);
});



app.listen(3000, () => console.log('http://localhost:3000'));

//curl http://localhost:3000/buscar?nome=caderno