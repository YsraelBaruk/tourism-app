import { width } from "@/app/screens/(client)/home/index";
import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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