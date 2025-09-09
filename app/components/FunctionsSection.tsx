import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const FunctionsSection = () => {
  const functions = [
    { icon: '🏨', label: 'Hotéis' },
    { icon: '✈️', label: 'Voos' },
    { icon: '📍', label: 'Locais' },
    { icon: '🎫', label: 'Eventos' },
  ];

  return (
    <View style={styles.functionsSection}>
      <Text style={styles.functionsTitle}>FUNÇÕES</Text>
      <Text style={styles.functionsSubtitle}>
        Explore suas funções favoritas que tornam sua viagem mais fácil
      </Text>
      
      <View style={styles.functionsGrid}>
        {functions.map((func, index) => (
          <TouchableOpacity key={index} style={styles.functionItem}>
            <View style={styles.functionIcon}>
              <Text style={styles.functionIconText}>{func.icon}</Text>
            </View>
            <Text style={styles.functionLabel}>{func.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  functionsSection: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: width * 0.05,
    paddingVertical: 25,
  },
  functionsTitle: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  functionsSubtitle: {
    color: 'white',
    fontSize: width * 0.035,
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 20,
  },
  functionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  functionItem: {
    alignItems: 'center',
    flex: 1,
  },
  functionIcon: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: 'white',
    borderRadius: width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  functionIconText: {
    fontSize: width * 0.05,
  },
  functionLabel: {
    color: 'white',
    fontSize: width * 0.03,
    textAlign: 'center',
  },
});

export default FunctionsSection;
