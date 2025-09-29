import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet
} from 'react-native';

import ExploreSection from '@/app/_components/exploreSection';
import FunctionsSection from '@/app/_components/functionsSection';
import {HeaderHome} from '@/app/_components/headerHome/index';
import DestinationsSection from '@/app/_components/destinationsSection';

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
