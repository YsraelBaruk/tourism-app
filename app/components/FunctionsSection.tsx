import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FunctionsSection = () => {
  const functions = [
    { icon: 'calendar-outline', label: 'Eventos' },
    { icon: 'map-outline', label: 'Trilhas' },
    { icon: 'heart-outline', label: 'Favoritos' },
    { icon: 'document-text-outline', label: 'Certificados' },
  ];

  return (
    <LinearGradient
     colors={['#2F5CDA', '#193174']} // 🔹 novo gradiente
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.section}
    >
      <Text style={styles.title}>FUNÇÕES</Text>
      <Text style={styles.subtitle}>
        Explore suas melhores versões das quais eu to enchendo linguica
      </Text>

      <View style={styles.grid}>
        {functions.map((func, index) => (
          <TouchableOpacity key={index} style={styles.item}>
            <View style={styles.iconCircle}>
              <Ionicons name={func.icon} size={26} color="#003F9E" />
            </View>
            <Text style={styles.label}>{func.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.033,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 25,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    alignItems: 'center',
    width: '23%', // 4 por linha
    marginBottom: 25,
  },
  iconCircle: {
    width: width * 0.16, // ajustado pro novo layout
    height: width * 0.16,
    backgroundColor: 'white',
    borderRadius: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default FunctionsSection;
