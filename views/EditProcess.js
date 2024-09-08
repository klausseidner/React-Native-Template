////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para edição de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text, Picker } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para edição de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function EditProcess({ route, navigation }) {
  const { processId } = route.params; // Obtém o ID do processo
  const [title, setTitle] = useState(''); // Define o estado de título
  const [description, setDescription] = useState(''); // Define o estado de descrição
  const [option, setOption] = useState('1'); // Define o estado de opção
  const [message, setMessage] = useState(''); // Define o estado de mensagem

  // Efeito colateral para buscar o processo
  useEffect(() => {
    fetchProcess(); // Chama a função para buscar o processo
  }, []);

  // Função para buscar o processo
  const fetchProcess = async () => {
    try { // Tenta buscar o processo
      const response = await api.get(`/process/${processId}`); // Busca o processo
      const { title, description, option } = response.data; // Obtém o título, a descrição e a opção
      setTitle(title); // Atualiza o estado de título
      setDescription(description); // Atualiza o estado de descrição
      setOption(option.toString()); // Atualiza o estado de opção
    } catch (error) { // Se houver erro
      setMessage('Erro ao carregar o processo.'); // Exibe uma mensagem de erro
      console.error('Erro ao carregar processo', error); // Exibe o erro no console
    }
  };

  // Função para atualizar o processo
  const updateProcess = async () => {
    try { // Tenta atualizar o processo
      await api.put(`/process/${processId}`, { title, description, option }); // Atualiza o processo
      setMessage('Processo atualizado com sucesso!'); // Exibe uma mensagem de sucesso
      navigation.goBack(); // Retorna à tela anterior
    } catch (error) { // Se houver erro
      setMessage('Erro ao atualizar o processo.'); // Exibe uma mensagem de erro
      console.error('Erro ao atualizar processo', error); // Exibe o erro no console
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Retorna a interface de edição de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4')}>
      <Text style={tailwind('text-lg font-bold mb-2')}>Título:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Atualize o título do processo"
        style={tailwind('border p-2 mb-4 rounded')}
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>Descrição:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Atualize a descrição"
        style={tailwind('border p-2 mb-4 rounded')}
        multiline
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>Opção:</Text>
      <Picker
        selectedValue={option}
        onValueChange={(itemValue) => setOption(itemValue)}
        style={tailwind('border p-2 mb-4 rounded')}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
      </Picker>

      {message ? <Text style={tailwind('text-red-500')}>{message}</Text> : null}

      <Button title="Atualizar Processo" onPress={updateProcess} />
    </View>
  );
}
