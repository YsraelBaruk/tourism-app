import {
  Image,
  View,
} from 'react-native';

import { styles } from '@/app/_components/headerHome/styles';

import logo from '@/assets/images/trips/logo.png'

export function HeaderHome () {
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