import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image
} from 'react-native';

import { styles } from '@/app/_components/exploreSection/styles';

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
        <View style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 10, flexDirection: 'row-reverse' }}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
              }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Olá, User</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ExploreSection;
