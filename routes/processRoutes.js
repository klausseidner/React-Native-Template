////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo de rotas para o recurso de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'; // Importa o módulo express
import ProcessController from '../controllers/ProcessController.js'; // Importa o controlador de processos
import authenticateUser from '../middleware/authMiddleware.js'; // Importa o middleware de autenticação
const router = express.Router(); // Cria um objeto de roteamento
import redisClient from '../config/redis.js'; // Importa o cliente do Redis
import logger from '../utils/logger.js'; // Importa o módulo de log

////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware para verificar cache
////////////////////////////////////////////////////////////////////////////////////////////////////
const checkCache = async (req, res, next) => {
    const processId = req.params.id; // Obtém o ID do processo
    try { // Tenta obter o processo do cache
      const cachedProcess = await redisClient.get(`process:${processId}`); // Obtém o processo do cache
      
      // Se o processo estiver no cache, retorna o processo
      if (cachedProcess) {
        return res.json(JSON.parse(cachedProcess)); // Retorna o processo do cache
      } else { // Se o processo não estiver no cache, chama a próxima função
        next(); // Chama a próxima função
      }
    } catch (error) { // Se houver um erro, exibe o erro no console e chama a próxima função
      logger.error(`processRoutes.js-> Erro ao obter processo do cache: ${error.message}`, { stack: error.stack }); // Exibe o erro no console
      next(); // Chama a próxima função
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota para obter um processo por ID
////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:id', checkCache, ProcessController.getProcess); // Rota para obter um processo por ID
// Rota para criar ou atualizar um processo (salva no cache após criação/atualização)
router.post('/', async (req, res) => {
  const process = await ProcessController.createProcess(req.body); // Cria um novo processo

  // Armazena a resposta no cache Redis
  redisClient.set(`process:${process.id}`, JSON.stringify(process), {
    EX: 3600, // Expira em 1 hora
  });

  res.json(process); // Retorna o processo criado
});
router.post('/process', authenticateUser, ProcessController.create); // Rota para criação de processos
router.get('/admin/processes', authenticateUser, ProcessController.listAll); // Rota para listagem de processos
router.put('/process/:id/status', authenticateUser, ProcessController.updateStatus); // Rota para atualização de status

export default router; // Exporta o objeto de roteamento

////////////////////////////////////////////////////////////////////////////////////////////////////