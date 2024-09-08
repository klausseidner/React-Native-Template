////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de rotas para o recurso de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const express = require('express'); // Importa o módulo express
const ProcessController = require('../controllers/ProcessController'); // Importa o controlador de processos
const authenticateUser = require('../middleware/authMiddleware'); // Importa o middleware de autenticação
const router = express.Router(); // Cria um objeto de roteamento

router.post('/process', authenticateUser, ProcessController.create); // Rota para criação de processos
router.get('/admin/processes', authenticateUser, ProcessController.listAll); // Rota para listagem de processos
router.put('/process/:id/status', authenticateUser, ProcessController.updateStatus); // Rota para atualização de status

module.exports = router; // Exporta o objeto de roteamento
