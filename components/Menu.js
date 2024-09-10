////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente Menu
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Importa o React e o useState
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'; // Importa elementos nativos do React Native
import tailwind from 'tailwind-rn'; // Importa Tailwind CSS para estilização
import { Ionicons } from 'react-native-vector-icons/Ionicons'; // Usando Ionicons como exemplo

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Menu
////////////////////////////////////////////////////////////////////////////////////////////////////
const Menu = () => {
  const [isSelectVisible, setSelectVisible] = useState(false); // Estado para visibilidade do select
  const options = ['Opção 1', 'Opção 2', 'Opção 3']; // Opções do select

  const toggleSelect = () => setSelectVisible(!isSelectVisible); // Função para alternar a visibilidade do select

  const renderOption = ({ item }) => ( // Renderização de cada opção
    <TouchableOpacity style={tailwind('p-2 border-b border-gray-200')}> {/* Estilo da opção */}
      <Text style={tailwind('text-lg')}>{item}</Text> {/* Texto da opção */}
    </TouchableOpacity> // Fim da opção
  );

  // Retorno do componente
  return (
    <View style={tailwind('p-4')}>
      {/* Botões Comuns */}
      <TouchableOpacity style={tailwind('bg-blue-500 p-3 rounded mb-4')}>
        <Text style={tailwind('text-white text-center')}>Botão 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tailwind('bg-green-500 p-3 rounded mb-4')}>
        <Text style={tailwind('text-white text-center')}>Botão 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tailwind('bg-red-500 p-3 rounded mb-4')}>
        <Text style={tailwind('text-white text-center')}>Botão 3</Text>
      </TouchableOpacity>

      {/* Texto com Ícone Acima */}
      <View style={tailwind('items-center mb-4')}>
        <Ionicons name="md-person-circle" size={40} color="black" />
        <Text style={tailwind('text-lg mt-2')}>Usuário</Text>
      </View>

      {/* Botão com 3 Pontinhos */}
      <TouchableOpacity
        onPress={toggleSelect}
        style={tailwind('bg-gray-300 p-3 rounded flex-row justify-center items-center')}
      >
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal para o Select */}
      <Modal visible={isSelectVisible} transparent={true} animationType="slide">
        <View style={tailwind('flex-1 justify-center items-center bg-gray-900 bg-opacity-50')}>
          <View style={tailwind('bg-white p-4 w-3/4 rounded-lg')}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              onPress={toggleSelect}
              style={tailwind('bg-red-500 p-2 rounded mt-4')}
            >
              <Text style={tailwind('text-white text-center')}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Menu; // Exporta o componente de Menu

////////////////////////////////////////////////////////////////////////////////////////////////////