import { Stack } from "expo-router";
import { Image } from 'react-native';

function ClientLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen
        name="home"
      />
    </Stack>
  );
}

export default ClientLayout;