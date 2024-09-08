////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar a autenticação dos usuários
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const UserModel = require('../models/UserModel'); // Importa o modelo de usuário
const bcrypt = require('bcrypt'); // Importa o módulo bcrypt
const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken

////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador de autenticação
////////////////////////////////////////////////////////////////////////////////////////////////////
const AuthController = { // Exporta um objeto com funções de autenticação
  login(req, res) { // Função de login
    const { email, password } = req.body; // Obtém o email e a senha do corpo da requisição

    UserModel.findByEmail(email, (user) => { // Busca um usuário pelo email
      // Se o usuário não existir ou a senha estiver incorreta
      if (!user || !bcrypt.compareSync(password, user.password)) { 
        return res.status(401).json({ message: 'Credenciais inválidas' }); // Retorna um erro de credenciais inválidas
      }
      
      // Se o usuário existir e a senha estiver correta, gera um token de autenticação
      const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
      res.json({ token }); // Retorna o token de autenticação
    });
  }
};

module.exports = AuthController; // Exporta o controlador de autenticação