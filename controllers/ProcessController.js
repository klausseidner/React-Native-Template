////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
const ProcessModel = require('../models/ProcessModel'); // Importa o modelo de processo
const { validationResult, body } = require('express-validator'); // Importa express-validator para validar e sanitizar entradas

////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
const ProcessController = { 

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de criação de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  create: [
    // Validação e sanitização dos campos
    body('title').isString().trim().escape().withMessage('O título deve ser uma string válida'), // Valida e sanitiza o título
    body('description').isString().trim().escape().withMessage('A descrição deve ser uma string válida'), // Valida e sanitiza a descrição
    body('option').isInt({ min: 1, max: 6 }).withMessage('A opção deve ser um número entre 1 e 6'), // Valida a opção

    // Função de callback para criação de processo
    (req, res) => { 
      // Verifica se há erros de validação
      const errors = validationResult(req);

      // Se houver erros, retorna um erro 400
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Retorna um erro 400 com os erros de validação
      }

      // Obtém o ID do usuário autenticado
      const userId = req.user.id; // Obtém o ID do usuário autenticado

      // Cria um objeto com os dados do novo processo
      const { title, description, option } = req.body; // Obtém os dados do corpo da requisição
      const newProcess = { user_id: userId, title, description, option, version: 1 }; // Cria um novo processo

      // Cria um novo processo no banco de dados
      ProcessModel.createProcess(newProcess, (result) => {
        res.json({ message: 'Processo criado com sucesso!', result }); // Retorna uma mensagem de sucesso
      });
    }
  ],

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de listagem de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
  listAll(req, res) {
    // Se o usuário não for administrativo, retorna um erro de acesso negado
    if (req.user.role !== 'administrativo') {
      return res.status(403).json({ message: 'Acesso negado' }); // Retorna um erro 403
    }

    // Busca todos os processos no banco de dados
    ProcessModel.findAll((results) => {
      res.json(results); // Retorna os resultados como JSON
    });
  },

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de atualização de status
////////////////////////////////////////////////////////////////////////////////////////////////////
  updateStatus: [
    // Validação e sanitização do campo status
    body('status').isIn(['ativo', 'em processo', 'concluído', 'repugnado']).withMessage('Status inválido'), // Valida o status

    // Função de callback para atualização de status
    (req, res) => {
      // Verifica se há erros de validação
      const errors = validationResult(req); // Obtém os erros de validação

      // Se houver erros, retorna um erro 400
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Retorna um erro 400 com os erros de validação
      }

      // Se o usuário não for administrativo, retorna um erro de acesso negado
      if (req.user.role !== 'administrativo') {
        return res.status(403).json({ message: 'Acesso negado' }); // Retorna um erro 403
      }

      const { status } = req.body; // Obtém o status do corpo da requisição
      
      // Atualiza o status do processo
      ProcessModel.updateStatus(req.params.id, status, (result) => {
        res.json({ message: 'Status atualizado com sucesso!' }); // Retorna uma mensagem de sucesso
      });
    }
  ]
};

module.exports = ProcessController; // Exporta o controlador de processos

////////////////////////////////////////////////////////////////////////////////////////////////////