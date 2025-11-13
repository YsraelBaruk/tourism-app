// app/login.tsx
import { supabase } from "@/supabase";
import { logger } from "@/utils/logger";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from '@/app/screens/(auth)/login/styles';

export default function Login() {
  const router = useRouter();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Função de login
  const handleLogin = async () => {
    if (!email || !password) {
      logger.log('LOGIN_VALIDATION_ERROR', 'warn', {
        email,
        error: 'Campos obrigatórios não preenchidos',
      });
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Log da tentativa de login
    logger.log('LOGIN_ATTEMPT', 'info', {
      email,
      event_description: 'Usuário tentando fazer login',
    });

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) {
      logger.log('LOGIN_ERROR', 'error', {
        email,
        error: `Login failed: ${error.message}`,
        event_description: 'Erro durante tentativa de login',
      });
      Alert.alert("Erro no login", error.message);
    } else {
      // Login bem-sucedido!
      logger.logUserLogin({
        userId: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        role: data.user?.user_metadata?.role,
      });
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("/home");
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* Logo ou imagem do Sentai */}
        <Image
          source={{ uri: "https://via.placeholder.com/100x100?text=Sentai" }}
          style={styles.logo}
          resizeMode="contain"
        />


        {/* Campo de e-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="name@example.com"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo de senha */}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="********"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Container para o link "Esqueci a senha" alinhado à direita */}
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => alert("Redirecionar para recuperação de senha")}>
            <Text style={styles.forgotPassword}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de login */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
        </TouchableOpacity>

        {/* Texto de registro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push("/register")} >
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>

        {/* Divisor "OU" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Botão de login com Google */}
        <TouchableOpacity style={styles.googleButton} onPress={() => alert("Login com Google")}>
          <View style={styles.googleButtonContent}>
            <Image
              source={{ uri: "https://developers.google.com/identity/images/g-logo.png" }}
              style={styles.googleLogo}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Continuar com Google</Text>
          </View>
        </TouchableOpacity>

        {/* Texto "Retogener serba" (provavelmente uma marca ou slogan) */}
      </View>
    </ScrollView>
  );
}