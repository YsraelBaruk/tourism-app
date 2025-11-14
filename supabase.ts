import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

// Prefer process.env (build-time) and fall back to expo constants extra (runtime)
const env = (process.env as Record<string, string | undefined>) || {}
const SUPABASE_URL =
  env.EXPO_PUBLIC_SUPABASE_URL ||
  (Constants.manifest as any)?.extra?.EXPO_PUBLIC_SUPABASE_URL ||
  (Constants.expoConfig as any)?.extra?.EXPO_PUBLIC_SUPABASE_URL

const SUPABASE_ANON_KEY =
  env.EXPO_PUBLIC_SUPABASE_KEY ||
  (Constants.manifest as any)?.extra?.EXPO_PUBLIC_SUPABASE_KEY ||
  (Constants.expoConfig as any)?.extra?.EXPO_PUBLIC_SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail fast with clear message to help debugging environment wiring
  throw new Error(
    'Supabase environment variables not found. Make sure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY are defined in your .env or in expo config extra.'
  )
}

// Adapter que funciona tanto no mobile quanto no web com logs para debug
const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    try {
      let value = null;
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        // No web, use localStorage como fallback
        value = localStorage.getItem(key);
        console.log('🔍 [Supabase] getItem (web):', { key, hasValue: !!value });
      } else if (Platform.OS !== 'web') {
        value = await SecureStore.getItemAsync(key);
        console.log('🔍 [Supabase] getItem (mobile):', { key, hasValue: !!value });
      }
      return value;
    } catch (error) {
      console.warn('⚠️ [Supabase] Erro no getItem:', { key, error });
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        console.log('💾 [Supabase] setItem (web):', { key, valueLength: value?.length });
      } else if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync(key, value);
        console.log('💾 [Supabase] setItem (mobile):', { key, valueLength: value?.length });
      }
    } catch (error) {
      console.warn('⚠️ [Supabase] Erro no setItem:', { key, error });
    }
  },
  removeItem: async (key: string) => {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        console.log('🗑️ [Supabase] removeItem (web):', { key });
      } else if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(key);
        console.log('🗑️ [Supabase] removeItem (mobile):', { key });
      }
    } catch (error) {
      console.warn('⚠️ [Supabase] Erro no removeItem:', { key, error });
    }
  },
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // Garante que o logout seja mais efetivo
    flowType: 'pkce',
    // Debug habilitado para investigar problemas
    debug: __DEV__,
  },
})

// Log da inicialização para debug
console.log('🚀 [Supabase] Cliente inicializado:', {
  url: SUPABASE_URL,
  platform: Platform.OS,
  hasKey: !!SUPABASE_ANON_KEY,
  isDev: __DEV__
});
