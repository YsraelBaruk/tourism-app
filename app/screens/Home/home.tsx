import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';

import DestinationsSection from '../../components/DestinationsSection';
import ExploreSection from '../../components/ExploreSection';
import FunctionsSection from '../../components/FunctionsSection';
import HeaderHome from '../../components/HeaderHome';

export const { width } = Dimensions.get('window');

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3189afff" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeaderHome />
        <ExploreSection />
        <FunctionsSection />
        <DestinationsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
});

export default Home;
