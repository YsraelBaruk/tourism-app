import { useAuth } from "@/app/context/AuthContext";
import Login from "@/app/screens/(auth)/login/index";
import { logger } from "@/utils/logger";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const { width } = Dimensions.get('window');

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !hasRedirected) {
      if (user) {
        // Se usuário está logado, redireciona para home
        logger.log('INDEX_REDIRECT_HOME', 'info', {
          userId: user.id,
          email: user.email,
          event_description: 'Redirecionando usuário logado para home',
        });
        setHasRedirected(true);
        router.replace("/home");
      } else {
        // Se não está logado, permanece no login
        logger.log('INDEX_SHOW_LOGIN', 'info', {
          event_description: 'Mostrando tela de login - usuário não autenticado',
        });
      }
    }
  }, [user, loading, router, hasRedirected]);

  // Reset do redirecionamento quando o usuário muda
  useEffect(() => {
    setHasRedirected(false);
  }, [user]);

  // Se ainda está carregando, mostra indicador
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
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