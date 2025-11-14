import { supabase } from "@/supabase";
import { logger } from "@/utils/logger";
import { createUserWithSchemaDiscovery } from "@/utils/userHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    // Log da tentativa de cadastro
    logger.logRegistrationAttempt({
      email,
      name: nome,
      role: role as string,
      cpf,
      telefone,
    });
    
    if (!nome || !email || !senha || !confirmarSenha) {
      logger.logRegistrationError({
        email,
        name: nome,
        role: role as string,
        error: "Campos obrigatórios não preenchidos",
      });
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      logger.logRegistrationError({
        email,
        name: nome,
        role: role as string,
        error: "Senhas não conferem",
      });
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }
    if (senha.length < 6) {
      logger.logRegistrationError({
        email,
        name: nome,
        role: role as string,
        error: "Senha muito curta (menos de 6 caracteres)",
      });
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    
    try {
      // 1. Tenta cadastrar o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
          data: {
            // Estes dados vão para 'raw_user_meta_data'
            name: nome,
            role: role, // 'usuario_comum'
            cpf: cpf,
            telefone: telefone,
          }
        }
      });

      console.log("Resposta do Supabase Auth:", { authData, authError });

    if (authError) {
      logger.logRegistrationError({
        email,
        name: nome,
        role: role as string,
        cpf,
        telefone,
        error: `Supabase Auth Error: ${authError.message}`,
      });
      Alert.alert("Erro no cadastro", authError.message);
      return;
    }

    // 2. Se o usuário foi criado com sucesso no Auth, inserir na tabela users
    if (authData.user) {
      try {
        console.log('🔄 [RegisterClient] Criando usuário na tabela users com função robusta...');
        
        const userData = await createUserWithSchemaDiscovery(authData.user.id, {
          name: nome,
          email: email,
          role: role as string,
          cpf: cpf,
          telefone: telefone,
        });
        
        console.log('✅ [RegisterClient] Usuário criado na tabela users:', userData);
        
      } catch (userError) {
        console.error('❌ [RegisterClient] Erro ao criar usuário na tabela users:', userError);
        
        logger.logRegistrationError({
          email,
          name: nome,
          role: role as string,
          cpf,
          telefone,
          userId: authData.user.id,
          error: `Erro ao inserir na tabela users: ${userError}`,
        });
        
        // Tenta salvar pelo menos os dados básicos no user_metadata como fallback
        console.log('🔄 [RegisterClient] Salvando dados no user_metadata como fallback...');
        try {
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              name: nome,
              role: role as string,
              cpf: cpf,
              telefone: telefone,
              profile_incomplete: true,
              error_on_table_insert: true
            }
          });
          
          if (updateError) {
            console.warn('⚠️ [RegisterClient] Também falhou ao atualizar metadata:', updateError);
          } else {
            console.log('✅ [RegisterClient] Dados salvos no user_metadata como fallback');
          }
        } catch (metaError) {
          console.warn('⚠️ [RegisterClient] Erro ao salvar no metadata:', metaError);
        }
        
        // Não retorna aqui pois o usuário já foi criado no Auth
      }
    }

    // Log de cadastro bem-sucedido
    console.log('✅ [RegisterClient] Processo de cadastro concluído');
    logger.logUserRegistration({
      userId: authData.user?.id,
      email,
      name: nome,
      role: role as string,
      cpf,
      telefone,
    });

    if (!authData.session) {
       Alert.alert("Cadastro realizado", "Verifique seu e-mail para confirmar a conta!");
       router.push("/screens/(auth)/login"); // Volta para o login
       return;
    }
    
      // Se o usuário for logado automaticamente (ex: email de confirmação desabilitado)
      Alert.alert("Sucesso", "Conta criada e login efetuado!");
      router.replace("/screens/(client)/home");
    } catch (error) {
      logger.logRegistrationError({
        email,
        name: nome,
        role: role as string,
        cpf,
        telefone,
        error: `Erro inesperado: ${error}`,
      });
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  return (
    <ScrollView style={styles.container}>
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
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ClientRegister;