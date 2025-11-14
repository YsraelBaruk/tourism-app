import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import styles from './styles';

function RegisterOwn() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const publisherTypes = [
    {
      id: 'empreendedor_local',
      title: 'Empreendedor Local',
      description: 'Para donos de negócios locais que querem promover seus serviços',
    },
    {
      id: 'publicador_publico',
      title: 'Publicador Público',
      description: 'Para organizações públicas e eventos governamentais',
    },
    {
      id: 'colaborador_privado',
      title: 'Publicador Privado',
      description: 'Para empresas e organizações privadas',
    },
    {
      id: 'guia_credenciado',
      title: 'Guia Turístico',
      description: 'Para profissionais do turismo e guias especializados',
    },
  ];

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      // Aqui você pode navegar para a próxima tela de cadastro
      router.push({
        pathname: "/screens/(auth)/(register)/registerClient",
        params: { role: selectedType },
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="map" size={32} color="#fff" />
          </View>
          <Text style={styles.logoText}>MyRoute</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <Text style={styles.title}>Criar Conta</Text>
        </View>

        <Text style={styles.subtitle}>
          Diga de que forma você gostaria de colaborar{'\n'}com a nossa comunidade:
        </Text>

        <View style={styles.optionsContainer}>
          {publisherTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionCard,
                selectedType === type.id && styles.optionCardSelected,
              ]}
              onPress={() => handleTypeSelection(type.id)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioButton,
                  selectedType === type.id && styles.radioButtonSelected,
                ]}>
                  {selectedType === type.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={[
                  styles.optionText,
                  selectedType === type.id && styles.optionTextSelected,
                ]}>
                  {type.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {selectedType && (
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

export default RegisterOwn;