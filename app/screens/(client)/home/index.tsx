import {
    ScrollView,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import DestinationsSection from '@/app/_components/destinationsSection';
import ExploreSection from '@/app/_components/exploreSection';
import FunctionsSection from '@/app/_components/functionsSection';
import HeaderHome from '@/app/_components/headerHome/index';

function Home() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* <StatusBar barStyle="light-content" backgroundColor="#3189afff" /> */}
      <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}>
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
  contentContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
}); 

//  Home;
export default Home;