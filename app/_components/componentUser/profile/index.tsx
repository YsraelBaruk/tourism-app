import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from './styles';

function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleProfilePress = () => {
    setModalVisible(true);
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
          <Text style={styles.greeting}>Olá, User</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Profile;