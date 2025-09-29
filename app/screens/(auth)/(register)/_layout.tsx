; import { Stack } from "expo-router";
import { Image } from 'react-native';

export default function RegisterLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
      // headerTitle: () => (
      //   <Image
      //     source={require("@/assets/images/logo.png")}
      //     style={{ width: 60, resizeMode: "contain" }}
      //   />
      // ),
      // headerStyle: {
      //   backgroundColor: "#3258A6",
      // },
      // headerTintColor: "#fff",
      // headerTitleAlign: "center",
    }} >
      <Stack.Screen
        name="choseOption"
      />
      <Stack.Screen
        name="registerClient"
      />
      <Stack.Screen
        name="registerOwn"
      />
    </Stack>
  );
}
