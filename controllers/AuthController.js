////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar a autenticação dos usuários
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const UserModel = require('../models/UserModel'); // Importa o modelo de usuário
const bcrypt = require('bcrypt'); // Importa o módulo bcrypt
const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken

// Define uma chave secreta para assinar os tokens JWT (mantenha isso seguro e fora do código em produção)
const JWT_SECRET = 'minha_chave_secreta'; 
const JWT_EXPIRATION = '1h'; // Define o tempo de expiração do token

////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador de autenticação
////////////////////////////////////////////////////////////////////////////////////////////////////
const AuthController = { 

  // Função de login
  async login(req, res) { 
    const { email, password } = req.body; // Obtém o email e a senha do corpo da requisição

    try { // Busca um usuário pelo email
      const user = await UserModel.findByEmail(email); // Busca um usuário pelo email

      // Se o usuário não existir ou a senha estiver incorreta
      if (!user || !bcrypt.compareSync(password, user.password)) { 
        return res.status(401).json({ message: 'Credenciais inválidas' }); // Retorna um erro 401
      }

      // Se o usuário existir e a senha estiver correta, gera um token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

      // Retorna o token de autenticação
      return res.json({ token });
      
    } catch (error) { // Se ocorrer um erro
      console.error("Erro ao realizar login: ", error); // Loga o erro no console
      return res.status(500).json({ message: 'Erro ao realizar login' }); // Retorna um erro 500
    }
  },

  // Função para registrar um novo usuário (com criptografia de senha)
  async register(req, res) {
    const { email, password, name } = req.body; // Obtém o email, senha e nome do corpo da requisição

    try { // Verifica se o usuário já existe
      const existingUser = await UserModel.findByEmail(email); // Busca um usuário pelo email
      if (existingUser) { // Se o usuário já existir
        return res.status(400).json({ message: 'Usuário já registrado com este email' }); // Retorna um erro 400
      }

      // Criptografa a senha
      const hashedPassword = bcrypt.hashSync(password, 10); // 10 rounds para gerar o hash seguro

      // Cria o novo usuário
      const newUser = await UserModel.create({ email, password: hashedPassword, name });

      // Gera um token JWT para o novo usuário
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

      // Retorna o token e os dados do usuário recém-criado
      return res.json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
      
    } catch (error) { // Se ocorrer um erro
      console.error("Erro ao registrar usuário: ", error); // Loga o erro no console
      return res.status(500).json({ message: 'Erro ao registrar usuário' }); // Retorna um erro 500
    }
  },

  // Função para verificar o token JWT
  verifyToken(req, res, next) {
    const token = req.headers['authorization']; // Obtém o token do cabeçalho Authorization

    // Se o token não for fornecido
    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' }); // Retorna um erro 403
    }

    try { // Verifica e decodifica o token
      const decoded = jwt.verify(token, JWT_SECRET); // Decodifica o token com a chave secreta
      req.user = decoded; // Armazena as informações do usuário no request

      next(); // Prossegue para a próxima função middleware ou rota
    } catch (error) { // Se o token for inválido ou expirado
      return res.status(401).json({ message: 'Token inválido ou expirado' }); // Retorna um erro 401
    }
  }
};

module.exports = AuthController; // Exporta o controlador de autenticação