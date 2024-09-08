////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de rotas para autenticação de usuários
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const express = require('express'); // Importa o módulo express 
const AuthController = require('../controllers/AuthController'); // Importa o controlador de autenticação
const router = express.Router(); // Cria um objeto de roteamento

router.post('/login', AuthController.login); // Rota para autenticação de usuários

module.exports = router; // Exporta o objeto de roteamento