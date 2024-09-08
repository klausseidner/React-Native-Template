////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de modelo de processo
////////////////////////////////////////////////////////////////////////////////////////////////////

// importações
const db = require('../config/db'); // Importa o arquivo de configuração de conexão com o banco de dados

////////////////////////////////////////////////////////////////////////////////////////////////////
// Classe de modelo de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
class ProcessModel {
  // Método para criar um processo
  static createProcess(data, callback) { 
    // Insere um novo processo no banco de dados
    db.query('INSERT INTO processes SET ?', data, (err, result) => { 
      if (err) throw err; // Se houver erro, exibe o erro
      callback(result); // Se não houver erro, chama a função de retorno com o resultado
    });
  }

  // Método para buscar todos os processos
  static findAll(callback) { 
    // Busca todos os processos no banco de dados
    db.query('SELECT * FROM processes', (err, results) => { 
      if (err) throw err; // Se houver erro, exibe o erro
      callback(results); // Se não houver erro, chama a função de retorno com os resultados
    });
  }

  // Método para atualizar o status de um processo
  static updateStatus(id, status, callback) { 
    // Atualiza o status do processo no banco de dados
    db.query('UPDATE processes SET status = ? WHERE id = ?', [status, id], (err, result) => { 
      if (err) throw err; // Se houver erro, exibe o erro
      callback(result); // Se não houver erro, chama a função de retorno com o resultado
    });
  }
}

module.exports = ProcessModel; // Exporta a classe de modelo de processo