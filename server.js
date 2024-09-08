////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de configuração do servidor
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const express = require('express'); // Importa o módulo express
const bodyParser = require('body-parser'); // Importa o módulo body-parser
const helmet = require('helmet'); // Importa o módulo helmet para segurança
const winston = require('winston'); // Importa winston para logs
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const processRoutes = require('./routes/processRoutes'); // Importa as rotas de processos

// Configuração do Logger
const logger = winston.createLogger({ // Cria um logger com winston
  level: 'info', // Define o nível de log como info
  format: winston.format.combine( // Define o formato do log
    winston.format.timestamp(), // Adiciona um timestamp
    winston.format.json() // Define o formato como JSON
  ),
  transports: [ // Define os transportes de log
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Armazena logs de erro
    new winston.transports.File({ filename: 'logs/combined.log' }), // Armazena logs combinados
  ],
});

// Se não estivermos em produção, loga também no console
if (process.env.NODE_ENV !== 'production') { // Se não estivermos em produção
  logger.add(new winston.transports.Console({ // Adiciona um transporte de log para o console
    format: winston.format.simple(), // Define o formato do log como simples
  }));
}

// Inicialização do aplicativo Express
const app = express();

// Middlewares de segurança e parsing
app.use(helmet()); // Adiciona headers de segurança com helmet
app.use(bodyParser.json()); // Adiciona o body-parser para interpretar JSON

// Rotas
app.use('/auth', authRoutes); // Adiciona as rotas de autenticação
app.use('/api', processRoutes); // Adiciona as rotas de processos

// Middleware de erro (captura todos os erros e loga)
app.use((err, req, res, next) => { // Middleware de erro
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`); // Loga o erro
  res.status(err.status || 500).json({ // Retorna o erro como JSON
    error: { // Objeto de erro
      message: err.message || 'Erro interno do servidor', // Mensagem de erro
    },
  });
});

// Middleware para rotas não encontradas
app.use((req, res, next) => { // Middleware para rotas não encontradas
  res.status(404).json({ message: 'Rota não encontrada' }); // Retorna uma mensagem de rota não encontrada
});

// Inicia o servidor na porta 3000
app.listen(3000, () => { 
  logger.info('Servidor rodando na porta 3000'); // Loga que o servidor está rodando
  console.log('Servidor rodando na porta 3000'); // Exibe a mensagem de servidor rodando no console
});
