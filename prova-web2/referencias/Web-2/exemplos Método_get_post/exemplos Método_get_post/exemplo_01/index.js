const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })); 

/**
 *  req -> obj da requisição 
 *  res -> obj da resposta
 * next() -> func que indica que pode continuar p o prox middlew
 **/ 

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/**
 * GET → query string (?chave=valor)
 **/
// Cria uma rota para o caminho /teste
app.get('/teste', (req, res) => {
  // extrai query e hearders do objeto req
  // req.query contém os parâmetros da query string
  // req.headers contém os cabeçalhos HTTML   
  const { query, headers } = req;

  // enviar a resposta via JSON
  return res.json({
    metodo: 'GET',
    mensagem: 'GET funcionando!',
    recebido_em: 'req.query',
    query
  });
});

/**
 * POST → dados chegam no corpo (req.body)
 * Enviar como JSON ou formulário
 **/
app.post('/teste', (req, res) => {
  const { body, headers } = req;
  return res.json({
    metodo: 'POST',
    mensagem: 'POST funcionando!',
    recebido_em: 'req.body',
    body
  });
});

/**
 * PUT → geralmente usado para atualizar
 * Também lê do corpo (req.body)
 **/
app.put('/teste', (req, res) => {
  const { body } = req;
  return res.json({
    metodo: 'PUT',
    mensagem: 'PUT funcionando!',
    recebido_em: 'req.body',
    body
  });
});

/**
 * DELETE → normalmente só a URL
 * (ex.: DELETE /teste?id=123) ou caminho dinâmico
 */
app.delete('/teste', (req, res) => {
  const { query } = req;
  return res.json({
    metodo: 'DELETE',
    mensagem: 'DELETE funcionando!',
    dica: 'Envie um id na query (?id=123) ou use rota dinâmica (/teste/:id)',
    query
  });
});

// Sobe o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
