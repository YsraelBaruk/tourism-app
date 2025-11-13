import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '@/app/_components/headerHome/styles';
import LogViewer from '@/app/_components/logViewer';

import logo from '@/assets/images/trips/logo.png';

function HeaderHome () {
  const [logViewerVisible, setLogViewerVisible] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Image style={{width: 50, height: 50}} source={logo}/>
        
        {/* Botão para abrir logs (apenas para desenvolvimento) */}
        {__DEV__ && (
          <TouchableOpacity
            onPress={() => setLogViewerVisible(true)}
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              padding: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
            }}
          >
            <Ionicons name="analytics" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
      
      <LogViewer
        visible={logViewerVisible}
        onClose={() => setLogViewerVisible(false)}
      />
    </View>
  );
};

export default HeaderHome;