////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import ProcessModel from '../models/ProcessModel.js'; // Importa o modelo de processo
import { validationResult, body } from 'express-validator'; // Importa express-validator para validar e sanitizar entradas
import redisClient from '../config/redis.js'; // Importa o cliente do Redis

const ProcessController = { 

  // Função de criação de processo
  create: [
    body('title').isString().trim().escape().withMessage('O título deve ser uma string válida'),
    body('description').isString().trim().escape().withMessage('A descrição deve ser uma string válida'),
    body('option').isInt({ min: 1, max: 6 }).withMessage('A opção deve ser um número entre 1 e 6'),
    (req, res) => { 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { title, description, option } = req.body;
      const newProcess = { user_id: userId, title, description, option, version: 1 };

      ProcessModel.createProcess(newProcess, (result) => {
        redisClient.del('processes:listAll');
        res.json({ message: 'Processo criado com sucesso!', result });
      });
    }
  ],

  // Função de listagem de processos
  listAll(req, res) {
    if (req.user.role !== 'administrativo') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    redisClient.get('processes:listAll', (err, cachedProcesses) => {
      if (cachedProcesses) {
        return res.json(JSON.parse(cachedProcesses));
      }

      ProcessModel.findAll((results) => {
        redisClient.set('processes:listAll', JSON.stringify(results), 'EX', 3600);
        res.json(results);
      });
    });
  },

  // Função de obtenção de processo por ID
  async getProcess(req, res) {
    try {
      const process = await ProcessModel.findById(req.params.id);
      if (!process) {
        return res.status(404).json({ message: 'Processo não encontrado' });
      }
      res.json(process);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter o processo' });
    }
  },

  // Função de listagem de processos por usuário
  listByUser(req, res) {
    const userId = req.user.id;
    ProcessModel.findByUser(userId, (results) => {
      res.json(results);
    });
  },

  // Função de atualização de status
  updateStatus: [
    body('status').isIn(['ativo', 'em processo', 'concluído', 'repugnado']).withMessage('Status inválido'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.user.role !== 'administrativo') {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      const { status } = req.body;
      ProcessModel.updateStatus(req.params.id, status, (result) => {
        redisClient.del('processes:listAll');
        res.json({ message: 'Status atualizado com sucesso!' });
      });
    }
  ]
};

export default ProcessController;
