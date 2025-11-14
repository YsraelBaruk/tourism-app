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
      // Log da tentativa de logout
      logger.log('LOGOUT_ATTEMPT', 'info', {
        userId: user?.id,
        email: user?.email,
        event_description: 'Usuário iniciando processo de logout',
      });

      // Executa logout no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logger.log('LOGOUT_ERROR', 'error', {
          userId: user?.id,
          email: user?.email,
          error: `Supabase logout error: ${error.message}`,
        });
        throw error;
      }

      // Limpa o estado local imediatamente
      setUser(null);
      setSession(null);

      // Log de logout bem-sucedido
      logger.log('LOGOUT_SUCCESS', 'info', {
        userId: user?.id,
        email: user?.email,
        event_description: 'Logout realizado com sucesso',
      });

    } catch (error) {
      logger.log('LOGOUT_ERROR', 'error', {
        userId: user?.id,
        email: user?.email,
        error: `Erro inesperado no logout: ${error}`,
      });
      console.error('Erro ao fazer logout:', error);
      throw error;
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
        logger.log('AUTH_STATE_CHANGE', 'info', {
          event,
          userId: session?.user?.id,
          email: session?.user?.email,
          event_description: `Estado de autenticação mudou: ${event}`,
        });

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
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