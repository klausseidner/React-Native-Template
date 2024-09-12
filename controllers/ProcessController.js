////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import ProcessModel from '../models/ProcessModel.js'; // Importa o modelo de processo
import { validationResult, body } from 'express-validator'; // Importa express-validator para validar e sanitizar entradas
import redisClient from '../config/redis.js'; // Importa o cliente do Redis

////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
const ProcessController = { 

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de criação de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  create: [
    body('title').isString().trim().escape().withMessage('O título deve ser uma string válida'), // Valida e sanitiza o título
    body('description').isString().trim().escape().withMessage('A descrição deve ser uma string válida'), // Valida e sanitiza a descrição
    body('option').isInt({ min: 1, max: 6 }).withMessage('A opção deve ser um número entre 1 e 6'), // Valida a opção
    (req, res) => { // Função de criação de processo
      const errors = validationResult(req); // Validação de entrada
      // Se houver erros, retorna os erros
      if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() }); // Retorna os erros
      }

      const userId = req.user.id; // Obtém o ID do usuário
      const { title, description, option } = req.body; // Extrai os dados do corpo da requisição
      const newProcess = { user_id: userId, title, description, option, version: 1 }; // Cria um novo processo

      // Cria o processo no banco de dados
      ProcessModel.createProcess(newProcess, (result) => { // Cria um novo processo
        redisClient.del('processes:listAll'); // Remove o cache de listagem de processos
        res.json({ message: 'Processo criado com sucesso!', result }); // Retorna uma mensagem de sucesso
      });
    }
  ],

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de listagem de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
  listAll(req, res) {
    if (req.user.role !== 'administrativo') { // Verifica se o usuário é administrativo
      return res.status(403).json({ message: 'Acesso negado' }); // Retorna uma mensagem de acesso negado
    }

    // Verifica se há processos no cache
    redisClient.get('processes:listAll', (err, cachedProcesses) => { // Obtém os processos do cache
      // Se houver processos no cache, retorna os processos
      if (cachedProcesses) { 
        return res.json(JSON.parse(cachedProcesses)); // Retorna os processos do cache
      }

      // Se não houver processos no cache, busca os processos no banco de dados
      ProcessModel.findAll((results) => { // Busca todos os processos
        redisClient.set('processes:listAll', JSON.stringify(results), 'EX', 3600); // Armazena os processos no cache
        res.json(results); // Retorna os processos
      });
    });
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de obtenção de processo por ID
////////////////////////////////////////////////////////////////////////////////////////////////////
  async getProcess(req, res) {
    try { // Tenta obter o processo
      const process = await ProcessModel.findById(req.params.id); // Busca o processo por ID
      // Se o processo não existir, retorna uma mensagem de erro
      if (!process) {
        return res.status(404).json({ message: 'Processo não encontrado' }); // Retorna uma mensagem de erro
      }
      res.json(process); // Retorna o processo
    } catch (error) { // Se houver um erro, exibe o erro
      res.status(500).json({ message: 'Erro ao obter o processo' }); // Retorna uma mensagem de erro
    }
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de listagem de processos por usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  listByUser(req, res) {
    const userId = req.user.id; // Obtém o ID do usuário
    ProcessModel.findByUser(userId, (results) => { // Busca os processos do usuário
      res.json(results); // Retorna os processos
    });
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de atualização de status
////////////////////////////////////////////////////////////////////////////////////////////////////
  updateStatus: [
    body('status').isIn(['ativo', 'em processo', 'concluído', 'repugnado']).withMessage('Status inválido'), // Valida o status
    (req, res) => { // Função de atualização de status
      const errors = validationResult(req); // Validação de entrada
      // Se houver erros, retorna os erros
      if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() }); // Retorna os erros
      }

      // Verifica se o usuário é administrativo
      if (req.user.role !== 'administrativo') {
        return res.status(403).json({ message: 'Acesso negado' }); // Retorna uma mensagem de acesso negado
      }

      const { status } = req.body; // Extrai o status do corpo da requisição
      
      // Atualiza o status do processo
      ProcessModel.updateStatus(req.params.id, status, (result) => {
        redisClient.del('processes:listAll'); // Remove o cache de listagem de processos
        res.json({ message: 'Status atualizado com sucesso!' }); // Retorna uma mensagem de sucesso
      });
    }
  ]
};

export default ProcessController; // Exporta o controlador de processos

////////////////////////////////////////////////////////////////////////////////////////////////////