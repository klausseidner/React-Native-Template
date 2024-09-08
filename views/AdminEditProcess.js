////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para edição de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, TextInput, Button, Picker } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para edição de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AdminEditProcess({ route, navigation }) { // Exporta a função de visualização
  const { processId } = route.params; // Obtém o ID do processo
  const [process, setProcess] = useState({}); // Define o estado de processo
  const [title, setTitle] = useState(''); // Define o estado de título
  const [description, setDescription] = useState(''); // Define o estado de descrição
  const [status, setStatus] = useState(''); // Define o estado de status

  // Efeito colateral para buscar o processo
  useEffect(() => {
    fetchProcess(); // Chama a função para buscar o processo
  }, []);

  // Função para buscar o processo
  const fetchProcess = async () => {
    const response = await api.get(`/process/${processId}`); // Busca o processo
    const { title, description, status } = response.data; // Obtém o título, a descrição e o status
    setProcess(response.data); // Atualiza o estado de processo
    setTitle(title); // Atualiza o estado de título
    setDescription(description); // Atualiza o estado de descrição
    setStatus(status); // Atualiza o estado de status
  };

  // Função para atualizar o processo
  const updateProcess = async () => {
    try { // Tenta atualizar o processo
      await api.put(`/process/${processId}`, { title, description, status }); // Atualiza o processo
      navigation.goBack(); // Retorna à tela anterior
    } catch (error) { // Se houver erro
      console.error('Erro ao atualizar o processo', error); // Exibe o erro no console
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de edição de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4')}>
      <Text>Título:</Text>
      <TextInput value={title} onChangeText={setTitle} style={tailwind('border p-2 mb-4 rounded')} />
      <Text>Descrição:</Text>
      <TextInput value={description} onChangeText={setDescription} style={tailwind('border p-2 mb-4 rounded')} multiline />
      <Text>Status:</Text>
      <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
        <Picker.Item label="Ativo" value="ativo" />
        <Picker.Item label="Em processo" value="em processo" />
        <Picker.Item label="Concluído" value="concluído" />
        <Picker.Item label="Repugnado" value="repugnado" />
      </Picker>
      <Button title="Atualizar Processo" onPress={updateProcess} />
    </View>
  );
}