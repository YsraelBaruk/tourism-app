import { Stack } from "expo-router";
import { Image } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerTitle: () => (
        <Image
          source={require("@/assets/images/trips/logo.png")}
          style={{ width: 60, resizeMode: "contain" }}
        />
      ),
      headerStyle: {
        backgroundColor: "#3258A6",
      },
      headerTintColor: "#fff",
      headerTitleAlign: "center",
    }}>
      <Stack.Screen
        // name="login"
        // options={{ title: "Login" }}
      />
      <Stack.Screen
        name="(register)/choseOption"
      />
    </Stack>
  );
}
