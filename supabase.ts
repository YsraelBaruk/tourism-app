import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

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

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
