import { width } from "@/app/index";
import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0,
    minHeight: width * 0.15,
    backgroundColor: '#82A1E2',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default styles;