////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilidades para manipulação de logs
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const winston = require('winston'); // Importa o módulo winston
const env = require('react-native-config'); // Importa o módulo react-native-config

////////////////////////////////////////////////////////////////////////////////////////////////////
// Formato de logs detalhados para ambiente de desenvolvimento
////////////////////////////////////////////////////////////////////////////////////////////////////
const developmentFormat = winston.format.combine(
  winston.format.colorize(), // Adiciona cores para facilitar a leitura no console
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona timestamp
  winston.format.printf(({ level, message, timestamp, stack }) => { // Formato de impressão
    return `${timestamp} [${level}]: ${stack || message}`; // Exibe a mensagem ou o stack trace
  })
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuração do logger
////////////////////////////////////////////////////////////////////////////////////////////////////
const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info', // Define o nível de log
  format: winston.format.combine( // Formato de log
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), // Adiciona timestamp para logs
    winston.format.json() // Formato JSON para estruturação de logs
  ),
  transports: [ // Transportes de log para arquivos
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Arquivo de log de erros
    new winston.transports.File({ filename: 'logs/combined.log' }) // Arquivo de log combinado (todos os níveis)
  ],
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Verificação do ambiente e configuração adicional de log
////////////////////////////////////////////////////////////////////////////////////////////////////

// Se estiver no ambiente de desenvolvimento
if (env.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console({ // Adiciona transporte de console
    format: developmentFormat, // Usa o formato detalhado para desenvolvimento
  }));
}

// Se estiver no ambiente de produção
if (env.NODE_ENV === 'production') {
  // Adiciona transporte de console em formato simples, apenas para logs essenciais
  logger.add(new winston.transports.Console({ 
    format: winston.format.simple(), // Usa o formato simples para produção
  }));

  // Exemplo de configuração adicional para produção, como envio de logs para servidor externo
  logger.add(new winston.transports.Http({
    host: env.LOG_HOST || 'localhost', // Host do servidor de logs
    path: env.LOG_PATH || '../logs', // Caminho para envio de logs
    ssl: true // Usa SSL para conexão segura
  }));
}

module.exports = logger; // Exporta o logger

////////////////////////////////////////////////////////////////////////////////////////////////////
