////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para edição de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////

// Importações
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, TextInput, Button, Text } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../middleware/api'; // Importa a instância da API

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para edição de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function EditProfile({ navigation }) {
  const [name, setName] = useState(''); // Define o estado de nome
  const [email, setEmail] = useState(''); // Define o estado de email
  const [rg, setRg] = useState('');  // RG será apenas exibido, não editável
  const [cpf, setCpf] = useState(''); // CPF será apenas exibido, não editável
  const [message, setMessage] = useState(''); // Define o estado de mensagem

  // Efeito colateral para buscar o perfil
  useEffect(() => {
    fetchProfile(); // Chama a função para buscar o perfil
  }, []);

  // Função para buscar o perfil
  const fetchProfile = async () => {
    try { // Tenta buscar o perfil
      const response = await api.get('/user/profile'); // Busca o perfil
      const { name, email, rg, cpf } = response.data; // Obtém o nome, o email, o RG e o CPF
      setName(name); // Atualiza o estado de nome
      setEmail(email); // Atualiza o estado de email
      setRg(rg); // Apenas exibido, não editável
      setCpf(cpf); // Apenas exibido, não editável
    } catch (error) { // Se houver erro
      console.error('Erro ao buscar o perfil', error); // Exibe o erro no console
    }
  };

  // Função para atualizar o perfil
  const updateProfile = async () => {
    try { // Tenta atualizar o perfil
      await api.put('/user/profile', { name, email }); // Atualiza o perfil
      setMessage('Perfil atualizado com sucesso!'); // Exibe uma mensagem de sucesso
      navigation.goBack();  // Volta à página anterior após salvar
    } catch (error) { // Se houver erro
      setMessage('Erro ao atualizar o perfil.'); // Exibe uma mensagem de erro
      console.error('Erro ao atualizar o perfil', error); // Exibe o erro no console
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Retorna a interface de edição de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('p-4')}>
      <Text>Nome:</Text>
      <TextInput value={name} onChangeText={setName} style={tailwind('border p-2 mb-4 rounded')} />

      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={tailwind('border p-2 mb-4 rounded')} />

      <Text>RG:</Text>
      <TextInput value={rg} editable={false} style={tailwind('border p-2 mb-4 rounded')} />

      <Text>CPF:</Text>
      <TextInput value={cpf} editable={false} style={tailwind('border p-2 mb-4 rounded')} />

      {message ? <Text>{message}</Text> : null}

      <Button title="Salvar Alterações" onPress={updateProfile} />
    </View>
  );
}