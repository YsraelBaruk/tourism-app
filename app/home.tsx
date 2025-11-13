import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import HomeScreen from "./screens/(client)/home";

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