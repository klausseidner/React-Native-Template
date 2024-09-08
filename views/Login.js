////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para login	
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text, TouchableOpacity, ActivityIndicator } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o módulo AsyncStorage

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para login
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Login({ navigation }) {
  const [email, setEmail] = useState(''); // Define o estado de email
  const [password, setPassword] = useState(''); // Define o estado de senha
  const [errorMessage, setErrorMessage] = useState(''); // Define o estado de mensagem de erro
  const [loading, setLoading] = useState(false); // Define o estado de carregamento

  // Função para fazer login
  const handleLogin = async () => {
    setLoading(true); // Ativa o indicador de carregamento
    try { // Tenta fazer login
      const response = await api.post('/auth/login', { email, password }); // Faz login
      const { token } = response.data; // Obtém o token
      await AsyncStorage.setItem('token', token); // Armazena o token no AsyncStorage
      navigation.navigate('CreateProcess');  // Redireciona o usuário após o login bem-sucedido
    } catch (error) { // Se houver erro
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.'); // Exibe uma mensagem de erro
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Retorna a interface de login
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100 flex-1 justify-center')}>
      <Text style={tailwind('text-2xl font-bold mb-6 text-center')}>Login</Text>

      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={tailwind('border border-gray-300 p-3 mb-4 rounded bg-white')}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={tailwind('border border-gray-300 p-3 mb-4 rounded bg-white')}
      />

      {errorMessage ? (
        <Text style={tailwind('text-red-500 text-center mb-4')}>{errorMessage}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <TouchableOpacity
          onPress={handleLogin}
          style={tailwind('bg-blue-500 p-3 rounded')}
        >
          <Text style={tailwind('text-white text-center font-bold')}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}