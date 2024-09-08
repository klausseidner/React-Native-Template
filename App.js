////////////////////////////////////////////////////////////////////////////////////////////////////
// Aplicativo de gerenciamento de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
// Criado por: Klaus Seidner
// Data: 07/09/2024
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React from 'react'; // Importa o módulo react
import { NavigationContainer } from '@react-navigation/native'; // Importa o módulo de navegação
import { createStackNavigator } from '@react-navigation/stack'; // Importa o módulo de navegação em pilha
import Login from './views/Login'; // Importa a tela de login
import CreateProcess from './views/CreateProcess'; // Importa a tela de criação de processo
import AdminDashboard from './views/AdminDashboard'; // Importa a tela de dashboard de administrador
import EditProfile from './views/EditProfile'; // Importa a tela de edição de perfil
import AdminEditProcess from './views/AdminEditProcess'; // Importa a tela de edição de processo
import UserProcesses from './views/UserProcesses'; // Importa a tela de processos do usuário
import EditProcess from './views/EditProcess';  // Importando EditProcess

const Stack = createStackNavigator(); // Cria uma pilha de navegação

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente principal do aplicativo
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function App() {

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a navegação do aplicativo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateProcess" component={CreateProcess} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AdminEditProcess" component={AdminEditProcess} />
        <Stack.Screen name="UserProcesses" component={UserProcesses} />
        <Stack.Screen name="EditProcess" component={EditProcess} /> {}
      </Stack.Navigator>
    </NavigationContainer>
  );
}