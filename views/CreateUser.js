////////////////////////////////////////////////////////////////////////////////////////////////////
// Pagina para criar um novo usuário
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'; // Importa o React e o useState
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Importa View, Text, TextInput, Button e StyleSheet
import { createUser } from ''; // Importa a função createUser do arquivo UserService

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
        <View style={styles.container}> {/* View com estilo container */}
            <Text style={styles.title}>Criar novo usuário</Text> {/* Texto com estilo title */}
            <TextInput // TextInput
                style={styles.input} // Estilo input
                placeholder='Nome' // Placeholder Nome
                onChangeText={setName} // Função para alterar o estado name
            />
            <TextInput // TextInput
                style={styles.input} // Estilo input
                placeholder='Email' // Placeholder Email
                onChangeText={setEmail} // Função para alterar o estado email
            />
            <TextInput // TextInput
                style={styles.input} // Estilo input
                placeholder='Senha' // Placeholder Senha
                onChangeText={setPassword} // Função para alterar o estado password
                secureTextEntry // Texto seguro
            />
            <Button // Botão
                title='Criar' // Título Criar
                onPress={handleCreateUser} // Função para criar um novo usuário
            />
        </View> // Fecha View
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////