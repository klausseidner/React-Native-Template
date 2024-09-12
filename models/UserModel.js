////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de modelo de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import pool from '../config/db.js'; // Importa o módulo de configuração do banco de dados
import bcrypt from 'bcrypt'; // Importa o módulo bcrypt

////////////////////////////////////////////////////////////////////////////////////////////////////
// Classe de modelo de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
class UserModel { 

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para buscar um usuário pelo email
////////////////////////////////////////////////////////////////////////////////////////////////////
  static async findByEmail(email) {
    // Validação do email
    if (!email || typeof email !== 'string') { // Verifica se o email é uma string ou se está vazio
      throw new Error('Email inválido'); // Lança um erro caso o email seja inválido
    }

    const connection = await pool.getConnection(); // Obtém a conexão do pool
    try { // Tenta buscar o usuário
      const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]); // Query SQL para buscar um usuário pelo email
      
      // Se não encontrar o usuário, lança um erro
      if (results.length === 0) { // Verifica se o resultado é vazio
        throw new Error('Usuário não encontrado'); // Lança um erro caso o usuário não seja encontrado
      }

      return results[0]; // Retorna o primeiro resultado caso sucesso
    } catch (err) { // Se houver um erro, lança o erro
      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para criar um usuário
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  static async create(data) {
    const connection = await pool.getConnection(); // Obtém a conexão do pool

    try { // Tenta criar um novo usuário
      // Validações dos dados do usuário
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
      await connection.beginTransaction(); // Inicia a transação

      // Insere o novo usuário no banco de dados
      const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)'; // Query SQL para inserir um novo usuário
      const [result] = await connection.query(sql, [data.email, hashedPassword, data.name]); // Executa a query SQL

      // Confirma a transação
      await connection.commit(); // Confirma a transação

      // Retorna o resultado da inserção
      return result;
    } catch (err) { // Se houver um erro, lança o erro
      // Desfaz a transação em caso de erro
      await connection.rollback(); // Desfaz a transação

      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }
}

export default UserModel; // Exporta o modelo de usuário

////////////////////////////////////////////////////////////////////////////////////////////////////