import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Header = () => {
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
              uri: 'https://portalpopline.com.br/wp-content/uploads/2025/08/dead-dance-lady-gaga.jpg',
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

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0,
    paddingHorizontal: width * 0.05,
    paddingVertical: 20,
    minHeight: 100,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  greetingContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  greeting: {
    color: '#ffffff',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Header;
