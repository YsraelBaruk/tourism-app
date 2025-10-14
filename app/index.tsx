import { StyleSheet, Dimensions } from "react-native";
import Login from "@/app/screens/(auth)/login/index";
import { SafeAreaView } from "react-native-safe-area-context";

export const { width } = Dimensions.get('window');

export default function Index() {
  return (
    <SafeAreaView>
      <Login />
    </SafeAreaView>
  );
}