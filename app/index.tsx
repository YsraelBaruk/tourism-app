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
    console.log('🔍 [Index] useEffect executado:', { 
      hasUser: !!user, 
      userId: user?.id,
      loading, 
      hasRedirected,
      timestamp: new Date().toISOString()
    });
    
    if (!loading && !hasRedirected) {
      if (user) {
        // Se usuário está logado, redireciona para home
        console.log('🏠 [Index] Usuário autenticado detectado, redirecionando para home...');
        logger.log('INDEX_REDIRECT_HOME', 'info', {
          userId: user.id,
          email: user.email,
          event_description: 'Redirecionando usuário logado para home',
        });
        setHasRedirected(true);
        
        setTimeout(() => {
          console.log('🔄 [Index] Executando router.replace("/home")');
          router.replace("/home");
        }, 100);
        
      } else {
        // Se não está logado, permanece no login
        console.log('🔐 [Index] Usuário não autenticado, mostrando tela de login...');
        logger.log('INDEX_SHOW_LOGIN', 'info', {
          event_description: 'Mostrando tela de login - usuário não autenticado',
        });
        setHasRedirected(false); // Garante que pode redirecionar quando logar
      }
    }
  }, [user, loading, router, hasRedirected]);

  // Reset do redirecionamento quando o usuário muda (especialmente para logout)
  useEffect(() => {
    console.log('🔄 [Index] Monitorando mudança de usuário:', { 
      previousHasRedirected: hasRedirected,
      newUser: !!user,
      userId: user?.id
    });
    
    // Se o usuário foi removido (logout), reseta o redirecionamento
    if (!user && hasRedirected) {
      console.log('👋 [Index] Usuário foi deslogado, resetando hasRedirected');
      setHasRedirected(false);
    }
    
    // Se um usuário foi logado e não havia redirecionado ainda
    if (user && !hasRedirected) {
      console.log('👤 [Index] Novo usuário detectado, permitindo redirecionamento');
      // O useEffect principal vai cuidar do redirecionamento
    }
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