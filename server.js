////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de configuração do servidor
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const express = require('express'); // Importa o módulo express
const bodyParser = require('body-parser'); // Importa o módulo body-parser
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const processRoutes = require('./routes/processRoutes'); // Importa as rotas de processos

const app = express(); // Cria uma instância do express
app.use(bodyParser.json()); // Adiciona o body-parser ao express

app.use('/auth', authRoutes); // Adiciona as rotas de autenticação
app.use('/api', processRoutes); // Adiciona as rotas de processos

// Inicia o servidor na porta 3000
app.listen(3000, () => { 
  console.log('Servidor rodando na porta 3000'); // Exibe a mensagem de servidor rodando
});
