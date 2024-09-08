////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, Button, FlatList } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function UserProcesses({ navigation }) {
  const [processes, setProcesses] = useState([]); // Define o estado de processos

  // Efeito colateral para buscar os processos
  useEffect(() => {
    fetchProcesses(); // Chama a função para buscar os processos
  }, []);

  // Função para buscar os processos
  const fetchProcesses = async () => {
    const response = await api.get('/user/processes'); // Busca os processos
    setProcesses(response.data); // Atualiza o estado de processos com os dados obtidos
  };

  // Função para editar um processo
  const editProcess = (processId) => {
    navigation.navigate('EditProcess', { processId }); // Navega para a tela de edição de processo
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4')}>
      <FlatList
        data={processes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tailwind('mb-4')}>
            <Text>Título: {item.title}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Editar Processo" onPress={() => editProcess(item.id)} />
          </View>
        )}
      />
    </View>
  );
}