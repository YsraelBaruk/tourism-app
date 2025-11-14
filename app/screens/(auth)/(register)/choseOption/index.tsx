import { Ionicons } from "@expo/vector-icons"; // Para o ícone de voltar
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import styles from './styles';

function RegisterScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#3258A6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Conta</Text>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem-Vindo!</Text>
        <Text style={styles.subtitle}>
          Para começarmos, diga o tipo de usuário você quer ser:
        </Text>

        <View style={styles.cardsContainer}>
          {/* Card Visitante */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/screens/(auth)/(register)/registerClient",
                params: { role: 'usuario_comum' },
              })
            }
          >
            <Ionicons name="person-circle-outline" size={40} color="#3258A6" />
            <Text style={styles.cardText}>Visitante{"\n"}(Usuário comum)</Text>
          </TouchableOpacity>

          {/* Card Colaborador */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/screens/(auth)/(register)/registerOwn",
                params: { role: 'colaborador_privado' },
              })
            }
          >
            <Ionicons name="person-add-outline" size={40} color="#3258A6" />
            <Text style={styles.cardText}>
              Colaborador da{"\n"}comunidade (Oficial)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;