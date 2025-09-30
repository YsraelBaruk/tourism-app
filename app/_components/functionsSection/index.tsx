import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '@/app/_components/functionsSection/styles';

import { CalendarCheck, GraduationCap, Heart, MapPin } from 'lucide-react-native';
import { Icon } from '../IconMap/index';

export function FunctionsSection () {

  const functions = [
    { icon: CalendarCheck, label: 'Acompanhar eventos' },
    { icon: MapPin, label: 'Ver Trilhas' },
    { icon: Heart , label: 'Meus roteiros favoritos' },
    { icon: GraduationCap, label: 'Certificados' },
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
              <Icon name={func.icon} color="#2457C5" size={30} />
            </View>
            <Text style={styles.functionLabel}>{func.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

