import { width } from "@/app/screens/(client)/home/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  functionsSection: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: width * 0.05,
    paddingVertical: 25,
  },
  functionsTitle: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  functionsSubtitle: {
    color: 'white',
    fontSize: width * 0.035,
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 20,
  },
  functionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  functionItem: {
    alignItems: 'center',
    flex: 1,
  },
  functionIcon: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: 'white',
    borderRadius: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 10,
  },
  functionIconText: {
    fontSize: width * 0.05,
  },
  functionLabel: {
    color: 'white',
    fontSize: width * 0.03,
    textAlign: 'center',
  },
});
