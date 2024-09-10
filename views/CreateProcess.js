////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para criação de processos
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text, Picker, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API
const logger = require('./utils/logger'); // Importa o módulo logger

// Importações de componentes
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Menu from '../components/Menu'; // Importa o componente de menu
import Footer from '../components/Footer'; // Importa o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para criação de processos
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function CreateProcess({ navigation }) { // Exporta a função de visualização
  const [title, setTitle] = useState(''); // Define o estado de título
  const [description, setDescription] = useState(''); // Define o estado de descrição
  const [option, setOption] = useState('1'); // Define o estado de opção
  const [loading, setLoading] = useState(false); // Define o estado de carregamento
  const [message, setMessage] = useState(''); // Define o estado de mensagem

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para submeter o processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  const submitProcess = async () => {
    setLoading(true); // Ativa o indicador de carregamento
    try { // Tenta criar o processo
      await api.post('/process', { title, description, option }); // Cria o processo
      Alert.alert('Sucesso', 'Processo criado com sucesso!'); // Mensagem de sucesso
      logger.info('Processo criado com sucesso!'); // Exibe a mensagem de sucesso no console
      setTitle(''); // Limpa o campo de título
      setDescription(''); // Limpa o campo de descrição
      setOption('1'); // Reseta a opção
      navigation.navigate('UserProcesses'); // Navega para a tela de processos do usuário
    } catch (error) { // Se houver erro
      Alert.alert('Erro', 'Erro ao criar o processo.'); // Mensagem de erro
      logger.error(`Erro ao criar processo: ${error.message}`, { stack: error.stack }); // Exibe o erro no console
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de criação de processo
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}> {/* Estilização com Tailwind */}
      {/* Cabeçalho */}
      <Header />
      <Text style={tailwind('text-lg font-bold mb-2')}>Título:</Text> {/* Título do campo */}
      <TextInput // Campo de texto para o título
        value={title} // Valor do campo
        onChangeText={setTitle} // Função para atualizar o campo
        placeholder="Digite o título do processo" // Texto de orientação
        style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilização com Tailwind
      /> {/* Campo de texto para o título */}

      <Text style={tailwind('text-lg font-bold mb-2')}>Descrição:</Text> {/* Título do campo */}
      <TextInput // Campo de texto para a descrição
        value={description} // Valor do campo
        onChangeText={setDescription} // Função para atualizar o campo
        placeholder="Digite a descrição" // Texto de orientação
        style={tailwind('border border-gray-300 p-2 mb-4 rounded h-24')} // Estilização com Tailwind
        multiline // Permite múltiplas linhas
      /> {/* Campo de texto para a descrição */}

      <Text style={tailwind('text-lg font-bold mb-2')}>Opção:</Text> {/* Título do campo */}
      <Picker // Campo de seleção de opção
        selectedValue={option} // Valor selecionado
        onValueChange={(itemValue) => setOption(itemValue)} // Função para atualizar o campo
        style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilização com Tailwind
      >
        <Picker.Item label="1" value="1" /> {/* Opção 1 */}
        <Picker.Item label="2" value="2" /> {/* Opção 2 */}
        <Picker.Item label="3" value="3" /> {/* Opção 3 */}
        <Picker.Item label="4" value="4" /> {/* Opção 4 */}
        <Picker.Item label="5" value="5" /> {/* Opção 5 */}
        <Picker.Item label="6" value="6" /> {/* Opção 6 */}
      </Picker> {/* Campo de seleção de opção */}

      {message ? <Text style={tailwind('text-red-500 mb-4 text-center')}>{message}</Text> : null} 
      {/* Exibe a mensagem de erro */}

      <Button // Botão para submeter o processo
        title="Criar Processo" // Título do botão
        onPress={submitProcess} // Função para submeter o processo
        color="#4F8EF7" // Cor do botão
        disabled={loading} // Desabilita o botão se estiver carregando
      /> {/* Botão para submeter o processo */}
      
      {loading && <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mt-4')} />}
      {/* Menu */}
      <Menu />
      {/* Rodapé */}
      <Footer />
    </View> // Indicador de carregamento
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////