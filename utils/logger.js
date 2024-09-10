////////////////////////////////////////////////////////////////////////////////////////////////////
// Ulitidades para manipulação de logs
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const winston = require('winston'); // Importa o módulo winston
const env = require('react-native-config'); // Importa o módulo react-native-config

////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuração do logger
////////////////////////////////////////////////////////////////////////////////////////////////////
const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info', // Nível de log
  format: winston.format.json(), // Formato do log
  transports: [ // Transportes de log
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Arquivo de log de erros
    new winston.transports.File({ filename: 'combined.log' }), // Arquivo de log combinado
  ],
});

// Se não estiver em produção, adicione o transporte de console
if (env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ // Adiciona o transporte de console
    format: winston.format.simple(), // Formato simples
  }));
}

module.exports = logger; // Exporta o logger

////////////////////////////////////////////////////////////////////////////////////////////////////