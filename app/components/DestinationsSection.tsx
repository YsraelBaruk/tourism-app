import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const DestinationsSection = () => {
  const destinations = [
    {
      name: 'Sítio do Carroção',
      image: 'https://via.placeholder.com/150x120/4CAF50/ffffff?text=Sítio+do+Carroção',
    },
    {
      name: 'Marcos Ribeiro',
      image: 'https://via.placeholder.com/150x120/FF9800/ffffff?text=Marcos+Ribeiro',
    },
    {
      name: 'Festa de São João',
      image: 'https://via.placeholder.com/150x120/2196F3/ffffff?text=Festa+de+São+João',
    },
    {
      name: 'Festa do Frango',
      image: 'https://via.placeholder.com/150x120/9C27B0/ffffff?text=Festa+do+Frango',
    },
  ];

  return (
    <View style={styles.destinationsSection}>
      <View style={styles.destinationsHeader}>
        <Text style={styles.destinationsTitle}>DESTINOS</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar destinos..."
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.destinationsGrid}>
        {destinations.map((destination, index ) => (
          <TouchableOpacity key={index} style={styles.destinationCard}>
            <Image
              source={{uri: destination.image}}
              style={styles.destinationImage}
            />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <View style={styles.favoriteIcon}>
                <Text style={styles.favoriteIconText}>♡</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreText}>VER MAIS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  destinationsSection: {
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingVertical: 25,
    flex: 1,
  },
  destinationsHeader: {
    marginBottom: 20,
  },
  destinationsTitle: {
    color: '#4A90E2',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.035,
    color: '#333',
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  destinationCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationImage: {
    width: '100%',
    height: width * 0.3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  destinationInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationName: {
    fontSize: width * 0.035,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIconText: {
    fontSize: 18,
    color: '#ccc',
  },
  seeMoreButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  seeMoreText: {
    color: 'white',
    fontSize: width * 0.035,
    fontWeight: '600',
  },
});

export default DestinationsSection;
