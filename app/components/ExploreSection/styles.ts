import { width } from "@/app/screens/Home/home";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)', // camada escura para melhorar leitura
    paddingHorizontal: width * 0.05,
    paddingBottom: 30,
    paddingTop: 10,
  },
  exploreTitle: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exploreSubtitle: {
    color: 'white',
    fontSize: width * 0.035,
    opacity: 0.9,
    lineHeight: 20,
  },
});