import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Breakpoints para responsividade
const isSmallScreen = screenWidth < 375;
const isMediumScreen = screenWidth >= 375 && screenWidth < 500;
const isLargeScreen = screenWidth >= 500;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    minHeight: screenHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: isSmallScreen ? 20 : isMediumScreen ? 80: 400,
    paddingVertical: 20,
    maxWidth: "100%", // : "100%", // Largura máxima para telas grandes
    alignSelf: "center",
    width: "100%",
  },
  title: {
    fontSize: Math.min(screenWidth * 0.08, 50), // Responsivo, máximo 32
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3258A6",
    textAlign: "center",
  },
  logo: {
    width: Math.min(screenWidth * 0.2, 100), // 20% da tela, máximo 100px
    height: Math.min(screenWidth * 0.2, 100),
    marginBottom: 30,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    fontWeight: "500",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 8,
    fontWeight: "500",
    color: "#3258A6",
    fontSize: Math.min(screenWidth * 0.035, 14), // Responsivo
  },
  input: {
    width: "100%",
    height: Math.max(screenHeight * 0.06, 50), // Mínimo 50px, responsivo à altura
    borderColor: "#3258A6",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: Math.min(screenWidth * 0.04, 16), // Responsivo
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 30,
    marginTop: -10,
  },
  forgotPassword: {
    color: "#3258A6",
    fontWeight: "500",
    fontSize: Math.min(screenWidth * 0.035, 14), // Responsivo
  },
  button: {
    width: "100%",
    backgroundColor: "#3258A6",
    paddingVertical: Math.max(screenHeight * 0.02, 15), // Responsivo à altura
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    minHeight: 50, // Altura mínima para facilitar o toque
  },
  buttonText: {
    color: "#fff",
    fontSize: Math.min(screenWidth * 0.04, 16), // Responsivo
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  registerText: {
    color: "#666",
    fontSize: Math.min(screenWidth * 0.035, 14), // Responsivo
    textAlign: "center",
  },
  registerLink: {
    color: "#3258A6",
    fontWeight: "500",
    fontSize: Math.min(screenWidth * 0.035, 14), // Responsivo
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#666",
    fontWeight: "500",
    fontSize: Math.min(screenWidth * 0.035, 14), // Responsivo
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: Math.max(screenHeight * 0.02, 15), // Responsivo à altura
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 30,
    minHeight: 50, // Altura mínima para facilitar o toque
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleLogo: {
    width: Math.min(screenWidth * 0.05, 24), // Responsivo, máximo 24px
    height: Math.min(screenWidth * 0.05, 24),
    marginRight: 10,
  },
  googleButtonText: {
    color: "#333",
    fontSize: Math.min(screenWidth * 0.04, 16), // Responsivo
    fontWeight: "500",
  },
  footerText: {
    color: "#999",
    fontSize: Math.min(screenWidth * 0.03, 12), // Responsivo
    marginTop: 10,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default styles;