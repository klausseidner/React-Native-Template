////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para o dashboard do administrador
// /////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react e os hooks de estado e efeito
import { View, Text, Button, Picker, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API
const logger = require('./utils/logger'); // Importa o módulo logger

// Importações de componentes
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Menu from '../components/Menu'; // Importa o componente de menu
import Footer from '../components/Footer'; // Importa o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para o dashboard do administrador
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AdminDashboard() {
  const [processes, setProcesses] = useState([]); // Define o estado de processos
  const [status, setStatus] = useState('ativo'); // Define o estado de status
  const [loading, setLoading] = useState(true); // Define o estado de carregamento
  const [updating, setUpdating] = useState(false); // Indicador de atualização de status
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
      setProcesses(response.data); // Atualiza o estado de processos
    } catch (error) { // Se houver erro
      setError('Erro ao buscar os processos'); // Atualiza o estado de erro
    } finally { // Finalmente
      setLoading(false); // Atualiza o estado de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para atualizar o status
////////////////////////////////////////////////////////////////////////////////////////////////////
  const updateStatus = async (processId) => {
    setUpdating(true); // Ativa o indicador de atualização
    try { // Tenta atualizar o status
      await api.put(`/process/${processId}/status`, { status }); // Atualiza o status
      fetchProcesses(); // Busca os processos
      Alert.alert('Sucesso', 'Status atualizado com sucesso'); // Mensagem de sucesso
      logger.info('Status atualizado com sucesso'); // Exibe a mensagem de sucesso no console
    } catch (error) { // Se houver erro
      Alert.alert('Erro', 'Erro ao atualizar o status'); // Mensagem de erro
      logger.error(`Erro ao atualizar status: ${error.message}`, { stack: error.stack }); // Exibe o erro no console
    } finally { // Finalmente
      setUpdating(false); // Desativa o indicador de atualização
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface do dashboard do administrador
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}> {/* Estilização com Tailwind */}
      {/* Cabeçalho */}
      <Header />
      {loading ? ( // Se estiver carregando
        <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-10')} /> // Exibe o indicador de carregamento
      ) : error ? ( // Se houver erro
        <Text style={tailwind('text-red-500 text-center mt-4')}>{error}</Text> // Exibe a mensagem de erro
      ) : ( // Senão
        processes.map((process) => ( // Mapeia os processos
          <View key={process.id} style={tailwind('mb-4 p-4 bg-white rounded-lg shadow-md')}> {/* Estilização com Tailwind */}
            <Text style={tailwind('text-lg font-semibold mb-2')}>{process.title}</Text> {/* Título do processo */}
            <Text style={tailwind('text-gray-600 mb-4')}>Status atual: {process.status}</Text> {/* Status atual */}
            <Picker // Campo de seleção de status
              selectedValue={status} // Valor selecionado
              onValueChange={(itemValue) => setStatus(itemValue)} // Função para atualizar o campo
              style={tailwind('bg-gray-200 p-2 rounded')} // Estilização com Tailwind
            >
              <Picker.Item label="Ativo" value="ativo" /> {/* Opção de status */}
              <Picker.Item label="Em processo" value="em processo" /> {/* Opção de status */}
              <Picker.Item label="Concluído" value="concluído" /> {/* Opção de status */}
              <Picker.Item label="Repugnado" value="repugnado" /> {/* Opção de status */}
            </Picker> {/* Campo de seleção de status */}
            {updating ? ( // Se estiver atualizando
              <ActivityIndicator size="small" color="#4F8EF7" /> // Exibe o indicador de carregamento
            ) : ( // Senão
              <Button // Botão para atualizar o status
                title="Atualizar Status" // Título do botão
                onPress={() => updateStatus(process.id)} // Função para atualizar o status
                color="#4F8EF7" // Cor do botão
                style={tailwind('mt-4')} // Estilização com Tailwind
              /> // Botão para atualizar o status
            )}
          </View> // Fecha a visualização do processo
        ))
      )}
      {/* Menu */}
      <Menu />
      {/* Rodapé */}
      <Footer />
    </View> // Fecha a visualização do dashboard do administrador
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////