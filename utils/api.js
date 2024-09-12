////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por criar uma instância para realizar requisições à API
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios'; // Importa o módulo axios para requisições HTTP
import * as SecureStore from 'expo-secure-store'; // Importa o módulo SecureStore para armazenamento seguro
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import logger from 'logger.js'; // Importa o módulo logger

////////////////////////////////////////////////////////////////////////////////////////////////////
// Cria uma instância do axios para realizar requisições à API
////////////////////////////////////////////////////////////////////////////////////////////////////
const api = axios.create({
  baseURL: env.CLIENT_API_URL + ':' + env.CLIENT_API_PORT || 'http://localhost:3000', // URL da API
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Intercepta as requisições para adicionar o token de autenticação
////////////////////////////////////////////////////////////////////////////////////////////////////
api.interceptors.request.use(
  async config => { // Callback de requisição
    const token = await SecureStore.getItemAsync('token'); // Obtém o token armazenado
    // Se houver um token, adiciona o cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o cabeçalho de autorização
    }
    return config; // Retorna a configuração
  },
  error => Promise.reject(error) // Se houver um erro, rejeita a promessa
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Intercepta as respostas para tratamento de erros
////////////////////////////////////////////////////////////////////////////////////////////////////
api.interceptors.response.use(
  response => response, // Se a resposta for bem-sucedida, retorna a resposta
  error => { // Se houver um erro
    if (error.response) { // Se houver uma resposta
      if (error.response.status === 401) { // Se o status for 401 (não autorizado)
        return Promise.reject(new Error('Credenciais inválidas. Faça login novamente.')); // Retorna um erro de credenciais inválidas
      } else if (error.response.status === 500) { // Se o status for 500 (erro interno do servidor)
        return Promise.reject(new Error('Erro no servidor. Tente novamente mais tarde.')); // Retorna um erro de erro interno do servidor
      }
    } else { // Se não houver resposta
      return Promise.reject(new Error('Erro ao se comunicar com o servidor. Verifique sua conexão.')); // Retorna um erro de falha na comunicação
    }
    return Promise.reject(error); // Rejeita a promessa
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para salvar o token
////////////////////////////////////////////////////////////////////////////////////////////////////
export const saveToken = async (token) => {
  try { // Tenta salvar o token
    await SecureStore.setItemAsync('token', token); // Salva o token
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao salvar o token: ${error.message}`, { stack: error.stack }); // Exibe o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para remover o token
////////////////////////////////////////////////////////////////////////////////////////////////////
export const removeToken = async () => {
  try { // Tenta remover o token
    await SecureStore.deleteItemAsync('token'); // Remove o token
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao remover o token: ${error.message}`, { stack: error.stack }); // Exibe o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para obter o token armazenado
////////////////////////////////////////////////////////////////////////////////////////////////////
export const getToken = async () => {
  try { // Tenta obter o token
    return await SecureStore.getItemAsync('token'); // Retorna o token
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao obter o token: ${error.message}`, { stack: error.stack }); // Exibe o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Funções de interação com o backend:
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Chamada para registrar um novo usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
export const registerUser = async (userData) => {
  try { // Tenta registrar o usuário
    const response = await api.post('/auth/register', userData); // Registra o usuário
    return response.data; // Retorna os dados
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao registrar usuário: ${error.message}`, { stack: error.stack }); // Exibe o erro
    throw error; // Lança o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Chamada para fazer login
////////////////////////////////////////////////////////////////////////////////////////////////////
export const loginUser = async (credentials) => {
  try { // Tenta fazer login
    const response = await api.post('/auth/login', credentials); // Faz login
    return response.data; // Retorna os dados
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao fazer login: ${error.message}`, { stack: error.stack }); // Exibe o erro
    throw error; // Lança o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Chamada para criar um processo
////////////////////////////////////////////////////////////////////////////////////////////////////
export const createProcess = async (processData) => {
  try { // Tenta criar o processo
    const response = await api.post('/processes', processData); // Cria o processo
    return response.data; // Retorna os dados
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao criar processo: ${error.message}`, { stack: error.stack }); // Exibe o erro
    throw error; // Lança o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Chamada para listar processos por usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
export const listUserProcesses = async () => {
  try { // Tenta listar os processos do usuário
    const response = await api.get('/processes/user'); // Lista os processos do usuário
    return response.data; // Retorna os dados
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao listar processos do usuário: ${error.message}`, { stack: error.stack }); // Exibe o erro
    throw error; // Lança o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Chamada para listar todos os processos (admin)
////////////////////////////////////////////////////////////////////////////////////////////////////
export const listAllProcesses = async () => {
  try { // Tenta listar todos os processos
    const response = await api.get('/processes'); // Lista todos os processos
    return response.data; // Retorna os dados
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao listar processos: ${error.message}`, { stack: error.stack }); // Exibe o erro
    throw error; // Lança o erro
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Chamada para atualizar o status de um processo
////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateProcessStatus = async (processId, status) => {
  try { // Tenta atualizar o status do processo
    const response = await api.put(`/processes/${processId}/status`, { status }); // Atualiza o status do processo
    return response.data; // Retorna os dados
  } catch (error) { // Se houver um erro, exibe o erro
    logger.error(`Erro ao atualizar o status do processo: ${error.message}`, { stack: error.stack }); // Exibe o erro
    throw error; // Lança o erro
  }
};

export default api; // Exporta a instância do axios

////////////////////////////////////////////////////////////////////////////////////////////////////