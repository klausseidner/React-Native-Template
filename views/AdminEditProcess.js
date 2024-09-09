////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para edição de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, TextInput, Button, Picker, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para edição de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AdminEditProcess({ route, navigation }) { // Exporta a função de visualização
  const { processId } = route.params; // Obtém o ID do processo
  const [process, setProcess] = useState({}); // Define o estado de processo
  const [title, setTitle] = useState(''); // Define o estado de título
  const [description, setDescription] = useState(''); // Define o estado de descrição
  const [status, setStatus] = useState(''); // Define o estado de status
  const [loading, setLoading] = useState(true); // Define o estado de carregamento
  const [error, setError] = useState(null); // Define o estado de erro

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Efeito colateral para buscar o processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchProcess(); // Chama a função para buscar o processo
  }, []);

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para buscar o processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetchProcess = async () => {
    try { // Tenta buscar o processo
      const response = await api.get(`/process/${processId}`); // Busca o processo
      const { title, description, status } = response.data; // Obtém o título, a descrição e o status
      setProcess(response.data); // Atualiza o estado de processo
      setTitle(title); // Atualiza o estado de título
      setDescription(description); // Atualiza o estado de descrição
      setStatus(status); // Atualiza o estado de status
    } catch (error) { // Se houver erro
      setError('Erro ao buscar o processo'); // Atualiza o estado de erro
    } finally { // Finalmente
      setLoading(false); // Atualiza o estado de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para atualizar o processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  const updateProcess = async () => {
    try { // Tenta atualizar o processo
      await api.put(`/process/${processId}`, { title, description, status }); // Atualiza o processo
      Alert.alert('Sucesso', 'Processo atualizado com sucesso'); // Mensagem de sucesso
      navigation.goBack(); // Retorna à tela anterior
    } catch (error) { // Se houver erro
      Alert.alert('Erro', 'Erro ao atualizar o processo'); // Mensagem de erro
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de edição de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}> {/* Estilização com Tailwind */}
      {loading ? ( // Se estiver carregando
        <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-10')} /> // Exibe o indicador de carregamento
      ) : error ? ( // Se houver erro
        <Text style={tailwind('text-red-500 text-center mt-4')}>{error}</Text> // Exibe a mensagem de erro
      ) : ( // Senão
        <>
          <Text style={tailwind('text-lg font-semibold mb-2')}>Título:</Text> {/* Título do campo */}
          <TextInput // Campo de texto para o título
            value={title} // Valor do campo
            onChangeText={setTitle} // Função para atualizar o campo
            style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilização com Tailwind
            placeholder="Digite o título" // Texto de orientação
          />
          <Text style={tailwind('text-lg font-semibold mb-2')}>Descrição:</Text> {/* Título do campo */}
          <TextInput // Campo de texto para a descrição
            value={description} // Valor do campo
            onChangeText={setDescription} // Função para atualizar o campo
            style={tailwind('border border-gray-300 p-2 mb-4 rounded h-24')} // Estilização com Tailwind
            placeholder="Digite a descrição" // Texto de orientação
            multiline // Permite múltiplas linhas
          />
          <Text style={tailwind('text-lg font-semibold mb-2')}>Status:</Text> {/* Título do campo */}
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
          <Button // Botão para atualizar o processo
            title="Atualizar Processo" // Título do botão
            onPress={updateProcess} // Função para atualizar o processo
            color="#4F8EF7" // Cor do botão
            style={tailwind('mt-4')} // Estilização com Tailwind
          />
        </>
      )}
    </View> // Fecha a visualização de edição de processo
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////