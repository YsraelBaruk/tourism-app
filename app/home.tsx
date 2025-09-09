import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import HeaderHome from './components/HeaderHome';
import ExploreSection from './components/ExploreSection';
import FunctionsSection from './components/FunctionsSection';
import DestinationsSection from './components/DestinationsSection';

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
