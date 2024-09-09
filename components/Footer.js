////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Rodapé
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Importa o módulo React
import { View, Text, TouchableOpacity, Linking } from 'react-native'; // Importa os módulos de View, Text, TouchableOpacity e Linking do React Native
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind-rn
import { Ionicons } from '@expo/vector-icons'; // Usando Ionicons como exemplo

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função de Rodapé
////////////////////////////////////////////////////////////////////////////////////////////////////
const Footer = () => { // Função de Rodapé
  return ( // Retorna o seguinte conteúdo
    <View style={tailwind('bg-gray-800 p-4')}> {/* Estilo de fundo cinza escuro com padding de 4 */}
      {/* Links e Informações */} 
      <View style={tailwind('flex-row justify-around mb-4')}> {/* Estilo de linha flexível com espaçamento ao redor e margem inferior de 4 */}
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}> {/* Botão de toque que abre o link */}
          <Text style={tailwind('text-white text-lg')}>Sobre Nós</Text> {/* Texto branco com tamanho grande */}
        </TouchableOpacity> {/* Fim do botão de toque */}
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}> {/* Botão de toque que abre o link */}
          <Text style={tailwind('text-white text-lg')}>Política de Privacidade</Text> {/* Texto branco com tamanho grande */}
        </TouchableOpacity> {/* Fim do botão de toque */}
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com')}> {/* Botão de toque que abre o link */}
          <Text style={tailwind('text-white text-lg')}>Contato</Text> {/* Texto branco com tamanho grande */}
        </TouchableOpacity> {/* Fim do botão de toque */}
      </View> {/* Fim do estilo de linha flexível */}

      {/* Ícones de Redes Sociais */}
      <View style={tailwind('flex-row justify-center')}> {/* Estilo de linha flexível com justificação central */}
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}> {/* Botão de toque que abre o link */}
          <Ionicons name="logo-facebook" size={24} color="white" style={tailwind('mx-2')} /> {/* Ícone de Facebook */}
        </TouchableOpacity> {/* Fim do botão de toque */}
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}> {/* Botão de toque que abre o link */}
          <Ionicons name="logo-twitter" size={24} color="white" style={tailwind('mx-2')} /> {/* Ícone de Twitter */}
        </TouchableOpacity> {/* Fim do botão de toque */}
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}> {/* Botão de toque que abre o link */}
          <Ionicons name="logo-instagram" size={24} color="white" style={tailwind('mx-2')} /> {/* Ícone de Instagram */}
        </TouchableOpacity> {/* Fim do botão de toque */}
      </View> {/* Fim do estilo de linha flexível */}

      {/* Direitos Autorais */}
      <View style={tailwind('mt-4')}> {/* Estilo de margem superior de 4 */}
        <Text style={tailwind('text-white text-center text-sm')}> {/* Texto branco, centralizado e de tamanho pequeno */}
          © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados. {/* Texto de direitos autorais */}
        </Text> {/* Fim do texto */}
      </View> {/* Fim do estilo de margem superior */}
    </View> // Fim da visualização
  );
};

export default Footer; // Exporta o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////