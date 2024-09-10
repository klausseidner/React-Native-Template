////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilitario para generar tokens JWT
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken
const dotenv = require('react-native-dotenv'); // Importa o módulo dotenv

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para gerar um token JWT
////////////////////////////////////////////////////////////////////////////////////////////////////
function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, dotenv.config().parsed.JWT_SECRET, { // Gera um token com o ID e a função do usuário
    expiresIn: process.env.JWT_EXPIRATION || '3600', // Define o tempo de expiração do token
  });
}

module.exports = { generateToken }; // Exporta a função de geração de token

////////////////////////////////////////////////////////////////////////////////////////////////////