////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para login	
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Importa o módulo react e os hooks de estado
import { View, TextInput, Button, Text, TouchableOpacity, ActivityIndicator } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API
import * as SecureStore from 'expo-secure-store'; // Importa o SecureStore para armazenamento seguro
import { useAuth } from '../context/AuthContext'; // Importe o contexto de autenticação

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para login
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Login({ navigation }) {
  const [email, setEmail] = useState(''); // Define o estado de email
  const [password, setPassword] = useState(''); // Define o estado de senha
  const [errorMessage, setErrorMessage] = useState(''); // Define o estado de mensagem de erro
  const [loading, setLoading] = useState(false); // Define o estado de carregamento
  const { login } = useAuth(); // Obtenha a função de login do contexto de autenticação

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para validar os campos
////////////////////////////////////////////////////////////////////////////////////////////////////
  const validateFields = () => { 
    // Verifica se os campos estão preenchidos
    if (!email || !password) {  
      setErrorMessage('E-mail e senha são obrigatórios.'); // Exibe uma mensagem de erro
      return false; // Retorna falso
    }
    return true; // Retorna verdadeiro
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para fazer login
////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleLogin = async () => { 
    // Verifica se os campos são válidos
    if (!validateFields()) return; 

    setLoading(true); // Ativa o indicador de carregamento
    try { // Tenta fazer login
      const response = await api.post('/auth/login', { email, password }); // Faz login
      const { token } = response.data; // Obtém o token

      // Armazena o token de maneira segura
      await SecureStore.setItemAsync('token', token);

      // Marca o usuário como autenticado usando o contexto
      login();

      // Redireciona para a página desejada
      navigation.navigate('Dashboard');
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de login
////////////////////////////////////////////////////////////////////////////////////////////////////
  return ( // Retorna a interface de login
    <View style={tailwind('p-4 bg-gray-100 flex-1 justify-center')}> {/* Estilização com Tailwind */}
      <Text style={tailwind('text-2xl font-bold mb-6 text-center')}>Login</Text> {/* Título da página */}

      <TextInput // Campo de texto para o email
        placeholder="Email" // Texto de orientação
        value={email} // Valor do campo
        onChangeText={setEmail} // Função para atualizar o campo
        style={tailwind('border border-gray-300 p-3 mb-4 rounded bg-white')} // Estilização com Tailwind
        keyboardType="email-address" // Tipo de teclado
        autoCapitalize="none" // Desativa a capitalização automática
      />
      <TextInput
        placeholder="Senha" // Texto de orientação
        value={password} // Valor do campo
        onChangeText={setPassword} // Função para atualizar o campo
        secureTextEntry // Campo de senha
        style={tailwind('border border-gray-300 p-3 mb-4 rounded bg-white')} // Estilização com Tailwind
      />

      {errorMessage ? ( // Se houver mensagem de erro
        <Text style={tailwind('text-red-500 text-center mb-4')}>{errorMessage}</Text> // Exibe a mensagem de erro
      ) : null} {/* Senão, não exibe nada */}

      {loading ? ( // Se estiver carregando
        <ActivityIndicator size="large" color="#4F8EF7" /> // Exibe o indicador de carregamento
      ) : ( // Senão
        <TouchableOpacity onPress={handleLogin} style={tailwind('bg-blue-500 p-3 rounded')}> {/* Botão de login */}
          <Text style={tailwind('text-white text-center font-bold')}>Login</Text> {/* Texto do botão */}
        </TouchableOpacity> // Fim do botão de login
      )}
    </View> // Fim da interface de login
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////