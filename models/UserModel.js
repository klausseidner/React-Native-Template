////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de modelo de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require('../config/db'); // Importa o arquivo de configuração de conexão com o banco de dados
const bcrypt = require('bcrypt'); // Importa bcrypt para criptografia de senhas

////////////////////////////////////////////////////////////////////////////////////////////////////
// Classe de modelo de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
class UserModel { 

  // Método para buscar um usuário pelo email
  static findByEmail(email, callback) {
    // Validação do email
    if (!email || typeof email !== 'string') {
      return callback(null, new Error('Email inválido')); // Retorna um erro caso o email seja inválido
    }

    // Busca um usuário no banco de dados pelo email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => { // Query SQL para buscar um usuário pelo email
      if (err) return callback(null, err); // Retorna o erro caso haja falha

      // Se não houver resultados, retorna um erro
      if (results.length === 0) {
        return callback(null, new Error('Usuário não encontrado')); // Retorna um erro caso o usuário não seja encontrado
      }
      callback(results[0], null); // Retorna o primeiro resultado caso sucesso
    });
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para criar um usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  static async create(data, callback) {
    const connection = await db.getConnection(); // Obtém a conexão do banco de dados

    try { // Validações dos dados do usuário
      if (!data.email || typeof data.email !== 'string') { // Valida o email
        throw new Error('Email inválido'); // Lança um erro caso o email seja inválido
      }
      if (!data.password || typeof data.password !== 'string') { // Valida a senha
        throw new Error('Senha inválida'); // Lança um erro caso a senha seja inválida
      }
      if (!data.name || typeof data.name !== 'string') { // Valida o nome
        throw new Error('Nome inválido'); // Lança um erro caso o nome seja inválido
      }

      // Criptografa a senha antes de salvar
      const hashedPassword = bcrypt.hashSync(data.password, 10); // Criptografa a senha com 10 rounds

      // Inicia uma transação para garantir a atomicidade
      await connection.beginTransaction(); 

      // Insere o novo usuário no banco de dados
      const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)'; // Query SQL para inserir um novo usuário
      const result = await connection.query(sql, [data.email, hashedPassword, data.name]); // Executa a query SQL

      // Confirma a transação
      await connection.commit();

      // Retorna o resultado da inserção
      callback(result, null);
    } catch (err) { // Se ocorrer um erro
      await connection.rollback(); // Desfaz a transação

      callback(null, err); // Retorna o erro
    } finally { // Finaliza a conexão
      connection.release(); // Libera a conexão
    }
  }
}

module.exports = UserModel; // Exporta a classe de modelo de usuário

////////////////////////////////////////////////////////////////////////////////////////////////////