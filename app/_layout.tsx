// app/_layout.tsx
import { Stack } from "expo-router";
import { View, Text } from "react-native";

// Header customizado reaproveitável
function CustomHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        height: 100, // altura maior
        backgroundColor: "#1f4ba3ff", // cor do header
        justifyContent: "center", // centraliza verticalmente
        alignItems: "center",    // centraliza horizontalmente
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
}

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader title="" />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          header: () => <CustomHeader title="" />,
        }}
      />
    </Stack>
  );
}
