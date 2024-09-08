////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para login	
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text } from 'react-native'; // Importa os componentes de interface
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

  // Função para fazer login
  const handleLogin = async () => {
    try { // Tenta fazer login
      const response = await api.post('/auth/login', { email, password }); // Faz login
      const { token } = response.data; // Obtém o token
      await AsyncStorage.setItem('token', token); // Armazena o token no AsyncStorage
      navigation.navigate('CreateProcess');  // Redireciona o usuário após o login bem-sucedido
    } catch (error) { // Se houver erro
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.'); // Exibe uma mensagem de erro
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de login
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4')}>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={tailwind('border p-2 mb-4 rounded')}
      />
      <TextInput 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={tailwind('border p-2 mb-4 rounded')}
      />
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}