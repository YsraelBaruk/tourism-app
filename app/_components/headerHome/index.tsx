import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import { styles } from '@/app/_components/headerHome/styles';
import { LinearGradient } from 'expo-linear-gradient';

import logo from '@/assets/images/logo.png'

export const HeaderHome = () => {
  return (
    <View
      style={styles.header}
    >
      <View style={styles.headerTop}>
        <Image style={{width: 50, height: 50}} source={logo}/>
      </View>
    </View>
  );
};