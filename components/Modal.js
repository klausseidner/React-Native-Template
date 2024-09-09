////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Modal
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Importa o React
import { View, Text, Modal, TouchableOpacity } from 'react-native'; // Importa elementos nativos do React Native
import tailwind from 'tailwind-rn'; // Importa Tailwind CSS para estilização

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Modal
////////////////////////////////////////////////////////////////////////////////////////////////////
const CustomModal = ({ visible, onClose, children }) => ( // Componente de Modal
  <Modal transparent={true} visible={visible} animationType="slide"> {/* Modal */}
    <View style={tailwind('flex-1 justify-center items-center bg-gray-900 bg-opacity-50')}> {/* Estilo do modal */}
      <View style={tailwind('bg-white p-6 rounded-lg w-11/12')}> {/* Estilo do conteúdo */}
        <Text style={tailwind('text-lg mb-4 font-bold')}>Modal</Text> {/* Título do modal */}
        {children} {/* Conteúdo do modal */}
        <TouchableOpacity onPress={onClose} style={tailwind('bg-red-500 p-2 mt-4 rounded')}> {/* Botão de fechar */}
          <Text style={tailwind('text-white text-center')}>Close</Text> {/* Texto do botão */}
        </TouchableOpacity> {/* Fim do botão de fechar */}
      </View> {/* Fim do conteúdo */}
    </View> {/* Fim do modal */}
  </Modal> // Fim do modal
);

export default CustomModal; // Exporta o componente de modal

////////////////////////////////////////////////////////////////////////////////////////////////////