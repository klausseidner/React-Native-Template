////////////////////////////////////////////////////////////////////////////////////////////////////
// Backend para aplicação de gerenciamento de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'; // Importa o módulo express
import cors from 'cors'; // Importa o módulo cors
import bodyParser from 'body-parser'; // Importa o módulo body-parser
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import rateLimit from 'express-rate-limit'; // Importa o módulo express-rate-limit
import morgan from 'morgan'; // Adiciona Morgan para logs de requisições
import authRoutes from './routes/authRoutes.js'; // Importa as rotas de autenticação
import processRoutes from './routes/processRoutes.js'; // Importa as rotas de processos
import helmet from 'helmet'; // Importa o módulo helmet
import logger from './utils/logger.js'; // Importa o módulo logger

const app = express(); // Cria uma instância do express
const PORT = process.env.PORT || 3000; // Porta do servidor

// Configuração de CORS e Morgan para logs
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:19006', // URL do cliente
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

app.use(helmet()); // Adiciona o middleware helmet

app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/process', processRoutes); // Rotas de processos

app.use((err, req, res, next) => {
  logger.error(`Erro capturado: ${err.message}`, {stack: err.stack}); // Registra o erro no arquivo de log
  res.status(500).json({ message: 'Erro interno no servidor' }); // Retorna uma mensagem de erro
});

app.listen(PORT, () => { // Inicia o servidor
  logger.info(`Servidor rodando na porta ${PORT}`); // Registra a mensagem de servidor rodando
});

////////////////////////////////////////////////////////////////////////////////////////////////////