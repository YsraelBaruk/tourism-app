import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { styles } from '@/app/_components/exploreSection/styles';
import { Profile } from '../componentUser/profile';

export function ExploreSection () {
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
        <Profile />
      </View>
    </ImageBackground>
  );
};