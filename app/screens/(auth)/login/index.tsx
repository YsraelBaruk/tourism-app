// app/login.tsx
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from '@/app/screens/(auth)/login/styles';

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        />

        {/* Campo de senha */}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="********"
          style={styles.input}
          secureTextEntry
        />

        {/* Container para o link "Esqueci a senha" alinhado à direita */}
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => alert("Redirecionar para recuperação de senha")}>
            <Text style={styles.forgotPassword}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de login */}
        <TouchableOpacity style={styles.button} onPress={() => alert("Fazer login")}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Texto de registro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push("/screens/(auth)/(register)/choseOption")} >
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