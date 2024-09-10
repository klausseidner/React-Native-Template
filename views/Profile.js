////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para o perfil
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Importa o módulo react
import { View, Text, Image, TouchableOpacity } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API
const logger = require('../utils/logger'); // Importa o módulo logger
import Header from './Header'; // Importa o componente de cabeçalho
import Menu from './Menu'; // Importa o componente de menu
import Footer from './Footer'; // Importa o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para o perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
const Profile = () => {
  // Dados do usuário (pode vir de um state ou ser carregado dinamicamente)
  const user = {
    name: 'João da Silva',
    email: 'joao.silva@example.com',
    avatar: 'https://example.com/avatar.png' // Link para a foto do perfil 96px x 96px (ou pode ser uma imagem local)
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Retorna a interface de perfil
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={tailwind('flex-1')}>
      {/* Cabeçalho */}
      <Header />
      {/* Menu */}
      <Menu />
      {/* Conteúdo do Perfil */}
      <View style={tailwind('p-6 items-center bg-gray-100 flex-1')}>
        {/* Avatar */}
        <Image 
          source={{ uri: user.avatar }} 
          style={tailwind('w-24 h-24 rounded-full mb-4')}
        />
        {/* Nome e Email */}
        <Text style={tailwind('text-2xl font-bold text-gray-800')}>{user.name}</Text>
        <Text style={tailwind('text-gray-600 mb-4')}>{user.email}</Text>
        {/* Botões de Ação */}
        <TouchableOpacity style={tailwind('bg-blue-500 p-3 rounded-lg mb-4 w-full')}>
          <Text style={tailwind('text-white text-center')}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind('bg-red-500 p-3 rounded-lg w-full')}>
          <Text style={tailwind('text-white text-center')}>Sair</Text>
        </TouchableOpacity>
      </View>
      {/* Rodapé */}
      <Footer />
    </View> // Fim da interface de perfil
  );
};

export default Profile; // Exporta o componente de perfil

////////////////////////////////////////////////////////////////////////////////////////////////////