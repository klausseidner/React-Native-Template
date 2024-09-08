////////////////////////////////////////////////////////////////////////////////////////////////////
// Arquivo responsável por criar uma instância para realizar requisições à API
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import axios from 'axios'; // Importa o módulo axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o módulo AsyncStorage

// Cria uma instância do axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base da API
});

// Intercepta as requisições para adicionar o token de autenticação
api.interceptors.request.use(async (config) => { // Intercepta as requisições
  const token = await AsyncStorage.getItem('token'); // Obtém o token de autenticação
  if (token) { // Se houver token
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho da requisição
  }
  return config; // Retorna a configuração da requisição
});

export default api; // Exporta a instância da API