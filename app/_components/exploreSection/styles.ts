import { width } from "@/app/index";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    justifyContent: 'center',
    height: width * 0.7
  },
  overlay: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.4)', // camada escura para melhorar leitura
    paddingHorizontal: width * 0.05,
    paddingBottom: 30,
    paddingTop: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  exploreTitle: {
    color: 'white',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  exploreSubtitle: {
    color: 'white',
    fontSize: width * 0.035,
    opacity: 0.9,
    lineHeight: 20,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
});

export default styles;