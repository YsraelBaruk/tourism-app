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
            console.log('🚫 [ModalProfile] Logout cancelado pelo usuário');
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
              console.log('✅ [ModalProfile] Logout confirmado pelo usuário');
              logger.log('LOGOUT_CONFIRMED', 'info', {
                event_description: 'Usuário confirmou o logout',
              });

              console.log('🔄 [ModalProfile] Iniciando processo de logout...');
              
              // Fecha o modal imediatamente
              onClose();
              
              console.log('🔄 [ModalProfile] Executando signOut...');
              
              // Executa logout
              await signOut();
              
              console.log('✅ [ModalProfile] SignOut executado com sucesso');
              
              // Aguarda um pouco para garantir que o estado foi atualizado
              console.log('🔄 [ModalProfile] Aguardando atualização do estado...');
              await new Promise(resolve => setTimeout(resolve, 200));
              
              // Força redirecionamento para login com diferentes estratégias
              console.log('🔄 [ModalProfile] Redirecionando para tela inicial...');
              
              try {
                // Estratégia principal: replace
                console.log('🔄 [ModalProfile] Tentativa 1: router.replace("/")');
                router.replace('/');
                
                // Verificação com delay
                setTimeout(() => {
                  console.log('🔍 [ModalProfile] Verificando se redirecionamento funcionou...');
                  console.log('📍 [ModalProfile] Tentativa de redirecionamento executada');
                }, 300);
                
              } catch (replaceError) {
                console.warn('⚠️ [ModalProfile] Erro no replace, tentando push:', replaceError);
                
                try {
                  // Estratégia fallback: push
                  console.log('🔄 [ModalProfile] Tentativa 2: router.push("/")');
                  router.push('/');
                } catch (pushError) {
                  console.error('❌ [ModalProfile] Erro no push também:', pushError);
                  
                  // Última estratégia: dismiss todas as rotas
                  setTimeout(() => {
                    console.log('🔄 [ModalProfile] Tentativa 3: router.dismissAll + navigate');
                    try {
                      if (router.dismissAll) {
                        router.dismissAll();
                      }
                      router.replace('/');
                    } catch (finalError) {
                      console.error('❌ [ModalProfile] Todas as estratégias falharam:', finalError);
                    }
                  }, 500);
                }
              }
              
            } catch (error) {
              logger.log('LOGOUT_UI_ERROR', 'error', {
                error: `Erro na UI durante logout: ${error}`,
              });
              console.error('❌ [ModalProfile] Erro ao fazer logout:', error);
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