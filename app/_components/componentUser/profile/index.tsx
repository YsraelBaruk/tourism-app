import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from '@/app/context/AuthContext';
import styles from './styles';

function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  const handleProfilePress = () => {
    setModalVisible(true);
  };

  // Extrai o nome do usuário dos metadados ou usa o email como fallback
  const getUserName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user?.email) {
      // Se não tiver nome, usa a parte antes do @ do email
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <TouchableOpacity
      style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 10, flexDirection: 'row-reverse' }}
      onPress={handleProfilePress}
    >
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Olá, {getUserName()}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Profile;