import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');

const ExploreSection = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-photo/front-view-smiley-people-walking-beach_23-2149480661.jpg?semt=ais_hybrid&w=740&q=80',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.exploreTitle}>EXPLORE DESTINOS</Text>
        <Text style={styles.exploreSubtitle}>
          Explore os melhores destinos do mundo para as suas próximas viagens
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)', // camada escura para melhorar leitura
    paddingHorizontal: width * 0.05,
    paddingBottom: 30,
    paddingTop: 10,
  },
  exploreTitle: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exploreSubtitle: {
    color: 'white',
    fontSize: width * 0.035,
    opacity: 0.9,
    lineHeight: 20,
  },
});

export default ExploreSection;
