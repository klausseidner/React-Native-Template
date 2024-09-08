////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para criação de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text, Picker, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para criação de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CreateProcess({ navigation }) { // Exporta a função de visualização
  const [title, setTitle] = useState(''); // Define o estado de título
  const [description, setDescription] = useState(''); // Define o estado de descrição
  const [option, setOption] = useState('1'); // Define o estado de opção
  const [loading, setLoading] = useState(false); // Define o estado de carregamento
  const [message, setMessage] = useState(''); // Define o estado de mensagem

  // Função para submeter o processo
  const submitProcess = async () => {
    setLoading(true); // Ativa o indicador de carregamento
    try { // Tenta criar o processo
      await api.post('/process', { title, description, option }); // Cria o processo
      Alert.alert('Sucesso', 'Processo criado com sucesso!'); // Mensagem de sucesso
      setTitle(''); // Limpa o campo de título
      setDescription(''); // Limpa o campo de descrição
      setOption('1'); // Reseta a opção
      navigation.navigate('UserProcesses'); // Navega para a tela de processos do usuário
    } catch (error) { // Se houver erro
      Alert.alert('Erro', 'Erro ao criar o processo.'); // Mensagem de erro
      console.error('Erro ao criar processo', error); // Exibe o erro no console
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Retorna a interface de criação de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}>
      <Text style={tailwind('text-lg font-bold mb-2')}>Título:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do processo"
        style={tailwind('border border-gray-300 p-2 mb-4 rounded')}
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>Descrição:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
        style={tailwind('border border-gray-300 p-2 mb-4 rounded h-24')}
        multiline
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>Opção:</Text>
      <Picker
        selectedValue={option}
        onValueChange={(itemValue) => setOption(itemValue)}
        style={tailwind('border border-gray-300 p-2 mb-4 rounded')}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
      </Picker>

      {message ? <Text style={tailwind('text-red-500 mb-4 text-center')}>{message}</Text> : null}

      <Button
        title="Criar Processo"
        onPress={submitProcess}
        color="#4F8EF7"
        disabled={loading}
      />
      
      {loading && <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-4')} />}
    </View>
  );
}