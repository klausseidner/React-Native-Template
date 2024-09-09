////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente para Formulários
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Importa o React e o useState
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'; // Importa elementos nativos do React Native
import tailwind from 'tailwind-rn'; // Importa Tailwind CSS para estilização

////////////////////////////////////////////////////////////////////////////////////////////////////
// O componente Forms aceita um array de objetos fields que define os campos do formulário
////////////////////////////////////////////////////////////////////////////////////////////////////
const Forms = ({ fields, onSubmit }) => { // Recebe os campos e a função de envio como props
  const [formData, setFormData] = useState({}); // Estado para os dados do formulário

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função para atualizar o estado do formulário
////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleChange = (value, name) => { // Recebe o valor e o nome do campo
    setFormData({ // Atualiza o estado do formulário
      ...formData, // Mantém os dados atuais
      [name]: value, // Atualiza o campo com o novo valor
    });
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Função de envio
////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = () => {
    onSubmit(formData); // Chama a função onSubmit com os dados do formulário
  };

  // Renderiza os campos dinamicamente com base nos dados passados
  return ( // Retorna o formulário
    <ScrollView contentContainerStyle={tailwind('p-4')}> {/* Adiciona um ScrollView ao formulário */}
      {fields.map((field, index) => ( // Mapeia os campos
        <View key={index} style={tailwind('mb-4')}> {/* Adiciona um View para cada campo */}
          <Text style={tailwind('text-lg font-bold mb-2')}>{field.label}</Text> {/* Adiciona um Texto com o rótulo do campo */}
          <TextInput // Adiciona um TextInput para o campo
            style={tailwind('border p-3 rounded-lg')} // Estilo do TextInput
            placeholder={field.placeholder} // Adiciona um placeholder ao TextInput
            value={formData[field.name] || ''} // Adiciona o valor do campo ao TextInput
            onChangeText={(value) => handleChange(value, field.name)} // Adiciona a função de alteração ao TextInput
            keyboardType={field.keyboardType || 'default'} // Adiciona o tipo de teclado ao TextInput
            secureTextEntry={field.secureTextEntry || false} // Adiciona a entrada segura ao TextInput
            multiline={field.multiline || false} // Adiciona a opção de várias linhas ao TextInput
          />
        </View> // Fim do campo
      ))}
      
      <TouchableOpacity // Adiciona um TouchableOpacity para o botão de envio
        onPress={handleSubmit} // Adiciona a função de envio ao TouchableOpacity
        style={tailwind('bg-blue-500 p-3 rounded-lg')} // Estilo do TouchableOpacity
      >
        <Text style={tailwind('text-white text-center font-bold')}>Enviar</Text> {/* Texto do botão */}
      </TouchableOpacity> // Fim do botão
    </ScrollView> // Fim do ScrollView
  );
};

export default Forms; // Exporta o componente Forms

////////////////////////////////////////////////////////////////////////////////////////////////////
// Exemplo de uso do componente Forms
////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import React from 'react';
import { View, Alert } from 'react-native';
import Forms from './Forms';

const ExampleForm = () => {
  const formFields = [
    { name: 'name', label: 'Nome', placeholder: 'Digite seu nome', keyboardType: 'default' },
    { name: 'email', label: 'Email', placeholder: 'Digite seu email', keyboardType: 'email-address' },
    { name: 'password', label: 'Senha', placeholder: 'Digite sua senha', secureTextEntry: true },
    { name: 'bio', label: 'Biografia', placeholder: 'Digite sua biografia', multiline: true },
  ];

  const handleFormSubmit = (data) => {
    Alert.alert('Dados do Formulário', JSON.stringify(data));
  };

  return (
    <View style={{ flex: 1 }}>
      <Forms fields={formFields} onSubmit={handleFormSubmit} />
    </View>
  );
};

export default ExampleForm;
*/
