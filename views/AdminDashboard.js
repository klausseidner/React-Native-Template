////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização do painel de administração
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, Button, Picker } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização do painel de administração
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AdminDashboard() { // Exporta a função de visualização
  const [processes, setProcesses] = useState([]); // Define o estado de processos
  const [status, setStatus] = useState('ativo'); // Define o estado de status

  useEffect(() => { // Define o efeito colateral
    fetchProcesses(); // Chama a função para buscar os processos
  }, []);

  // Função para buscar os processos
  const fetchProcesses = async () => { 
    const response = await api.get('/admin/processes'); // Busca os processos
    setProcesses(response.data); // Atualiza o estado de processos com os dados obtidos
  };

  // Função para atualizar o status de um processo
  const updateStatus = async (processId) => {
    try { // Tenta atualizar o status
      await api.put(`/process/${processId}/status`, { status }); // Atualiza o status do processo
      fetchProcesses();  // Atualiza a lista após mudar o status
    } catch (error) { // Se houver erro
      console.error('Erro ao atualizar o status', error); // Exibe o erro no console
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface do painel de administração
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4')}>
      {processes.map((process) => (
        <View key={process.id} style={tailwind('mb-4')}>
          <Text>{process.title}</Text>
          <Text>Status atual: {process.status}</Text>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Ativo" value="ativo" />
            <Picker.Item label="Em processo" value="em processo" />
            <Picker.Item label="Concluído" value="concluído" />
            <Picker.Item label="Repugnado" value="repugnado" />
          </Picker>
          <Button title="Atualizar Status" onPress={() => updateStatus(process.id)} />
        </View>
      ))}
    </View>
  );
}
