import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@/app/_components/functionsSection/styles';

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

export default FunctionsSection;
