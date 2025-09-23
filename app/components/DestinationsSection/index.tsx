import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import {styles} from '@/app/components/DestinationsSection/styles'

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

export default DestinationsSection;
