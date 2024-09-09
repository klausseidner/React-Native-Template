////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de gráfico de linha para exibir dados de forma visual
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Importa o React
import { LineChart } from 'react-native-chart-kit'; // Importa o gráfico de linha
import { View, Dimensions } from 'react-native'; // Importa elementos nativos do React Native
import tailwind from 'tailwind-rn'; // Importa Tailwind CSS para estilização

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Gráficos
////////////////////////////////////////////////////////////////////////////////////////////////////
const Charts = () => { // Componente de Gráficos
  const screenWidth = Dimensions.get("window").width; // Largura da tela

  return ( // Retorno do componente
    <View style={tailwind('mt-6')}> {/* Estilo do componente */}
      <LineChart // Gráfico de linha
        data={{ // Dados
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Rótulos
          datasets: [ // Conjunto de dados
            {
              data: [20, 45, 28, 80, 99, 43], // Dados
            },
          ],
        }}
        width={screenWidth - 40} // Ajustando para largura da tela
        height={220} // Altura
        yAxisLabel="$" // Rótulo do eixo Y
        chartConfig={{ // Configuração do gráfico
          backgroundColor: "#e26a00", // Cor de fundo
          backgroundGradientFrom: "#fb8c00", // Gradiente de fundo
          backgroundGradientTo: "#ffa726", // Gradiente de fundo
          decimalPlaces: 2, // Casas decimais
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor
        }}
        style={tailwind('border rounded-lg')} // Estilo
      />
    </View> // Fim do componente
  );
};

export default Charts; // Exporta o componente de gráficos

////////////////////////////////////////////////////////////////////////////////////////////////////