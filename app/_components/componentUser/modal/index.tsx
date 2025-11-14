import { useAuth } from '@/app/context/AuthContext';
import { logger } from '@/utils/logger';
import { useRouter } from 'expo-router';
import {
    Alert,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import styles from './styles';

interface ModalProfileProps {
  visible: boolean;
  onClose: () => void;
  userName: string;
}

function ModalProfile({ visible, onClose, userName }: ModalProfileProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => {
            logger.log('LOGOUT_CANCELLED', 'info', {
              event_description: 'Usuário cancelou o logout',
            });
          }
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              logger.log('LOGOUT_CONFIRMED', 'info', {
                event_description: 'Usuário confirmou o logout',
              });

              // Fecha o modal imediatamente
              onClose();
              
              // Executa logout
              await signOut();
              
              // Força redirecionamento para login
              setTimeout(() => {
                router.replace('/');
              }, 100);
              
            } catch (error) {
              logger.log('LOGOUT_UI_ERROR', 'error', {
                error: `Erro na UI durante logout: ${error}`,
              });
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  const handleOptionPress = (option: string) => {
    // Implementar navegação para as diferentes telas
    console.log(`Pressed: ${option}`);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          {/* Header do Modal */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleOptionPress('account-info')}
            >
              <Text style={styles.menuText}>Informações da conta</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleOptionPress('favorites')}
            >
              <Text style={styles.menuText}>Favoritos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleOptionPress('my-routes')}
            >
              <Text style={styles.menuText}>Meus Roteiros</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleOptionPress('my-certificates')}
            >
              <Text style={styles.menuText}>Meus Certificados</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleSignOut}
            >
              <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default ModalProfile