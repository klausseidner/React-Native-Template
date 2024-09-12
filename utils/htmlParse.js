////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilitário para interpretar HTML e renderizar componentes React Native
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Importações
////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'; // Importa o módulo react
import { 
  View, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  Picker, 
  Image, 
  ScrollView, 
  Linking, 
  TextInput, 
  Button, 
  Switch, 
  Slider, 
  Modal, 
  FlatList, 
  SectionList, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  ImageBackground, 
  Pressable 
} from 'react-native'; // Importa os componentes de interface do React Native
import tailwind from 'tailwind-rn'; // Importa o módulo tailwind
import htmlparser2 from 'htmlparser2'; // Importa o módulo htmlparser2

////////////////////////////////////////////////////////////////////////////////////////////////////
// Mapeamento das tags HTML para componentes React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
const tagMap = {
  div: View, // Mapeia a tag div para o componente View
  p: Text, // Mapeia a tag p para o componente Text
  span: Text, // Mapeia a tag span para o componente Text
  h1: (props) => <Text style={tailwind('text-2xl font-bold')}>{props.children}</Text>, // Mapeia a tag h1 para o componente Text com estilo
  h2: (props) => <Text style={tailwind('text-xl font-bold')}>{props.children}</Text>, // Mapeia a tag h2 para o componente Text com estilo
  h3: (props) => <Text style={tailwind('text-lg font-bold')}>{props.children}</Text>, // Mapeia a tag h3 para o componente Text com estilo
  h4: (props) => <Text style={tailwind('text-base font-bold')}>{props.children}</Text>, // Mapeia a tag h4 para o componente Text com estilo
  h5: (props) => <Text style={tailwind('text-sm font-bold')}>{props.children}</Text>, // Mapeia a tag h5 para o componente Text com estilo
  h6: (props) => <Text style={tailwind('text-xs font-bold')}>{props.children}</Text>, // Mapeia a tag h6 para o componente Text com estilo
  ul: (props) => <View style={tailwind('list-disc ml-4')}>{props.children}</View>, // Mapeia a tag ul para o componente View com estilo
  ol: (props) => <View style={tailwind('list-decimal ml-4')}>{props.children}</View>, // Mapeia a tag ol para o componente View com estilo
  li: (props) => <Text style={tailwind('mb-1')}>{props.children}</Text>, // Mapeia a tag li para o componente Text com estilo
  table: (props) => <View style={tailwind('w-full')}>{props.children}</View>, // Mapeia a tag table para o componente View com estilo
  tr: (props) => <View style={tailwind('flex-row')}>{props.children}</View>, // Mapeia a tag tr para o componente View com estilo
  td: (props) => <View style={tailwind('flex-1 p-2')}>{props.children}</View>, // Mapeia a tag td para o componente View com estilo
  th: (props) => <Text style={tailwind('font-bold p-2')}>{props.children}</Text>, // Mapeia a tag th para o componente Text com estilo
  img: (props) => <Image source={{ uri: props.src }} style={tailwind('w-full h-auto')} />, // Mapeia a tag img para o componente Image com estilo
  a: (props) => (
    <Text
      style={tailwind('text-blue-500')}
      onPress={() => Linking.openURL(props.href)}
    >
      {props.children}
    </Text>
  ), // Mapeia a tag a para o componente Text com estilo
  button: (props) => (
    <TouchableOpacity
      onPress={props.onClick}
      style={tailwind(props.className || 'bg-blue-500 p-2 rounded')}
    >
      <Text style={tailwind('text-white text-center')}>{props.children}</Text>
    </TouchableOpacity>
  ), // Mapeia a tag button para o componente TouchableOpacity com estilo
  select: (props) => (
    <Picker
      selectedValue={props.value}
      onValueChange={props.onChange}
      style={tailwind(props.className || 'bg-gray-200 p-2 rounded')}
    >
      {props.children}
    </Picker>
  ), // Mapeia a tag select para o componente Picker com estilo
  option: (props) => (
    <Picker.Item
      label={props.label}
      value={props.value}
    />
  ), // Mapeia a tag option para o componente Picker.Item
  input: (props) => (
    <TextInput
      {...props}
      style={tailwind(props.className || 'border p-2')}
    />
  ), // Mapeia a tag input para o componente TextInput com estilo
  textarea: (props) => (
    <TextInput
      {...props}
      multiline
      style={tailwind(props.className || 'border p-2')}
    />
  ), // Mapeia a tag textarea para o componente TextInput com estilo
  form: View, // Mapeia a tag form para o componente View
  label: (props) => <Text style={tailwind('font-bold')}>{props.children}</Text>, // Mapeia a tag label para o componente Text com estilo
  fieldset: View, // Mapeia a tag fieldset para o componente View
  legend: (props) => <Text style={tailwind('font-bold')}>{props.children}</Text>, // Mapeia a tag legend para o componente Text com estilo
  br: () => <Text>{'\n'}</Text>, // Mapeia a tag br para uma quebra de linha
  hr: () => <View style={tailwind('border-t border-gray-300')} />, // Mapeia a tag hr para o componente View com estilo 
  strong: (props) => <Text style={tailwind('font-bold')}>{props.children}</Text>, // Mapeia a tag strong para o componente Text com estilo
  em: (props) => <Text style={tailwind('italic')}>{props.children}</Text>, // Mapeia a tag em para o componente Text com estilo
  del: (props) => <Text style={tailwind('line-through')}>{props.children}</Text>, // Mapeia a tag del para o componente Text com estilo
  small: (props) => <Text style={tailwind('text-xs')}>{props.children}</Text>, // Mapeia a tag small para o componente Text com estilo
  code: (props) => <Text style={tailwind('bg-gray-200 p-1')}>{props.children}</Text>, // Mapeia a tag code para o componente Text com estilo
  pre: (props) => <ScrollView style={tailwind('bg-gray-100 p-2')}><Text>{props.children}</Text></ScrollView>, // Mapeia a tag pre para o componente ScrollView com estilo
  iframe: (props) => (
    <View style={tailwind('w-full h-60')}>
      <Text>{`<iframe src="${props.src}" />`}</Text>
    </View>
  ), // Mapeia a tag iframe para o componente View com estilo
  audio: (props) => (
    <View style={tailwind('w-full')}>
      <Text>{`<audio src="${props.src}" controls />`}</Text>
    </View>
  ), // Mapeia a tag audio para o componente View com estilo
  video: (props) => (
    <View style={tailwind('w-full')}>
      <Text>{`<video src="${props.src}" controls />`}</Text>
    </View>
  ), // Mapeia a tag video para o componente View com estilo
  switch: (props) => (
    <Switch
      value={props.checked}
      onValueChange={props.onChange}
      style={tailwind(props.className || '')}
    />
  ), // Mapeia a tag switch para o componente Switch com estilo
  touchablehighlight: (props) => (
    <TouchableHighlight
      onPress={props.onClick}
      style={tailwind(props.className || 'bg-blue-500 p-2 rounded')}
    >
      <Text style={tailwind('text-white text-center')}>{props.children}</Text>
    </TouchableHighlight>
  ), // Mapeia a tag touchablehighlight para o componente TouchableHighlight com estilo
  activityindicator: (props) => <ActivityIndicator size={props.size || 'small'} color={props.color || '#000'} />, // Mapeia a tag activityindicator para o componente ActivityIndicator
  button: (props) => (
    <Button
      title={props.title}
      onPress={props.onClick}
      color={props.color || '#007BFF'}
    />
  ), // Mapeia a tag button para o componente Button
  slider: (props) => (
    <Slider
      minimumValue={props.min || 0}
      maximumValue={props.max || 1}
      value={props.value || 0}
      onValueChange={props.onChange}
      style={tailwind(props.className || 'w-full')}
    />
  ), // Mapeia a tag slider para o componente Slider
  modal: (props) => (
    <Modal
      visible={props.visible}
      transparent={props.transparent || false}
      animationType={props.animationType || 'slide'}
      onRequestClose={props.onRequestClose}
    >
      <View style={tailwind('flex-1 justify-center items-center')}>
        {props.children}
      </View>
    </Modal>
  ), // Mapeia a tag modal para o componente Modal
  flatlist: (props) => (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={props.keyExtractor || ((item) => item.id)}
      style={tailwind(props.className || 'w-full')}
    />
  ), // Mapeia a tag flatlist para o componente FlatList
  sectionlist: (props) => (
    <SectionList
      sections={props.sections}
      renderItem={props.renderItem}
      renderSectionHeader={props.renderSectionHeader}
      keyExtractor={props.keyExtractor || ((item) => item.id)}
      style={tailwind(props.className || 'w-full')}
    />
  ), // Mapeia a tag sectionlist para o componente SectionList
  safeareaview: (props) => (
    <SafeAreaView style={tailwind(props.className || 'flex-1')}>
      {props.children}
    </SafeAreaView>
  ), // Mapeia a tag safeareaview para o componente SafeAreaView 
  keyboardavoidingview: (props) => (
    <KeyboardAvoidingView
      behavior={props.behavior || 'padding'}
      style={tailwind(props.className || 'flex-1')}
    >
      {props.children}
    </KeyboardAvoidingView>
  ), // Mapeia a tag keyboardavoidingview para o componente KeyboardAvoidingView
  imagebackground: (props) => (
    <ImageBackground source={{ uri: props.src }} style={tailwind('w-full h-full')}>
      {props.children}
    </ImageBackground>
  ), // Mapeia a tag imagebackground para o componente ImageBackground
  pressable: (props) => (
    <Pressable onPress={props.onClick} style={tailwind(props.className || '')}>
      {props.children}
    </Pressable>
  ), // Mapeia a tag pressable para o componente Pressable
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Mapeia atributos HTML para propriedades React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
const attributeMap = {
  class: 'className',
  for: 'htmlFor',
  href: 'href',
  src: 'source',
  style: 'style',
  id: 'id',
  type: 'type',
  value: 'value',
  placeholder: 'placeholder',
  checked: 'value',
  onClick: 'onPress',
  onChange: 'onValueChange',
  min: 'minimumValue',
  max: 'maximumValue',
  size: 'size',
  color: 'color',
  title: 'title',
  visible: 'visible',
  transparent: 'transparent',
  animationType: 'animationType',
  onRequestClose: 'onRequestClose',
  keyExtractor: 'keyExtractor',
  data: 'data',
  renderItem: 'renderItem',
  sections: 'sections',
  renderSectionHeader: 'renderSectionHeader',
  behavior: 'behavior',
  children: 'children',
  // Adicione mais atributos conforme necessário
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Interpretador de HTML para React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
class HtmltoReactInterpreter {

////////////////////////////////////////////////////////////////////////////////////////////////////
  // Construtor da classe
////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor() {
    this.currentTag = null; // Tag HTML atual sendo processada
    this.currentAttribs = null; // Atributos da tag HTML atual
    this.currentChildren = []; // Filhos da tag HTML atual
    this.currentElements = []; // Elementos React Native renderizados
    this.key = 0; // Chave única para cada elemento React Native

    // Cria um analisador de HTML
    this.parser = new htmlparser2.Parser({
      // Define os eventos de análise de HTML 

      // Quando uma tag HTML é aberta
      onopentag: (name, attribs) => { 
        this.currentTag = name; // Define a tag HTML atual
        this.currentAttribs = this.mapAttributes(attribs); // Mapeia os atributos da tag HTML
        this.currentChildren = []; // Reseta os filhos da tag HTML
      },
      // Quando um texto é encontrado
      ontext: (text) => { 
        if (this.currentTag) { // Se houver uma tag HTML atual
          this.currentChildren.push(text); // Adiciona o texto aos filhos da tag HTML
        }
      },
      // Quando uma tag HTML é fechada
      onclosetag: (tagName) => {
        // Verifica se a tag HTML atual é a mesma que está sendo fechada
        if (this.currentTag === tagName) {
          const Component = tagMap[this.currentTag] || View; // Obtém o componente React Native correspondente à tag HTML
          const props = {
            ...this.currentAttribs,
            style: this.currentAttribs.className ? this.applyStyles(this.currentAttribs.className) : {},
          }; // Define as propriedades do componente React Native
          const children = this.currentChildren.length ? this.currentChildren : null; // Define os filhos do componente React Native
          this.currentElements.push(
            <Component key={this.key++} {...props}>
              {children}
            </Component>
          ); // Adiciona o componente React Native renderizado à lista de elementos
          this.currentTag = null; // Reseta a tag HTML atual
          this.currentAttribs = null; // Reseta os atributos da tag HTML atual
          this.currentChildren = []; // Reseta os filhos da tag HTML atual
        }
      },
    });
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
// Mapeia atributos HTML para propriedades React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
  mapAttributes = (attribs) => {
    const mappedAttribs = {}; // Atributos mapeados
    // Mapeia os atributos HTML para propriedades React Native
    for (const [key, value] of Object.entries(attribs)) {
      const mappedKey = attributeMap[key] || key; // Mapeia a chave do atributo
      mappedAttribs[mappedKey] = value; // Define o atributo mapeado
    }
    return mappedAttribs; // Retorna os atributos mapeados
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Aplica estilos Tailwind CSS
////////////////////////////////////////////////////////////////////////////////////////////////////
  applyStyles = (className) => {
    return tailwind(className); // Aplica os estilos Tailwind CSS
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Analisa o HTML e renderiza os componentes React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
  parseHtml = (html) => {
    this.parser.write(html); // Analisa o HTML
    this.parser.end(); // Finaliza a análise
    return this.currentElements; // Retorna os elementos React Native renderizados
  };

////////////////////////////////////////////////////////////////////////////////////////////////////
// Renderiza os componentes React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
  renderComponents = (html) => {
    return this.parseHtml(html); // Renderiza os componentes React Native
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Exporta o interpretador de HTML para React Native
////////////////////////////////////////////////////////////////////////////////////////////////////
export default HtmltoReactInterpreter; 

////////////////////////////////////////////////////////////////////////////////////////////////////



// Esbouço de um exemplo de uso do interpretador de HTML para React Native
/**
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, ScrollView, StyleSheet } from 'react-native';
import HtmltoReactInterpreter from './HtmltoReactInterpreter'; // Importe seu interpretador

const App = () => {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simula uma chamada API para obter dados dinâmicos
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simula uma chamada de API com sucesso
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const result = await response.json();

      // Define HTML dinâmico com dados e condições
      const dynamicHtml = `
        <div>
          <h1>${result.title}</h1>
          <p>${result.body}</p>
          <button onClick="alert('Button clicked!')">Click me</button>
        </div>
      `;

      setHtml(dynamicHtml);
      setData(result);
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  // Instancia o interpretador HTML
  const interpreter = new HtmltoReactInterpreter();
  const renderedComponents = interpreter.renderComponents(html);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <ScrollView>
          {renderedComponents}
        </ScrollView>
      )}
      {!loading && !error && data && (
        <View style={styles.dataContainer}>
          <Text>Data Loaded:</Text>
          <Text>Title: {data.title}</Text>
          <Text>Body: {data.body}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 20,
  },
});

export default App;

 */