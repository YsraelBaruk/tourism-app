import { AuthProvider } from '@/app/context/AuthContext';
import { Slot } from 'expo-router';

// Layout principal simples - deixa o controle de navegação para os componentes individuais
export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}