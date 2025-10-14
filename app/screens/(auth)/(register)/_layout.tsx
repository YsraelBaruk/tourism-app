import { Stack } from "expo-router";
import { Image } from 'react-native';

export default function RegisterLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
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
