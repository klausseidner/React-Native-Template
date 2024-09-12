////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de configuração de conexão com o banco de dados MySQL
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import mysql from 'mysql2'; // Importa o módulo mysql2
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import logger from '../utils/logger.js'; // Importa o módulo logger

////////////////////////////////////////////////////////////////////////////////////////////////////
// Cria uma conexão com o banco de dados MySQL
////////////////////////////////////////////////////////////////////////////////////////////////////
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Endereço do banco de dados
  user: process.env.DB_USER || 'root', // Usuário do banco de dados
  password: process.env.DB_PASSWORD || '', // Senha do banco de dados
  database: process.env.DB_NAME || 'database', // Nome do banco de dados
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Conecta ao banco de dados
////////////////////////////////////////////////////////////////////////////////////////////////////
connection.connect((err) => { // Callback de conexão
  if (err) throw err; // Se houver erro, exibe o erro
  logger.error(`Erro ao conectar ao banco de dados: ${err.message}`, { stack: err.stack }); // Exibe o erro
});

export default connection; // Exporta a conexão com o banco de dados

////////////////////////////////////////////////////////////////////////////////////////////////////