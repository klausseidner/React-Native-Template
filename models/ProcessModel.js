////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de modelo de processo
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import pool from '../config/db.js'; // Importa o módulo de configuração do banco de dados

////////////////////////////////////////////////////////////////////////////////////////////////////
// Classe de modelo de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
class ProcessModel {
  // Método para criar um processo
  static async createProcess(data) { 
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    try { // Tenta criar um novo processo
      const [result] = await connection.query('INSERT INTO processes SET ?', [data]); // Query SQL para inserir um novo processo
      return result; // Retorna o resultado
    } catch (err) { // Se houver um erro, lança o erro
      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para buscar todos os processos
////////////////////////////////////////////////////////////////////////////////////////////////////
  static async findAll() { 
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    try { // Tenta buscar todos os processos
      const [results] = await connection.query('SELECT * FROM processes'); // Query SQL para buscar todos os processos
      return results; // Retorna os resultados
    } catch (err) { // Se houver um erro, lança o erro
      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para atualizar o status de um processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  static async updateStatus(id, status) { 
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    try { // Tenta atualizar o status de um processo
      const [result] = await connection.query('UPDATE processes SET status = ? WHERE id = ?', [status, id]); // Query SQL para atualizar o status de um processo
      return result; // Retorna o resultado
    } catch (err) { // Se houver um erro, lança o erro
      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para buscar processos com detalhes do usuário (exemplo de uso de JOIN)
////////////////////////////////////////////////////////////////////////////////////////////////////
  static async findProcessesWithUserDetails() {
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    try { // Tenta buscar processos com detalhes do usuário
      const [results] = await connection.query( // Query SQL para buscar processos com detalhes do usuário
        'SELECT p.*, u.name, u.email FROM processes p JOIN users u ON p.user_id = u.id' // Query SQL com JOIN
      ); 
      return results; // Retorna os resultados
    } catch (err) { // Se houver um erro, lança o erro
      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para buscar processos por usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  static async findProcessById(id) {
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    try { // Tenta buscar um processo pelo ID
      const [results] = await connection.query('SELECT * FROM processes WHERE id = ?', [id]); // Query SQL para buscar um processo pelo ID
      return results[0]; // Retorna o primeiro resultado
    } catch (err) { // Se houver um erro, lança o erro
      throw err; // Lança o erro para ser tratado onde for chamado
    } finally { // Libera a conexão de volta ao pool
      connection.release(); // Libera a conexão de volta ao pool
    }
  }
}

export default ProcessModel; // Exporta a classe de modelo de processo

////////////////////////////////////////////////////////////////////////////////////////////////////