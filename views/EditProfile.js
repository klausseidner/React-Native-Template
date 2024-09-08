////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para edição de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para edição de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function EditProfile({ navigation }) {
  const [name, setName] = useState(''); // Define o estado de nome
  const [email, setEmail] = useState(''); // Define o estado de email
  const [rg, setRg] = useState(''); // RG será apenas exibido, não editável
  const [cpf, setCpf] = useState(''); // CPF será apenas exibido, não editável
  const [loading, setLoading] = useState(false); // Define o estado de carregamento
  const [message, setMessage] = useState(''); // Define o estado de mensagem

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Efeito colateral para buscar o perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchProfile(); // Chama a função para buscar o perfil
  }, []);

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para buscar o perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetchProfile = async () => {
    try { // Tenta buscar o perfil
      setLoading(true); // Ativa o indicador de carregamento
      const response = await api.get('/user/profile'); // Busca o perfil
      const { name, email, rg, cpf } = response.data; // Obtém o nome, o email, o RG e o CPF
      setName(name); // Atualiza o estado de nome
      setEmail(email); // Atualiza o estado de email
      setRg(rg); // Apenas exibido, não editável
      setCpf(cpf); // Apenas exibido, não editável
    } catch (error) { // Se houver erro
      console.error('Erro ao buscar o perfil', error); // Exibe o erro no console
    } finally { // Finaliza
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para atualizar o perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
  const updateProfile = async () => {
    try { // Tenta atualizar o perfil
      setLoading(true); // Ativa o indicador de carregamento
      await api.put('/user/profile', { name, email }); // Atualiza o perfil
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!'); // Mensagem de sucesso
      navigation.goBack(); // Volta à página anterior após salvar
    } catch (error) { // Se houver erro
      setMessage('Erro ao atualizar o perfil.'); // Exibe uma mensagem de erro
      console.error('Erro ao atualizar o perfil', error); // Exibe o erro no console
    } finally { // Finaliza
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de edição de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4 bg-gray-100')}> {/* Estilização com Tailwind */}
      {loading && <ActivityIndicator size="large" color="#4F8EF7" style={tailwind('mb-4')} />} {/* Indicador de carregamento */}
      
      <Text style={tailwind('text-lg font-bold mb-2')}>Nome:</Text> {/* Título do campo */}
      <TextInput // Campo de texto para o nome
        value={name} // Valor do campo
        onChangeText={setName} // Função para atualizar o campo
        placeholder="Digite seu nome" // Texto de orientação
        style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilização com Tailwind
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>Email:</Text> {/* Título do campo */}
      <TextInput // Campo de texto para o email
        value={email} // Valor do campo
        onChangeText={setEmail} // Função para atualizar o campo
        placeholder="Digite seu email" // Texto de orientação
        style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilização com Tailwind
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>RG:</Text> {/* Título do campo */}
      <TextInput // Campo de texto para o RG
        value={rg} // Valor do campo
        editable={false} // Não editável
        style={tailwind('border border-gray-300 p-2 mb-4 rounded bg-gray-200')} // Estilização com Tailwind
      />

      <Text style={tailwind('text-lg font-bold mb-2')}>CPF:</Text> {/* Título do campo */}
      <TextInput // Campo de texto para o CPF
        value={cpf} // Valor do campo
        editable={false} // Não editável
        style={tailwind('border border-gray-300 p-2 mb-4 rounded bg-gray-200')} // Estilização com Tailwind
      />

      {message ? <Text style={tailwind('text-red-500 mb-4 text-center')}>{message}</Text> : null} 
      {/* Exibe a mensagem de erro */}

      <Button // Botão para salvar as alterações
        title="Salvar Alterações" // Título do botão
        onPress={updateProfile} // Função para salvar as alterações
        color="#4F8EF7" // Cor do botão
        disabled={loading} // Desabilita o botão se estiver carregando
      />
    </View> // Indicador de carregamento
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////