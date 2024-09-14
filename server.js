////////////////////////////////////////////////////////////////////////////////////////////////////
// Backend para aplicação de gerenciamento de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'; // Importa o módulo express
import bodyParser from 'body-parser'; // Importa o módulo body-parser
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import morgan from 'morgan'; // Adiciona Morgan para logs de requisições
import authRoutes from './routes/authRoutes.js'; // Importa as rotas de autenticação
import processRoutes from './routes/processRoutes.js'; // Importa as rotas de processos
import logger from './utils/logger.js'; // Importa o módulo logger
import session from 'express-session'; // Importa o módulo express-session
import helmet from 'helmet'; // Importa o módulo helmet
import limiter from './middleware/rateLimit.js'; // Importa o middleware de rate limiting
import cors from './middleware/cors.js'; // Importa o middleware de CORS

const app = express(); // Cria uma instância do express
const PORT = process.env.PORT || 3000; // Porta do servidor

////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuração do express-session
////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key', // Chave secreta para assinar a sessão
  resave: true, // Força a sessão a ser salva de volta ao armazenamento da sessão
  saveUninitialized: true, // Força uma sessão não inicializada a ser salva no armazenamento
  cookie: { secure: false }, // Defina como true se estiver usando HTTPS
  maxAge: process.env.JWT_EXPIRATION || 3600000, // Tempo de expiração da sessão
}));

////////////////////////////////////////////////////////////////////////////////////////////////////
// Middlewares
////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors); // Adiciona o middleware de CORS
app.use(morgan('dev')); // Log das requisições
app.use(bodyParser.json()); // Habilita o body-parser
app.use('/api/login', limiter); // Aplica o rate limiting nas requisições de login
app.use(helmet()); // Adiciona o middleware helmet

////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware para verificar sessão inicializada
////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('Sessão não inicializada')); // Retorna erro se a sessão não for inicializada
  }
  next();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Redirecionamento baseado na sessão do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  // Se estiver na página de login, não redirecionar
  if (req.path === '/login' || req.path.startsWith('/api/auth')) {
    return next();
  }
  
  // Se não estiver logado, redirecionar para a página de login
  if (!req.session || !req.session.userId) {
    return res.redirect('/api/auth/login');
  }

  // Se estiver logado e for admin, redirecionar para o dashboard admin
  if (req.session.userId && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }

  // Se estiver logado como usuário comum, redirecionar para a lista de processos
  if (req.session.userId && !req.session.isAdmin) {
    return res.redirect('/processes');
  }
  next();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Rotas de autenticação e processos
////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/process', processRoutes); // Rotas de processos

////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware para tratar erros
////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
  logger.error(`server.js-> Erro capturado: ${err.message}`, { stack: err.stack }); // Registra o erro no arquivo de log
  res.status(500).json({ message: 'Erro interno no servidor' }); // Retorna uma mensagem de erro
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Inicialização do servidor
////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  logger.info(`server.js-> Servidor rodando na porta ${PORT}`); // Registra a mensagem de servidor rodando
});

////////////////////////////////////////////////////////////////////////////////////////////////////