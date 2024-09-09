////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Tabela
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Importa o React
import { View, Text } from 'react-native'; // Importa elementos nativos do React Native
import tailwind from 'tailwind-rn'; // Importa Tailwind CSS para estilização

////////////////////////////////////////////////////////////////////////////////////////////////////
// Componente de Tabela
////////////////////////////////////////////////////////////////////////////////////////////////////
const Table = ({ headers, data }) => ( // Componente de Tabela
  <View style={tailwind('border border-gray-200')}> {/* Estilo da tabela */}
    {/* Cabeçalho da Tabela */} 
    <View style={tailwind('flex-row bg-gray-200')}>
      {headers.map((header, index) => ( // Mapeia os cabeçalhos
        <Text key={index} style={tailwind('p-2 font-bold flex-1 text-center')}> {/* Estilo do cabeçalho */}
          {header} {/* Texto do cabeçalho */}
        </Text> // Fim do cabeçalho
      ))}
    </View> {/* Fim do cabeçalho */}
    {/* Corpo da Tabela */}
    {data.map((row, rowIndex) => ( // Mapeia as linhas
      <View key={rowIndex} style={tailwind('flex-row')}> {/* Estilo da linha */}
        {row.map((cell, cellIndex) => ( // Mapeia as células
          <Text key={cellIndex} style={tailwind('p-2 flex-1 text-center')}> {/* Estilo da célula */}
            {cell} {/* Texto da célula */}
          </Text> // Fim da célula
        ))}
      </View> // Fim da linha
    ))}
  </View> // Fim da tabela
);

export default Table; // Exporta o componente de tabela

////////////////////////////////////////////////////////////////////////////////////////////////////