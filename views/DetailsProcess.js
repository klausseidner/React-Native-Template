////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para processo
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API
const logger = require('./utils/logger'); // Importa o módulo logger

// Importações de componentes
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Menu from '../components/Menu'; // Importa o componente de menu
import Footer from '../components/Footer'; // Importa o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para processo
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function DetailsProcess({ route, navigation }) { // Exporta a função de visualização
  const { processId } = route.params; // Obtém o ID do processo
  const [process, setProcess] = useState({}); // Define o estado de processo
  const [loading, setLoading] = useState(true); // Define o estado de carregamento
  const [error, setError] = useState(null); // Define o estado de erro

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Efeito colateral para buscar o processo
////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchProcess(); // Chama a função para buscar o processo
    }, []);

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Função para buscar o processo
////////////////////////////////////////////////////////////////////////////////////////////////////
    const fetchProcess = async () => {
        try { // Tenta buscar o processo
            const response = await api.get(`/process/${processId}`); // Busca o processo
            setProcess(response.data); // Atualiza o estado de processo
        } catch (error) { // Se houver erro
            setError('Erro ao buscar o processo'); // Atualiza o estado de erro
        } finally { // Finalmente
            setLoading(false); // Atualiza o estado de carregamento
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Renderiza o componente
////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <View style={tailwind('h-full bg-white')}>
            <Header /> {/* Renderiza o cabeçalho */}
            <Menu /> {/* Renderiza o menu */}
            <View style={tailwind('p-4')}>
                <Text style={tailwind('text-lg font-bold text-gray-700')}>Detalhes do Processo</Text>
                {loading ? ( // Se estiver carregando
                    <ActivityIndicator size="large" color="#0000ff" /> // Renderiza o indicador de carregamento
                ) : error ? ( // Se houver erro
                    <Text>{error}</Text> // Renderiza a mensagem de erro
                ) : ( // Senão
                    <View>
                        <Text style={tailwind('text-lg font-bold text-gray-700')}>{process.title}</Text>
                        <Text style={tailwind('text-gray-600')}>{process.description}</Text>
                        <Text style={tailwind('text-gray-600')}>Status: {process.status}</Text>
                        <Text style={tailwind('text-gray-600')}>Criado em: {process.createdAt}</Text>
                    </View>
                )}
            </View>
            <Footer /> {/* Renderiza o rodapé */}
        </View>
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////