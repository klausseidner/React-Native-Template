////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por criar uma instância para realizar requisições à API
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios'; // Para realizar requisições HTTP
import * as SecureStore from 'expo-secure-store'; // Para armazenar o token de maneira segura
const env = require('react-native-config'); // Importa o módulo react-native-config
const logger = require('./utils/logger'); // Importa o módulo logger

////////////////////////////////////////////////////////////////////////////////////////////////////
// Cria uma instância da API com a URL base
////////////////////////////////////////////////////////////////////////////////////////////////////
const api = axios.create({
  baseURL: env.CLIENT_API_URL + ':' + env.CLIENT_API_PORT || 'http://localhost:3000', // URL base da API
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// Intercepta as requisições antes de serem enviadas
////////////////////////////////////////////////////////////////////////////////////////////////////
api.interceptors.request.use(
  async config => { // Função de callback
    const token = await SecureStore.getItemAsync('token');  // Obtém o token armazenado de forma segura
    // Adiciona o token ao cabeçalho da requisição, se estiver disponível
    if (token) {
      env.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    }
    return config; // Retorna a configuração da requisição
  },
  error => Promise.reject(error) // Retorna o erro caso ocorra
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Intercepta as respostas da API
////////////////////////////////////////////////////////////////////////////////////////////////////
api.interceptors.response.use(
  response => response, // Retorna a resposta normalmente se tudo estiver correto
  error => {
    // Tratamento de erros genéricos
    if (error.response) {
      // Verifica o código de status do erro
      if (error.response.status === 401) { 
        return Promise.reject(new Error('Credenciais inválidas. Faça login novamente.')); // Erro de autenticação
      } else if (error.response.status === 500) { 
        return Promise.reject(new Error('Erro no servidor. Tente novamente mais tarde.')); // Erro do servidor
      }
    } else {
      // Caso o erro não seja de resposta (problema na conexão, etc.)
      return Promise.reject(new Error('Erro ao se comunicar com o servidor. Verifique sua conexão.'));
    }
    return Promise.reject(error); // Retorna o erro
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para armazenar o token de maneira segura
////////////////////////////////////////////////////////////////////////////////////////////////////
export const saveToken = async (token) => {
  try { // Tenta salvar o token
    await SecureStore.setItemAsync('token', token); // Salva o token de forma segura
  } catch (error) { // Tratamento de erros
    logger.error(`Erro ao salvar o token: ${error.message}`, { stack: error.stack }); // Registra um erro no arquivo de log
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para remover o token (logout)
////////////////////////////////////////////////////////////////////////////////////////////////////
export const removeToken = async () => {
  try { // Tenta remover o token
    await SecureStore.deleteItemAsync('token'); // Remove o token de forma segura
  } catch (error) { // Tratamento de erros
    logger.error(`Erro ao remover o token: ${error.message}`, { stack: error.stack }); // Registra um erro no arquivo de log
  }
};

export default api; // Exporta a instância da API para uso em outros arquivos

////////////////////////////////////////////////////////////////////////////////////////////////////