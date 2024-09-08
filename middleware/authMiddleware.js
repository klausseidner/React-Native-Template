////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo que fornece recursos de autenticação de usuários
// /////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const jwt = require('jsonwebtoken'); // Importa o módulo para geração de tokens

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função de autenticação de usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
function authenticateUser(req, res, next) { 
  const token = req.headers['authorization']; // Obtém o token de autorização do cabeçalho da requisição
  if (!token) return res.status(403).send('Token não fornecido.'); // Se não houver token, retorna um erro de acesso negado

  // Verifica o token
  jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => { // Verifica o token com a chave secreta
    if (err) return res.status(401).send('Token inválido.'); // Se o token for inválido, retorna um erro de não autorizado
    req.user = decoded; // Se o token for válido, decodifica o token e armazena o usuário na requisição
    next(); // Chama a próxima função
  });
}

module.exports = authenticateUser; // Exporta a função de autenticação de usuário

////////////////////////////////////////////////////////////////////////////////////////////////////