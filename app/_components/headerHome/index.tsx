import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '@/app/_components/headerHome/styles'

export const HeaderHome = () => {
  return (
    <LinearGradient
      colors={['#2f5cda', '#193174']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.header}
    >
      <View style={styles.headerTop}>
        {/* Foto à esquerda */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Texto à direita */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Olá, User</Text>
        </View>
      </View>
    </LinearGradient>
  );
};