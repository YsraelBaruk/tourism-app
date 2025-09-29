; import { Stack } from "expo-router";
import { Image } from 'react-native';

export default function ClientLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen
        name="DestinationsSection"
      />
      <Stack.Screen
        name="ExploreSection"
      />
      <Stack.Screen
        name="FunctionsSection"
      />
    </Stack>
  );
}
