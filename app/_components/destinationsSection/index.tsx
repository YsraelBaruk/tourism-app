import { Heart, MapPin } from 'lucide-react-native';

import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '@/app/_components/destinationsSection/styles';

import img1 from '@/assets/images/trips/image1.png';
import img2 from '@/assets/images/trips/image2.png';
import img3 from '@/assets/images/trips/image3.png';
import img4 from '@/assets/images/trips/image4.png';
import { Icon } from '../IconMap';

export function DestinationsSection () {
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
        {destinations.map((destination, index) => (
          <TouchableOpacity key={index} style={styles.destinationCard}>
            <LinearGradient
              colors={['#2F5CDA', '#193174']}  // seu gradiente
              start={{ x: 0, y: 0 }}           // começo do gradiente
              end={{ x: 1, y: 1 }}             // final do gradiente
              style={styles.destinationCardGradient}
            >

              <Image
                source={destination.image}
                style={styles.destinationImage}
              />
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <View style={styles.favoriteIcon}>
                  {/* <Text style={styles.favoriteIconText}>♡</Text> */}
                  <Icon name={Heart} size={18} color='white'/>
                </View>
              </View>
              <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10, paddingLeft: 10, paddingBottom: 10}}>
                <MapPin size={15} color={'#fff'}/>
                <Text style={styles.destinationCity}>{destination.city}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreText}>VER MAIS</Text>
      </TouchableOpacity>
    </View>
  );
};