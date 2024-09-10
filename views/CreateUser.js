////////////////////////////////////////////////////////////////////////////////////////////////////
// Pagina para criar um novo usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Importa o React e o useState
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Importa View, Text, TextInput, Button e StyleSheet
import api from '../utils/api'; // Importa a instância da API
const logger = require('../utils/logger'); // Importa o módulo logger

// Importações de componentes
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Menu from '../components/Menu'; // Importa o componente de menu
import Footer from '../components/Footer'; // Importa o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////
// Função CreateUser
////////////////////////////////////////////////////////////////////////////////////////////////////
const CreateUser = ({ navigation }) => { // Função CreateUser que recebe a navegação como parâmetro
    // Estados
    const [name, setName] = useState(''); // Estado name
    const [email, setEmail] = useState(''); // Estado email
    const [password, setPassword] = useState(''); // Estado password

    // Função para criar um novo usuário
    const handleCreateUser = async () => { // Função handleCreateUser
        const user = { name, email, password }; // Cria um objeto user com os estados name, email e password
        await createUser(user); // Chama a função createUser passando o objeto user
        navigation.navigate('Home'); // Navega para a tela Home
    }

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Retorno
////////////////////////////////////////////////////////////////////////////////////////////////////
    return ( // Retorna
        <View style={tailwind('p-4 bg-gray-100')}> {/* Estilização com Tailwind */}
            {/* Cabeçalho */}
             <Header />
            <Text style={tailwind('text-lg font-bold mb-2')}>Nome:</Text> {/* Título do campo */}
            <TextInput // TextInput
                style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilo input
                placeholder='Nome' // Placeholder Nome
                onChangeText={setName} // Função para alterar o estado name
            />
            <TextInput // TextInput
                style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilo input
                placeholder='Email' // Placeholder Email
                onChangeText={setEmail} // Função para alterar o estado email
            />
            <TextInput // TextInput
                style={tailwind('border border-gray-300 p-2 mb-4 rounded')} // Estilo input
                placeholder='Senha' // Placeholder Senha
                onChangeText={setPassword} // Função para alterar o estado password
                secureTextEntry // Texto seguro
            />
            <Button // Botão
                title='Criar' // Título Criar
                onPress={handleCreateUser} // Função para criar um novo usuário
            />
            {/* Menu */}
            <Menu />
            {/* Rodapé */}
            <Footer />
        </View> // Fecha View
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////