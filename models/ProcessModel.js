////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de modelo de processo
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import db from '../config/db.js'; // Importa o módulo de configuração do banco de dados

////////////////////////////////////////////////////////////////////////////////////////////////////
// Classe de modelo de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
class ProcessModel {
  // Método para criar um processo
  static createProcess(data, callback) { 
    // Insere um novo processo no banco de dados
    db.query('INSERT INTO processes SET ?', data, (err, result) => {  // Query SQL para inserir um novo processo
      if (err) return callback(err); // Passa o erro para o callback em vez de usar throw
      callback(null, result); // Se não houver erro, chama a função de retorno com o resultado
    });
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para buscar todos os processos
////////////////////////////////////////////////////////////////////////////////////////////////////
  static findAll(callback) { 
    // Busca todos os processos no banco de dados
    db.query('SELECT * FROM processes', (err, results) => { // Query SQL para buscar todos os processos
      if (err) return callback(err); // Passa o erro para o callback em vez de usar throw
      callback(null, results); // Se não houver erro, chama a função de retorno com os resultados
    });
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para atualizar o status de um processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  static updateStatus(id, status, callback) { 
    // Atualiza o status do processo no banco de dados
    db.query('UPDATE processes SET status = ? WHERE id = ?', [status, id], (err, result) => {  // Query SQL para atualizar o status de um processo
      if (err) return callback(err); // Passa o erro para o callback em vez de usar throw
      callback(null, result); // Se não houver erro, chama a função de retorno com o resultado
    });
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Método para buscar processos com detalhes do usuário (exemplo de uso de JOIN)
////////////////////////////////////////////////////////////////////////////////////////////////////
  static findProcessesWithUserDetails(callback) {
    // Busca processos junto com detalhes do usuário
    db.query(
      'SELECT p.*, u.name, u.email FROM processes p JOIN users u ON p.user_id = u.id', // Query SQL com JOIN
      (err, results) => { // Função de retorno da query
        if (err) return callback(err); // Passa o erro para o callback em vez de usar throw
        callback(null, results); // Se não houver erro, chama a função de retorno com os resultados
      }
    );
  }
  static findProcessById(id, callback) {
    // Busca um processo pelo ID
    db.query('SELECT * FROM processes WHERE id = ?', id, (err, results) => { // Query SQL para buscar um processo pelo ID
      if (err) return callback(err); // Passa o erro para o callback em vez de usar throw
      callback(null, results[0]); // Se não houver erro, chama a função de retorno com o primeiro resultado
    });
  }
}

export default ProcessModel; // Exporta a classe de modelo de processo

////////////////////////////////////////////////////////////////////////////////////////////////////