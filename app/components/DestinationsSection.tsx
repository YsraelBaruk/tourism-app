import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DestinationsSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);

  const destinations = [
    {
      name: 'Sítio do Carroção',
      image: 'https://bbfretamento.com.br/wp-content/uploads/2023/02/sitio-do-carrocao.jpg',
      location: 'Tatuí-SP',
      distance: '15,2 km',
      description: 'O Sítio do Carroção é um espaço de lazer para todas as idades com atrações variadas.',
    },
    {
      name: 'Mavsa Resort',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/456700386.jpg?k=55a0e3c297f02f139c279fdefd416eb6882837b9d88792efbb08a401d125533b&o=&hp=1',
      location: 'Cesário Lange-SP',
      distance: '21,3 km',
      description: 'O Mavsa Resort, em Cesário Lange, é um dos maiores resorts all inclusive do Brasil, ideal para lazer em família.',
    },
    {
      name: 'Festa de São João',
      image: 'https://ecrie.com.br/sistema/conteudos/imagem/g_165_0_1_09062023182956.jfif',
      location: 'Laranjal Paulista-SP',
      distance: '30,1 km',
      description: 'Uma festa tradicional com muitas comidas típicas e quadrilhas animadas.',
    },
    {
      name: 'Festa do Frango',
      image: 'https://www.pereiras.sp.gov.br/admin/globalarq/album/651_366/831ce943be297b2959ac252576341c8f.jpeg',
      location: 'Pereiras-SP',
      distance: '40,7 km',
      description: 'Evento cultural com comidas, shows e celebração da gastronomia local.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DESTINOS</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar destinos..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <Ionicons
            name="filter-outline"
            size={20}
            color="#4A90E2"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {destinations.map((dest, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => setSelectedDestination(dest)}
          >
            <Image source={{ uri: dest.image }} style={styles.image} />

            <View style={styles.heart}>
              <Ionicons name="heart-outline" size={20} color="white" />
            </View>

            <LinearGradient
              colors={['#2F5CDA', '#193174']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            >
              <Text style={styles.name}>{dest.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.8)" />
                <Text style={styles.location}>{dest.location}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>VER MAIS</Text>
      </TouchableOpacity>

      {/* MODAL DE DESTINO */}
      <Modal visible={!!selectedDestination} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedDestination(null)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            {selectedDestination && (
              <>
                <Text style={styles.modalTitle}>{selectedDestination.name}</Text>
                <Image source={{ uri: selectedDestination.image }} style={styles.modalImage} />
                <Text style={styles.modalLocation}>{selectedDestination.location}</Text>
                <Text style={styles.modalDistance}>{selectedDestination.distance}</Text>
                <ScrollView style={{ marginTop: 10, flexGrow: 0 }}>
                  <Text style={styles.modalDescription}>{selectedDestination.description}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>SABER MAIS</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* MODAL DE FILTRO */}
      <Modal visible={filterVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setFilterVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filtro</Text>

            <Text style={styles.label}>Cidade</Text>
            <TextInput placeholder="Selecione uma cidade" style={styles.input} />

            <Text style={styles.label}>Data</Text>
            <TextInput placeholder="DD/MM/AAAA" style={styles.input} />

            <Text style={styles.label}>Tipo</Text>
            <View style={styles.typesRow}>
              <TouchableOpacity style={styles.typeButton}><Text>Rural</Text></TouchableOpacity>
              <TouchableOpacity style={styles.typeButton}><Text>Urbano</Text></TouchableOpacity>
              <TouchableOpacity style={styles.typeButton}><Text>Trilha</Text></TouchableOpacity>
              <TouchableOpacity style={styles.typeButton}><Text>Festival</Text></TouchableOpacity>
            </View>

            <Text style={styles.label}>Acessibilidade</Text>
            <View style={styles.checkboxRow}>
              <Text>Banheiro adaptado</Text>
              <Text>Rampas de acesso</Text>
              <Text>Sinalização acessível</Text>
              <Text>Corrimões</Text>
              <Text>Elevador</Text>
              <Text>Piso Tátil</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f6ff',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    color: '#2F5CDA',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  filterIcon: {
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 15,
    marginBottom: 25,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: width * 0.38,
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 4,
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginLeft: 4,
  },
  moreButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 35,
    marginTop: 15,
    marginBottom: 25,
  },
  moreText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalClose: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F5CDA',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  modalLocation: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  modalDistance: {
    fontSize: 14,
    color: '#555',
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  typeButton: {
    borderWidth: 1,
    borderColor: '#4A90E2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  checkboxRow: {
    marginTop: 5,
  },
});

export default DestinationsSection;
