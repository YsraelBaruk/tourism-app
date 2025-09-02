// App.js
// Página simples em React Native sobre a Lady Gaga com 3 imagens
// Funciona em projetos React Native/Expo. Substitua as URLs de exemplo por fotos da Lady Gaga.

import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, StatusBar } from 'react-native';

export default function LadyGagaScreen() {
  // 👉 Troque estas URLs por imagens reais da Lady Gaga (pode ser links https ou assets locais via require)
  const images = [
    { id: 1, uri: 'https://assets.papelpop.com/wp-content/uploads/2021/04/lady-gaga-the-game-920x625-1.png', caption: 'Lady Gaga — Era The Fame' },
    { id: 2, uri: 'https://www.audiograma.com.br/wp-content/uploads/2018/01/lady-gaga-dez-anos_04.jpg', caption: 'Lady Gaga — Era Born This Way' },
    { id: 3, uri: 'https://placehold.co/1200x800?text=Lady+Gaga+3', caption: 'Lady Gaga — Era Chromatica' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Lady Gaga</Text>
        <Text style={styles.subtitle}>
          Uma página simples celebrando a Mother Monster. Substitua as imagens abaixo por fotos reais da Gaga.
        </Text>

        {images.map((img) => (
          <View key={img.id} style={styles.card}>
            <Image
              source={{ uri: img.uri }}
              style={styles.image}
              resizeMode="cover"
              accessible
              accessibilityLabel={`Imagem ${img.id} da Lady Gaga`}
            />
            <View style={styles.captionBar}>
              <Text style={styles.caption}>{img.caption}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0b0b12',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    color: '#c7c7d1',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#141424',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 220,
  },
  captionBar: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  caption: {
    color: '#e9e9f2',
    fontSize: 14,
  },
});

// Navegação (exemplo de como poderia ser o arquivo de navegação)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={LadyGagaScreen}
          options={{
            title: 'Lady Gaga App',
            headerStyle: { backgroundColor: '#0b0b12' },
            headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}