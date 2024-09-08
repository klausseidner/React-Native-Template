////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por controlar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
const ProcessModel = require('../models/ProcessModel'); // Importa o modelo de processo

////////////////////////////////////////////////////////////////////////////////////////////////////
// Controlador de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
const ProcessController = { // Exporta um objeto com funções de processos
  create(req, res) { // Função de criação de processo
    const { title, description, option } = req.body; // Obtém o título, a descrição e a opção do corpo da requisição
    const userId = req.user.id; // Obtém o ID do usuário autenticado

    const newProcess = { user_id: userId, title, description, option, version: 1 }; // Cria um objeto com os dados do novo processo

    // Cria um novo processo no banco de dados
    ProcessModel.createProcess(newProcess, (result) => { // Chama a função de criação de processo do modelo
      res.json({ message: 'Processo criado com sucesso!', result }); // Retorna uma mensagem de sucesso
    });
  },
  
  // Função de listagem de processos
  listAll(req, res) { 
    // Se o usuário não for administrativo, retorna um erro de acesso negado
    if (req.user.role !== 'administrativo') {
      return res.status(403).json({ message: 'Acesso negado' }); // Retorna um erro de acesso negado
    }

    // Busca todos os processos no banco de dados
    ProcessModel.findAll((results) => {
      res.json(results); // Retorna os processos encontrados
    });
  },

  // Função de atualização de status
  updateStatus(req, res) {
    const { status } = req.body; // Obtém o status do corpo da requisição

    // Se o usuário não for administrativo, retorna um erro de acesso negado
    if (req.user.role !== 'administrativo') {
      return res.status(403).json({ message: 'Acesso negado' }); // Retorna um erro de acesso negado
    }

    // Atualiza o status do processo no banco de dados
    ProcessModel.updateStatus(req.params.id, status, (result) => { // Chama a função de atualização de status do modelo
      res.json({ message: 'Status atualizado com sucesso!' }); // Retorna uma mensagem de sucesso
    });
  }
};

module.exports = ProcessController; // Exporta o controlador de processos