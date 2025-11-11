import { supabase } from "@/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from './styles';

function ClientRegister() {
  const router = useRouter();
  const { role } = useLocalSearchParams(); // Captura o role da rota

  // Estados dos inputs
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); // Campo de senha
  const [confirmarSenha, setConfirmarSenha] = useState(""); // Campo de confirmação

  const handleSignUp = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }
    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // 1. Tenta cadastrar o usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: {
          // Estes dados vão para 'raw_user_meta_data'
          // O gatilho da Fase 2 usará isso
          name: nome,
          role: role, // 'usuario_comum'
          // Você pode adicionar cpf e telefone aqui também se quiser
          cpf: cpf,
          telefone: telefone,
        }
      }
    });

    if (authError) {
      Alert.alert("Erro no cadastro", authError.message);
      return;
    }

    if (!authData.session) {
       Alert.alert("Cadastro realizado", "Verifique seu e-mail para confirmar a conta!");
       router.push("/login"); // Volta para o login
       return;
    }
    
    // Se o usuário for logado automaticamente (ex: email de confirmação desabilitado)
    Alert.alert("Sucesso", "Conta criada e login efetuado!");
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#3258A6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Conta</Text>
      </View>

      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campos de senha */}
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        {/* Botão Próximo */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ClientRegister;