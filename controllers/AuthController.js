////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador de autenticação
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const bcrypt = require('bcrypt'); // Importa o módulo bcrypt
const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken
const { validationResult } = require('express-validator'); // Importa a função de validação de entrada
const env = require('react-native-config'); // Importa o módulo react-native-config
const UserModel = require('../models/UserModel'); // Importa o modelo de usuário
const { generateToken } = require('../utils/tokenUtils'); // Importa a função de geração de token

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função de registro de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
const AuthController = {

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de registro de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  async register(req, res) { 
    const errors = validationResult(req); // Validação de entrada
    // Se houver erros, retorna os erros
    if (!errors.isEmpty()) {  
      return res.status(400).json({ errors: errors.array() }); // Retorna os erros
    }

    const { email, password, name } = req.body; // Extrai os dados do corpo da requisição
    try { // Tenta executar o código
      const existingUser = await UserModel.findOne({ email }); // Verifica se o usuário já existe
      // Se o usuário já existe, retorna uma mensagem de erro
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' }); // Retorna uma mensagem de erro
      }

      const hashedPassword = bcrypt.hashSync(password, 10); // Gera um hash da senha
      const newUser = await UserModel.create({ email, password: hashedPassword, name }); // Cria um novo usuário

      const token = generateToken(newUser); // Gera um token
      return res.json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } }); // Retorna o token e os dados do usuário

    } catch (error) { // Se houver um erro, exibe o erro
      console.error("Erro ao registrar usuário:", error); // Exibe o erro
      return res.status(500).json({ message: 'Erro ao registrar usuário' }); // Retorna uma mensagem de erro
    }
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de login de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  async login(req, res) {
    const errors = validationResult(req); // Validação de entrada
    // Se houver erros, retorna os erros
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() }); // Retorna os erros
    }

    const { email, password } = req.body; // Extrai os dados do corpo da requisição
    try { // Tenta executar o código
      const user = await UserModel.findOne({ email }); // Busca o usuário pelo e-mail
      // Se o usuário não existe, retorna uma mensagem de erro
      if (!user) {
        return res.status(400).json({ message: 'Credenciais inválidas' }); // Retorna uma mensagem de erro
      }

      const isMatch = bcrypt.compareSync(password, user.password); // Compara as senhas
      // Se as senhas não coincidem, retorna uma mensagem de erro
      if (!isMatch) { 
        return res.status(400).json({ message: 'Credenciais inválidas' }); // Retorna uma mensagem de erro
      }

      const token = generateToken(user); // Gera um token
      return res.json({ token, user: { id: user.id, email: user.email, name: user.name } }); // Retorna o token e os dados do usuário

    } catch (error) { // Se houver um erro, exibe o erro
      console.error("Erro ao fazer login:", error); // Exibe o erro
      return res.status(500).json({ message: 'Erro ao fazer login' }); // Retorna uma mensagem de erro
    }
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de logout (gerenciamento do lado cliente)
////////////////////////////////////////////////////////////////////////////////////////////////////
  logout(req, res) {
    // O logout geralmente é tratado no cliente ao remover o token, mas pode haver lógica adicional aqui.
    return res.status(200).json({ message: 'Logout bem-sucedido' }); // Retorna uma mensagem de sucesso
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de verificação de token
////////////////////////////////////////////////////////////////////////////////////////////////////
  verifyToken(req, res, next) {
    const token = req.headers['authorization']; // Extrai o token do cabeçalho da requisição
    // Se o token não foi fornecido, retorna uma mensagem de erro
    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' }); // Retorna uma mensagem de erro
    }

    try { // Tenta executar o código
      const decoded = jwt.verify(token, env.JWT_SECRET); // Decodifica o token
      // Verifica se o token expirou
      if (decoded.exp < Date.now() / env.JWT_EXPIRATION) {
        return res.status(401).json({ message: 'Token expirado' }); // Retorna uma mensagem de erro
      }
      req.user = decoded; // Adiciona o usuário decodificado ao objeto de requisição
      next(); // Chama o próximo middleware
    } catch (error) { // Se houver um erro, exibe o erro
      return res.status(401).json({ message: 'Token inválido ou expirado' }); // Retorna uma mensagem de erro
    }
  }
};

module.exports = AuthController; // Exporta o controlador de autenticação

////////////////////////////////////////////////////////////////////////////////////////////////////