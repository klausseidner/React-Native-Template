////////////////////////////////////////////////////////////////////////////////////////////////////
// Página de visualização para o dashboard do usuário
// /////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react'; // Importa o módulo react e os hooks de estado e efeito
import { View, Text, Button, Picker, ActivityIndicator, Alert } from 'react-native'; // Importa os componentes de interface
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import api from '../utils/api'; // Importa a instância da API
const logger = require('./utils/logger'); // Importa o módulo logger

// Importações de componentes
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Menu from '../components/Menu'; // Importa o componente de menu
import Footer from '../components/Footer'; // Importa o componente de rodapé

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de visualização para o dashboard do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Dashboard() {
  const [processes, setProcesses] = useState([]); // Define o estado de processos
  const [loading, setLoading] = useState(true); // Define o estado de carregamento
  const [error, setError] = useState(null); // Define o estado de erro

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Busca os processos do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchProcesses(); // Chama a função para buscar os processos
    }, []);

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Função para buscar os processos
////////////////////////////////////////////////////////////////////////////////////////////////////
    const fetchProcesses = async () => {
        try { // Tenta buscar os processos
            const response = await api.get('/user/processes'); // Busca os processos
            setProcesses(response.data); // Atualiza o estado de processos
            logger.info('Processos carregados com sucesso'); // Exibe a mensagem de sucesso no console
        } catch (error) { // Se houver erro
            setError('Erro ao buscar os processos'); // Atualiza o estado de erro
            logger.error(`Erro ao buscar processos: ${error.message}`, { stack: error.stack }); // Exibe o erro no console
        } finally { // Finalmente
            setLoading(false); // Atualiza o estado de carregamento
            logger.info('Fim da busca de processos'); // Exibe a mensagem de sucesso no console
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////
    // Retorna a interface do dashboard do usuário
////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <View style={tailwind('p-4 bg-gray-100 flex-1')}> {/* Estilização com Tailwind */}
            {/* Cabeçalho */}
            <Header />

            {/* Título */}
            <Text style={tailwind('text-lg font-bold text-gray-800 mb-2')}>Meus Processos</Text>

            {/* Lista de processos */}
            {loading ? ( // Se estiver carregando
                <ActivityIndicator size="large" color="#0000ff" /> // Exibe o indicador de carregamento
            ) : ( // Senão
                <FlatList // Exibe a lista de processos
                    data={processes} // Define os dados
                    keyExtractor={item => item.id.toString()} // Define a chave
                    renderItem={({ item }) => ( // Renderiza o item
                        <TouchableOpacity style={tailwind('bg-white p-4 rounded-lg mb-2')} onPress={() => editProcess(item.id)}> {/* Estilização com Tailwind */}
                            <Text style={tailwind('text-lg font-bold text-gray-800')}>{item.title}</Text> {/* Estilização com Tailwind */}
                            <Text style={tailwind('text-gray-600')}>{item.description}</Text> {/* Estilização com Tailwind */}
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Rodapé */}
            <Footer />
        </View>
    );
}

////////////////////////////////////////////////////////////////////////////////////////////////////