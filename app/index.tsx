import { useAuth } from "@/app/context/AuthContext";
import Login from "@/app/screens/(auth)/login/index";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const { width } = Dimensions.get('window');

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Se usuário está logado, redireciona para home
        router.replace("/home");
      }
      // Se não está logado, permanece no login (que é o padrão)
    }
  }, [user, loading, router]);

  // Se ainda está carregando, mostra login por enquanto
  if (loading) {
    return (
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    );
  }

  // Se não tem usuário, mostra login
  return (
    <SafeAreaView>
      <Login />
    </SafeAreaView>
  );
}