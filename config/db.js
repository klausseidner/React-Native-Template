////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de configuração de conexão com o banco de dados MySQL
////////////////////////////////////////////////////////////////////////////////////////////////////

const mysql = require('mysql2'); // Importa o módulo mysql2

// Cria uma conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do banco de dados
  user: 'root', // Usuário do banco de dados
  password: 'password', // Senha do banco de dados
  database: 'app_db' // Nome do banco de dados
});

// Conecta ao banco de dados
connection.connect((err) => { // Callback de conexão
  if (err) throw err; // Se houver erro, exibe o erro
  console.log('Conectado ao MySQL!'); // Se não houver erro, exibe a mensagem de conexão bem-sucedida
});

module.exports = connection; // Exporta a conexão com o banco de dados