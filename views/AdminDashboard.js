// Importações
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, Button, Picker, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização do painel de administração
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AdminDashboard() { // Exporta a função de visualização
  const [processes, setProcesses] = useState([]); // Define o estado de processos
  const [status, setStatus] = useState('ativo'); // Define o estado de status
  const [loading, setLoading] = useState(true); // Define o estado de carregamento
  const [error, setError] = useState(null); // Define o estado de erro

  useEffect(() => { // Define o efeito colateral
    fetchProcesses(); // Chama a função para buscar os processos
  }, []);

  // Função para buscar os processos
  const fetchProcesses = async () => { 
    try {
      const response = await api.get('/admin/processes'); // Busca os processos
      setProcesses(response.data); // Atualiza o estado de processos com os dados obtidos
    } catch (error) {
      setError('Erro ao buscar os processos'); // Atualiza o estado de erro
    } finally {
      setLoading(false); // Atualiza o estado de carregamento
    }
  };

  // Função para atualizar o status de um processo
  const updateStatus = async (processId) => {
    try { // Tenta atualizar o status
      await api.put(`/process/${processId}/status`, { status }); // Atualiza o status do processo
      fetchProcesses();  // Atualiza a lista após mudar o status
      Alert.alert('Sucesso', 'Status atualizado com sucesso'); // Mensagem de sucesso
    } catch (error) { // Se houver erro
      Alert.alert('Erro', 'Erro ao atualizar o status'); // Mensagem de erro
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Retorna a interface do painel de administração
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}>
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-10')} />
      ) : error ? (
        <Text style={tailwind('text-red-500 text-center mt-4')}>{error}</Text>
      ) : (
        processes.map((process) => (
          <View key={process.id} style={tailwind('mb-4 p-4 bg-white rounded-lg shadow-md')}>
            <Text style={tailwind('text-lg font-semibold mb-2')}>{process.title}</Text>
            <Text style={tailwind('text-gray-600 mb-4')}>Status atual: {process.status}</Text>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={tailwind('bg-gray-200 p-2 rounded')}
            >
              <Picker.Item label="Ativo" value="ativo" />
              <Picker.Item label="Em processo" value="em processo" />
              <Picker.Item label="Concluído" value="concluído" />
              <Picker.Item label="Repugnado" value="repugnado" />
            </Picker>
            <Button
              title="Atualizar Status"
              onPress={() => updateStatus(process.id)}
              color="#4F8EF7"
              style={tailwind('mt-4')}
            />
          </View>
        ))
      )}
    </View>
  );
}