import { width } from "@/app/screens/(client)/home/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  greetingContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  greeting: {
    color: '#ffffff',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    textAlign: 'center'
  },
});