////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function UserProcesses({ navigation }) {
  const [processes, setProcesses] = useState([]); // Define o estado de processos
  const [loading, setLoading] = useState(true); // Define o estado de carregamento

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Efeito colateral para buscar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchProcesses(); // Chama a função para buscar os processos
  }, []);

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para buscar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetchProcesses = async () => {
    try { // Tenta buscar os processos
      const response = await api.get('/user/processes'); // Busca os processos
      setProcesses(response.data); // Atualiza o estado de processos com os dados obtidos
    } catch (error) { // Em caso de erro
      console.error('Erro ao buscar processos', error); // Exibe o erro no console
    } finally { // Após buscar os processos
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para editar um processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  const editProcess = (processId) => {
    navigation.navigate('EditProcess', { processId }); // Navega para a tela de edição de processo
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100 flex-1')}> {/* Estilização com Tailwind */}
      {loading ? ( // Se estiver carregando
        <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-4')} /> // Exibe o indicador de carregamento
      ) : ( // Senão
        <>
          {processes.length === 0 ? ( // Se não houver processos
            <Text style={tailwind('text-center text-gray-500 mt-4')}>Nenhum processo encontrado.</Text> // Exibe a mensagem de nenhum processo
          ) : ( // Senão
            <FlatList // Lista de processos
              data={processes} // Dados da lista
              keyExtractor={(item) => item.id.toString()} // Função para extrair a chave de cada item
              renderItem={({ item }) => ( // Função para renderizar cada item
                <View style={tailwind('bg-white border border-gray-300 p-4 mb-4 rounded shadow')}> {/* Estilização com Tailwind */}
                  <Text style={tailwind('text-lg font-semibold mb-1')}>Título: {item.title}</Text> {/* Título do processo */}
                  <Text style={tailwind('text-gray-700 mb-2')}>Descrição: {item.description}</Text> {/* Descrição do processo */}
                  <Text style={tailwind('text-gray-600 mb-4')}>Status: {item.status}</Text> {/* Status do processo */}
                  <TouchableOpacity // Botão para editar o processo
                    onPress={() => editProcess(item.id)} // Função para editar o processo
                    style={tailwind('bg-blue-500 p-2 rounded')} // Estilização com Tailwind
                  >
                    <Text style={tailwind('text-white text-center font-semibold')}>Editar Processo</Text> {/* Texto do botão */}
                  </TouchableOpacity> {/* Botão para editar o processo */}
                </View> // Exibe o processo
              )}
            />
          )}
        </>
      )}
    </View> // Exibe a interface de processos do usuário
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////