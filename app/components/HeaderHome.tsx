import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Header = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-photo/front-view-smiley-people-walking-beach_23-2149480661.jpg?semt=ais_hybrid&w=740&q=80',
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.headerTop}>
          {/* Botão de Localização */}
          <TouchableOpacity style={styles.locationButton}>
            <MaterialIcons name="location-on" size={18} color="#000" />
            <Text style={styles.locationText}>Tatuí-SP</Text>
          </TouchableOpacity>

          {/* Conteúdo do cabeçalho alinhado à direita */}
          <View style={styles.rightAlignedContent}>
            {/* Texto "Olá, User" */}
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Olá, User</Text>
            </View>

            {/* Foto à direita do texto */}
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: 'https://www.rollingstone.com/wp-content/uploads/2025/09/lady_gaga_vma-2.jpg?w=1581&h=1054&crop=1',
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <View style={styles.exploreContainer}>
          <Text style={styles.exploreTitle}>EXPLORE DESTINOS</Text>
          <Text style={styles.exploreSubtitle}>
            Explore os melhores destinos do mundo para as suas próximas viagens
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: height * 0.4, // Ajuste a altura conforme necessário
    justifyContent: 'space-between',
    
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Camada escura para melhorar a leitura
    paddingTop: 25,
    paddingHorizontal: width * 0.05,
    paddingBottom: 20,
    justifyContent: 'space-between',
  
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 3,
  },
  locationText: {
    marginLeft: 5,
    fontSize: width * 0.035,
    color: '#000',
    fontWeight: '500',
  },
  rightAlignedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    color: '#ffffff',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'right',
  },
  exploreContainer: {
    alignItems: 'center',
  },
  exploreTitle: {
    color: 'white',
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  exploreSubtitle: {
    color: 'white',
    fontSize: width * 0.04,
    opacity: 0.9,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom:10,
  },
});

export default Header;

