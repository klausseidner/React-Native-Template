////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de modelo de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

// importações	
const db = require('../config/db'); // Importa o arquivo de configuração de conexão com o banco de dados

////////////////////////////////////////////////////////////////////////////////////////////////////
// Classe de modelo de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
class UserModel { 
  // Método para buscar um usuário pelo email
  static findByEmail(email, callback) { 
    // Busca um usuário no banco de dados pelo email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => { 
      if (err) throw err; // Se houver erro, exibe o erro
      callback(results[0]); // Se não houver erro, chama a função de retorno com o primeiro resultado
    });
  }

  // Método para criar um usuário
  static create(data, callback) { 
    // Insere um novo usuário no banco de dados
    db.query('INSERT INTO users SET ?', data, (err, result) => { 
      if (err) throw err; // Se houver erro, exibe o erro
      callback(result); // Se não houver erro, chama a função de retorno com o resultado
    });
  }
}

module.exports = UserModel; // Exporta a classe de modelo de usuário