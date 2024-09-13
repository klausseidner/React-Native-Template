////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para o dashboard do administrador
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API
const logger = require('../utils/logger'); // Importa o módulo logger

// Importações de componentes
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Menu from '../components/Menu'; // Importa o componente de menu
import Footer from '../components/Footer'; // Importa o componente de rodapé
import { Picker } from '@react-native-picker/picker'; // Correção da importação

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para o dashboard do administrador
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AdminDashboard() {
  const [processes, setProcesses] = useState([]); // Define o estado de processos
  const [loading, setLoading] = useState(true); // Define o estado de carregamento
  const [updatingProcessId, setUpdatingProcessId] = useState(null); // Indicador de processo sendo atualizado
  const [error, setError] = useState(null); // Define o estado de erro

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
      const response = await api.get('/admin/processes'); // Busca os processos
      setProcesses(response.data); // Atualiza o estado de processos com os dados obtidos
      logger.info('AdminDashboard.js-> Processos carregados com sucesso'); // Registra a ação no log
    } catch (error) { // Em caso de erro
      setError('Erro ao buscar os processos'); // Atualiza o estado de erro
      logger.error(`AdminDashboard.js-> Erro ao buscar processos: ${error.message}`, { stack: error.stack }); // Exibe o erro no console
    } finally { // Após buscar os processos
      setLoading(false); // Desativa o indicador de carregamento
      logger.info('AdminDashboard.js-> Fim da busca de processos'); // Registra a ação no log
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para atualizar o status
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const updateStatus = async (processId, newStatus) => {
    setUpdatingProcessId(processId); // Ativa o indicador de atualização para o processo específico
    try { // Tenta atualizar o status
      await api.put(`/process/${processId}/status`, { status: newStatus }); // Atualiza o status  
      fetchProcesses(); // Atualiza os processos após a mudança
      Alert.alert('Sucesso', 'Status atualizado com sucesso'); // Mensagem de sucesso
      logger.info('AdminDashboard.js-> Status atualizado com sucesso'); // Registra a ação no log
    } catch (error) { // Em caso de erro
      Alert.alert('Erro', 'Erro ao atualizar o status'); // Mensagem de erro
      logger.error(`AdminDashboard.js-> Erro ao atualizar status: ${error.message}`, { stack: error.stack }); // Exibe o erro no console
    } finally { // Finaliza
      setUpdatingProcessId(null); // Desativa o indicador de atualização
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface do dashboard do administrador
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}>
      {/* Cabeçalho */}
      <Header />
      
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-10')} /> // Indicador de carregamento
      ) : error ? (
        <Text style={tailwind('text-red-500 text-center mt-4')}>{error}</Text> // Mensagem de erro
      ) : (
        processes.map((process) => {
          const [status, setStatus] = useState(process.status); // Estado de status por processo
          return (
            <View key={process.id} style={tailwind('mb-4 p-4 bg-white rounded-lg shadow-md')}>
              <Text style={tailwind('text-lg font-semibold mb-2')}>{process.title}</Text> {/* Título do processo */}
              <Text style={tailwind('text-gray-600 mb-4')}>Status atual: {status}</Text> {/* Status do processo */}
              
              <Picker // Seletor de status
                selectedValue={status} // Valor selecionado
                onValueChange={(itemValue) => setStatus(itemValue)} // Função para atualizar o campo
                style={tailwind('bg-gray-200 p-2 rounded')} // Estilização com Tailwind
              >
                <Picker.Item label="Ativo" value="ativo" /> {/* Opção de status */}
                <Picker.Item label="Em processo" value="em processo" /> {/* Opção de status */}
                <Picker.Item label="Concluído" value="concluído" /> {/* Opção de status */}
                <Picker.Item label="Repugnado" value="repugnado" /> {/* Opção de status */}
              </Picker>

              {updatingProcessId === process.id ? ( // Se estiver atualizando o processo
                <ActivityIndicator size="small" color="#4F8EF7" /> // Indicador de carregamento
              ) : (
                <TouchableOpacity // Botão para atualizar o status
                  onPress={() => updateStatus(process.id, status)} // Função para atualizar o status
                  style={tailwind('mt-4 bg-blue-500 p-2 rounded')} // Estilização com Tailwind
                >
                  <Text style={tailwind('text-white text-center')}>Atualizar Status</Text> {/* Texto do botão */}
                </TouchableOpacity>
              )}
            </View>
          );
        })
      )}
      
      {/* Menu */}
      <Menu />
      
      {/* Rodapé */}
      <Footer />
    </View>
  );
}
