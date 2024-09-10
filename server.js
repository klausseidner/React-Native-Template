////////////////////////////////////////////////////////////////////////////////////////////////////
// Backend para aplicação de gerenciamento de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express'); // Importa o módulo express
const cors = require('cors'); // Importa o módulo cors
const bodyParser = require('body-parser'); // Importa o módulo body-parser
const env = require('react-native-config'); // Importa o módulo react-native-config
const rateLimit = require('express-rate-limit'); // Importa o módulo express-rate-limit
const morgan = require('morgan'); // Adiciona Morgan para logs de requisições
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const processRoutes = require('./routes/processRoutes'); // Importa as rotas de processos
const helmet = require('helmet'); // Importa o módulo helmet
const logger = require('./utils/logger'); // Importa o módulo logger

app.use(helmet()); // Adiciona o middleware helmet
dotenv.config(); // Carrega as variáveis de ambiente
const app = express(); // Cria uma instância do express
const PORT = env.PORT || 3000; // Porta do servidor

// Configuração de CORS e Morgan para logs
const corsOptions = {
  origin: env.CLIENT_URL || 'http://localhost:19006', // URL do cliente
  optionsSuccessStatus: 200, // Código de status de sucesso
};
app.use(cors(corsOptions)); // Habilita o CORS
app.use(morgan('dev')); // Log das requisições

app.use(bodyParser.json()); // Habilita o body-parser

// Middleware de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições
  message: "Muitas requisições feitas pelo mesmo IP, tente novamente mais tarde.", // Mensagem de erro
});
app.use('/api/auth/login', limiter); // Aplica o rate limiting nas requisições de login

app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/process', processRoutes); // Rotas de processos

app.use((err, req, res, next) => {
  console.error(err.stack); // Exibe o erro no console
  logger.error(err.message); // Registra o erro no arquivo de log
  res.status(500).json({ message: 'Erro interno no servidor' }); // Retorna uma mensagem de erro
});

app.listen(PORT, () => { // Inicia o servidor
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe a mensagem de servidor rodando
});

////////////////////////////////////////////////////////////////////////////////////////////////////