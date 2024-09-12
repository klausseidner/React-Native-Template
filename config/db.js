////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de configuração de conexão com o banco de dados MySQL
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import mysql from 'mysql2/promise'; // Importa o módulo mysql2 com suporte a Promises
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import logger from '../utils/logger.js'; // Importa o módulo logger

////////////////////////////////////////////////////////////////////////////////////////////////////
// Configura e cria o pool de conexões com o banco de dados MySQL
////////////////////////////////////////////////////////////////////////////////////////////////////
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', // Endereço do banco de dados
  user: process.env.DB_USER || 'root', // Usuário do banco de dados
  password: process.env.DB_PASSWORD || '', // Senha do banco de dados
  database: process.env.DB_NAME || 'database', // Nome do banco de dados
  waitForConnections: true, // Aguarda conexões disponíveis
  connectionLimit: 10, // Número máximo de conexões simultâneas
  queueLimit: 0 // Número máximo de conexões na fila
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para conectar ao banco de dados e testar a conexão
////////////////////////////////////////////////////////////////////////////////////////////////////
const testConnection = async () => {
  try { // Tenta conectar ao banco de dados
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    logger.info('Conexão com o banco de dados estabelecida com sucesso.'); // Loga a mensagem de sucesso
    connection.release(); // Libera a conexão de volta ao pool
  } catch (err) {
    // Se houver erro, loga o erro e encerra a aplicação
    logger.error(`Erro ao conectar ao banco de dados: ${err.message}`, { stack: err.stack }); // Loga o erro
    process.exit(1); // Encerra a aplicação com status 1 (erro)
  }
};

// Testa a conexão ao iniciar a aplicação
testConnection();

export default pool; // Exporta o pool de conexões

////////////////////////////////////////////////////////////////////////////////////////////////////