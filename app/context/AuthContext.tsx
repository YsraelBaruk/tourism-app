import { supabase } from '@/supabase';
import { logger } from '@/utils/logger';
import { Session, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    try {
      console.log('🔄 [AuthContext] Iniciando signOut...');
      console.log('📊 [AuthContext] Estado atual antes do logout:', {
        hasUser: !!user,
        userId: user?.id,
        hasSession: !!session,
        loading
      });
      
      const currentUser = user;
      const currentSession = session;
      
      // Log da tentativa de logout
      logger.log('LOGOUT_ATTEMPT', 'info', {
        userId: currentUser?.id,
        email: currentUser?.email,
        event_description: 'Usuário iniciando processo de logout',
      });

      console.log('🔄 [AuthContext] Limpando estado local...');
      
      // Limpa o estado local IMEDIATAMENTE
      setUser(null);
      setSession(null);
      setLoading(false);

      console.log('✅ [AuthContext] Estado local limpo:', {
        user: null,
        session: null,
        loading: false
      });

      console.log('🔄 [AuthContext] Chamando supabase.auth.signOut()...');
      
      // Executa logout no Supabase (múltiplas estratégias)
      let signOutSuccess = false;
      
      try {
        // Estratégia 1: SignOut normal
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.warn('⚠️ [AuthContext] Erro no signOut normal:', error);
          throw error;
        }
        console.log('✅ [AuthContext] Supabase signOut executado com sucesso');
        signOutSuccess = true;
      } catch (supabaseError) {
        console.warn('⚠️ [AuthContext] Erro no signOut normal, tentando scope global:', supabaseError);
        
        try {
          // Estratégia 2: SignOut com scope global
          const { error } = await supabase.auth.signOut({ scope: 'global' });
          if (error) {
            console.warn('⚠️ [AuthContext] Erro no signOut global:', error);
            throw error;
          }
          console.log('✅ [AuthContext] Supabase signOut global executado com sucesso');
          signOutSuccess = true;
        } catch (globalError) {
          console.warn('⚠️ [AuthContext] Erro no signOut global, limpando manualmente:', globalError);
          
          // Estratégia 3: Limpeza manual do storage
          try {
            if (typeof window !== 'undefined' && window.localStorage) {
              // Web
              const keys = Object.keys(localStorage);
              console.log('🔍 [AuthContext] Chaves do localStorage antes da limpeza:', keys.filter(k => k.startsWith('sb-')));
              
              Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sb-')) {
                  localStorage.removeItem(key);
                  console.log('🧹 [AuthContext] Removida chave do localStorage:', key);
                }
              });
            } else {
              // Mobile - força limpeza do SecureStore
              console.log('📱 [AuthContext] Limpando storage mobile...');
              const { Platform } = require('react-native');
              if (Platform.OS !== 'web') {
                const SecureStore = require('expo-secure-store');
                try {
                  await SecureStore.deleteItemAsync('supabase.auth.token');
                  console.log('🧹 [AuthContext] Token removido do SecureStore');
                } catch (secureStoreError) {
                  console.warn('⚠️ [AuthContext] Erro ao remover do SecureStore:', secureStoreError);
                }
              }
            }
            console.log('🧹 [AuthContext] Storage limpo manualmente');
            signOutSuccess = true;
          } catch (storageError) {
            console.warn('⚠️ [AuthContext] Erro na limpeza manual:', storageError);
          }
        }
      }

      // Força verificação do estado após logout
      setTimeout(async () => {
        console.log('🔍 [AuthContext] Verificando estado após logout...');
        try {
          const { data: { session: currentSessionCheck } } = await supabase.auth.getSession();
          console.log('📊 [AuthContext] Estado da sessão após logout:', {
            hasSession: !!currentSessionCheck,
            sessionId: currentSessionCheck?.user?.id
          });
          
          if (currentSessionCheck) {
            console.warn('⚠️ [AuthContext] Sessão ainda existe após logout! Forçando limpeza...');
            setUser(null);
            setSession(null);
          }
        } catch (checkError) {
          console.warn('⚠️ [AuthContext] Erro ao verificar sessão após logout:', checkError);
        }
      }, 100);

      console.log('✅ [AuthContext] SignOut concluído:', { success: signOutSuccess });
      
      // Log de logout bem-sucedido
      logger.log('LOGOUT_SUCCESS', 'info', {
        userId: currentUser?.id,
        email: currentUser?.email,
        success: signOutSuccess,
        event_description: 'Logout realizado com sucesso',
      });

    } catch (error) {
      console.error('❌ [AuthContext] Erro inesperado no signOut:', error);
      logger.log('LOGOUT_ERROR', 'error', {
        userId: user?.id,
        email: user?.email,
        error: `Erro inesperado no logout: ${error}`,
      });
      
      // Garante que o estado local seja limpo SEMPRE
      setUser(null);
      setSession(null);
      setLoading(false);
      
      console.log('🔄 [AuthContext] Estado forçadamente limpo após erro');
    }
  };

  useEffect(() => {
    // Pega a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuta mudanças no estado de autenticação (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 [AuthContext] AuthStateChange:', {
          event,
          hasSession: !!session,
          userId: session?.user?.id,
          email: session?.user?.email,
          timestamp: new Date().toISOString()
        });
        
        logger.log('AUTH_STATE_CHANGE', 'info', {
          event,
          userId: session?.user?.id,
          email: session?.user?.email,
          event_description: `Estado de autenticação mudou: ${event}`,
        });

        // Atualiza o estado
        const previousUser = user;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Log específico para eventos de logout
        if (event === 'SIGNED_OUT' || (!session && previousUser)) {
          console.log('👋 [AuthContext] Usuário foi deslogado:', {
            previousUserId: previousUser?.id,
            event,
            reason: event === 'SIGNED_OUT' ? 'Evento SIGNED_OUT' : 'Sessão removida'
          });
        }
        
        // Log específico para eventos de login
        if (event === 'SIGNED_IN' || (session && !previousUser)) {
          console.log('👤 [AuthContext] Usuário foi logado:', {
            userId: session?.user?.id,
            email: session?.user?.email,
            event
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export default para compatibilidade com Expo Router
export default AuthProvider;