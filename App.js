////////////////////////////////////////////////////////////////////////////////////////////////////
// Aplicativo de gerenciamento de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
// 
// Autor: Klaus Seidner
// 
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react';  // Importa o módulo react e useState para gerenciar estados
import { View, Text, Button } from 'react-native';  // Importa os componentes básicos do React Native
import { NavigationContainer } from '@react-navigation/native';  // Importa o módulo de navegação
import { createStackNavigator } from '@react-navigation/stack';  // Importa o módulo de navegação em pilha
import tailwind from 'tailwind-rn';  // Importa Tailwind CSS para estilização
import { AuthProvider } from './context/AuthContext'; // Importa o contexto de autenticação

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações das telas do aplicativo
////////////////////////////////////////////////////////////////////////////////////////////////////
import Login from './views/Login';  // Importa a tela de login
import CreateProcess from './views/CreateProcess';  // Importa a tela de criação de processo
import AdminDashboard from './views/AdminDashboard';  // Importa a tela de dashboard de administrador
import EditProfile from './views/EditProfile';  // Importa a tela de edição de perfil
import AdminEditProcess from './views/AdminEditProcess';  // Importa a tela de edição de processo pelo admin
import UserProcesses from './views/UserProcesses';  // Importa a tela de processos do usuário
import EditProcess from './views/EditProcess';  // Importa a tela de edição de processo

const Stack = createStackNavigator();  // Cria uma pilha de navegação

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente principal do aplicativo
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function App() {
  const [error, setError] = useState(null);  // Estado para gerenciar erros de navegação ou login

  // Função para tratar a navegação e capturar erros
  const handleNavigation = (navigateTo, navigation) => {
    try {
      navigation.navigate(navigateTo);  // Tenta navegar para a tela solicitada
    } catch (error) {
      setError('Erro ao navegar. Tente novamente mais tarde.');  // Define o estado de erro
      console.error(error);  // Loga o erro no console
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Renderiza uma tela de erro caso algum erro ocorra
////////////////////////////////////////////////////////////////////////////////////////////////////
  if (error) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-red-100')}> {/* Estilização com Tailwind */}
        <Text style={tailwind('text-red-500 text-lg')}>{error}</Text>  {/* Exibe a mensagem de erro */}
        <Button title="Tentar novamente" onPress={() => setError(null)} />  {/* Botão para tentar novamente */}
      </View>
    );
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a navegação do aplicativo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <AuthProvider> {/* Provedor de autenticação */}
      <NavigationContainer> {/* Container de navegação */}
        <Stack.Navigator initialRouteName="Login">  {/* Define a tela inicial como "Login" */}
          <Stack.Screen name="Login" component={Login} />  {/* Tela de login */}
          <Stack.Screen name="CreateProcess" component={CreateProcess} />  {/* Tela de criação de processo */}
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />  {/* Tela de dashboard do admin */}
          <Stack.Screen name="EditProfile" component={EditProfile} />  {/* Tela de edição de perfil */}
          <Stack.Screen name="AdminEditProcess" component={AdminEditProcess} />  {/* Tela de edição de processos */}
          <Stack.Screen name="UserProcesses" component={UserProcesses} />  {/* Tela de processos do usuário */}
          <Stack.Screen name="EditProcess" component={EditProcess} />  {/* Tela de edição de processos */}
        </Stack.Navigator> {/* Pilha de navegação */}
      </NavigationContainer> {/* Fim do container de navegação */}
    </AuthProvider> // Fim do provedor de autenticação
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////