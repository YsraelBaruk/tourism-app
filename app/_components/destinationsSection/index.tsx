import { Funnel, Heart, MapPin } from 'lucide-react-native';

import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import styles from '@/app/_components/destinationsSection/styles';

import img1 from '@/assets/images/trips/image1.png';
import img2 from '@/assets/images/trips/image2.png';
import img3 from '@/assets/images/trips/image3.png';
import img4 from '@/assets/images/trips/image4.png';
import Icon from '../IconMap';
import FilterModal from '../filterModal';

function DestinationsSection() {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const destinations = [
    {
      name: 'Sítio do Carroção',
      image: img1,
      city: 'Tatuí-SP',
    },
    {
      name: 'Mavsa Resort ',
      image: img2,
      city: 'Cesário Lange-SP',
    },
    {
      name: 'Festa de São João',
      image: img3,
      city: 'Laranjal Paulista-SP',
    },
    {
      name: 'Festa do Frango',
      image: img4,
      city: 'Pereiras-SP',
    },
  ];

  const handleFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsFilterModalVisible(false);
  };

  const handleApplyFilter = (filters: any) => {
    console.log('Filtros aplicados:', filters);
    // Aqui você pode implementar a lógica de filtros
  };

  return (
    <View style={styles.destinationsSection}>
      <View style={styles.destinationsHeader}>
        <Text style={styles.destinationsTitle}>DESTINOS</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar destinos..."
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity onPress={handleFilterPress}>
            <View style={{padding: 5, borderColor: '#2F5CDA', borderWidth: 1, borderRadius: 10}}>
              <Icon name={Funnel} size={15} color='black' />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.destinationsGrid}>
        {destinations.map((destination, index) => (
          <TouchableOpacity key={index} style={styles.destinationCard}>
            <LinearGradient
              colors={['#2F5CDA', '#193174']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.destinationCardGradient}
            >
              <Image
                source={destination.image}
                style={styles.destinationImage}
              />
              <View style={styles.favoriteIcon}>
                <Icon name={Heart} size={18} color='white' fill='black' />
              </View>
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
              </View>
              <View style={styles.destinationCardCity}>
                <MapPin size={15} color={'#fff'} />
                <Text style={styles.destinationCity}>{destination.city}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreText}>VER MAIS</Text>
      </TouchableOpacity>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseModal}
        onApplyFilter={handleApplyFilter}
      />
    </View>
  );
};

export default DestinationsSection;