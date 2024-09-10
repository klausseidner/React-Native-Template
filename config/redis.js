////////////////////////////////////////////////////////////////////////////////////////////////////
// Utiliza o módulo redis para criar um cliente do Redis e conecta ao servidor do Redis.
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const redis = require('redis');

////////////////////////////////////////////////////////////////////////////////////////////////////
// Cria um cliente do Redis
////////////////////////////////////////////////////////////////////////////////////////////////////
const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1', // Host do servidor Redis
  port: process.env.REDIS_PORT || 6379, // Porta do servidor Redis
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Evento de erro de conexão com o Redis
////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('error', (err) => {
  console.error('Erro na conexão com o Redis:', err); // Exibe o erro no console
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Conectar ao Redis
////////////////////////////////////////////////////////////////////////////////////////////////////
client.connect().then(() => {
  console.log('Conectado ao Redis com sucesso'); // Exibe a mensagem de conexão bem-sucedida
});

module.exports = client; // Exporta o cliente do Redis

////////////////////////////////////////////////////////////////////////////////////////////////////