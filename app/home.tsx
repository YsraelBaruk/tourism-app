import HomeScreen from "./screens/(client)/home";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Se não tem usuário autenticado, redireciona para login
      router.replace("/");
    }
  }, [user, loading, router]);

  // Se ainda está carregando, mostra indicador
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Se não tem usuário, não renderiza nada (será redirecionado)
  if (!user) {
    return null;
  }

  return <HomeScreen />;
}