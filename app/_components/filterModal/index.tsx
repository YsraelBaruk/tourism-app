import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { X, Calendar } from 'lucide-react-native';
import Icon from '../IconMap';
import styles from './styles';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter?: (filters: FilterData) => void;
}

interface FilterData {
  city: string;
  date: string;
  type: string[];
  accessibility: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApplyFilter }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);

  const typeOptions = [
    { id: 'rural', label: 'Rural' },
    { id: 'urbano', label: 'Urbano' },
    { id: 'trilha', label: 'Trilha' },
    { id: 'festival', label: 'Festival' },
  ];

  const accessibilityOptions = [
    { id: 'banheiro_adaptado', label: 'Banheiro adaptado' },
    { id: 'corrimoes', label: 'Corrimões' },
    { id: 'rampas_acesso', label: 'Rampas de acesso' },
    { id: 'elevador', label: 'Elevador' },
    { id: 'sinalizacao_acessivel', label: 'Sinalização acessível' },
    { id: 'piso_tatil', label: 'Piso Tátil' },
  ];

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleAccessibility = (accessId: string) => {
    setSelectedAccessibility(prev => 
      prev.includes(accessId) 
        ? prev.filter(id => id !== accessId)
        : [...prev, accessId]
    );
  };

  const handleApplyFilter = () => {
    const filters: FilterData = {
      city: selectedCity,
      date: selectedDate,
      type: selectedTypes,
      accessibility: selectedAccessibility,
    };
    
    onApplyFilter?.(filters);
    onClose();
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedDate('');
    setSelectedTypes([]);
    setSelectedAccessibility([]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtro</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name={X} size={24} color="#5A7EFB" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Cidade */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Cidade</Text>
              <View style={styles.selectContainer}>
                <TextInput
                  style={styles.selectInput}
                  value={selectedCity}
                  onChangeText={setSelectedCity}
                  placeholder="Selecione uma cidade"
                  placeholderTextColor="#999"
                />
                <View style={styles.selectIconContainer}>
                  <Text style={styles.selectArrow}>▼</Text>
                </View>
              </View>
            </View>

            {/* Data */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Data</Text>
              <View style={styles.dateContainer}>
                <TextInput
                  style={styles.dateInput}
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                  placeholder="  /  /"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.calendarButton}>
                  <Icon name={Calendar} size={20} color="#5A7EFB" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tipo */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Tipo</Text>
              <View style={styles.typeContainer}>
                {typeOptions.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeButton,
                      selectedTypes.includes(type.id) && styles.typeButtonSelected
                    ]}
                    onPress={() => toggleType(type.id)}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      selectedTypes.includes(type.id) && styles.typeButtonTextSelected
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Acessibilidade */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Selecione o(s) tipo(s) de acessibilidade:</Text>
              <View style={styles.accessibilityContainer}>
                {accessibilityOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.checkboxContainer}
                    onPress={() => toggleAccessibility(option.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedAccessibility.includes(option.id) && styles.checkboxSelected
                    ]}>
                      {selectedAccessibility.includes(option.id) && (
                        <Text style={styles.checkboxCheck}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Botões de ação */}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;