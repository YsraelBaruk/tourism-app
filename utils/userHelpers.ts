/**
 * Exemplo de como usar supabase.from('users').insert()
 * Para inserir dados na tabela users do Supabase
 */

import { supabase } from '@/supabase';

// Função para verificar se email já existe
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Erro ao verificar email:', error);
      throw error;
    }

    return !!data; // Retorna true se encontrou um usuário, false caso contrário
  } catch (error) {
    console.error('Erro inesperado ao verificar email:', error);
    throw error;
  }
};

// Exemplo 1: Insert simples de um usuário (com verificação de email)
export const insertUser = async (userData: {
  id: string;
  name: string;
  email: string;
  role: string;
  cpf?: string;
  telefone?: string;
}) => {
  try {
    // Verifica se o email já existe
    const emailExists = await checkEmailExists(userData.email);
    if (emailExists) {
      throw new Error('Email já está cadastrado no sistema');
    }

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          cpf: userData.cpf,
          telefone: userData.telefone,
        },
      ])
      .select(); // .select() retorna os dados inseridos

    if (error) {
      console.error('Erro ao inserir usuário:', error);
      throw error;
    }

    console.log('Usuário inserido com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro inesperado:', error);
    throw error;
  }
};

// Exemplo 2: Insert com múltiplos usuários (com verificação de emails)
export const insertMultipleUsers = async (users: Array<{
  id: string;
  name: string;
  email: string;
  role: string;
}>) => {
  try {
    // Verifica se algum email já existe
    for (const user of users) {
      const emailExists = await checkEmailExists(user.email);
      if (emailExists) {
        throw new Error(`Email ${user.email} já está cadastrado no sistema`);
      }
    }

    const { data, error } = await supabase
      .from('users')
      .insert(users)
      .select();

    if (error) {
      console.error('Erro ao inserir usuários:', error);
      throw error;
    }

    console.log('Usuários inseridos com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro inesperado:', error);
    throw error;
  }
};

// Exemplo 3: Insert com upsert (insert ou update se já existir)
export const upsertUser = async (userData: {
  id: string;
  name: string;
  email: string;
  role: string;
  cpf?: string;
  telefone?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          cpf: userData.cpf,
          telefone: userData.telefone,
        },
      ])
      .select();

    if (error) {
      console.error('Erro ao fazer upsert do usuário:', error);
      throw error;
    }

    console.log('Usuário upserted com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro inesperado:', error);
    throw error;
  }
};

// Exemplo 4: Insert com validação de dados (incluindo verificação de email)
export const insertUserWithValidation = async (userData: {
  id: string;
  name: string;
  email: string;
  role: string;
  cpf?: string;
  telefone?: string;
}) => {
  // Validações básicas
  if (!userData.id || !userData.name || !userData.email) {
    throw new Error('ID, nome e email são obrigatórios');
  }

  if (!userData.email.includes('@')) {
    throw new Error('Email inválido');
  }

  // Verifica se o email já existe
  const emailExists = await checkEmailExists(userData.email);
  if (emailExists) {
    throw new Error('Email já está cadastrado no sistema');
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) {
      // Tratamento de erros específicos
      if (error.code === '23505') { // Unique violation
        throw new Error('Email já está em uso por outro usuário');
      }
      throw new Error(`Erro ao inserir usuário: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};

// Exemplo 5: Como usar no processo de cadastro (com verificação de email)
export const createUserAfterAuth = async (authUserId: string, formData: {
  name: string;
  email: string;
  role: string;
  cpf?: string;
  telefone?: string;
}) => {
  try {
    console.log('🔄 Verificando se email já existe...');
    
    // Verifica se o email já existe
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      console.log('⚠️ Email já existe no banco de dados');
      throw new Error('Email já está cadastrado no sistema');
    }
    
    console.log('🔄 Inserindo usuário na tabela users...');
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: authUserId, // ID vem do Supabase Auth
          name: formData.name,
          email: formData.email,
          role: formData.role,
          cpf: formData.cpf,
          telefone: formData.telefone,
        },
      ])
      .select();

    if (error) {
      console.error('❌ Erro ao inserir na tabela users:', error);
      
      // Log detalhado do erro
      console.error('Detalhes do erro:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      
      throw error;
    }

    console.log('✅ Usuário inserido com sucesso na tabela users:', data);
    return data[0]; // Retorna o primeiro (e único) usuário inserido
    
  } catch (error) {
    console.error('💥 Erro inesperado ao criar usuário:', error);
    throw error;
  }
};

// Exemplo 6: Insert com campos opcionais (com verificação de email)
export const insertUserOptionalFields = async (requiredData: {
  id: string;
  name: string;
  email: string;
}, optionalData?: {
  role?: string;
  cpf?: string;
  telefone?: string;
  profile_image_url?: string;
}) => {
  // Verifica se o email já existe
  const emailExists = await checkEmailExists(requiredData.email);
  if (emailExists) {
    throw new Error('Email já está cadastrado no sistema');
  }

  const userData = {
    ...requiredData,
    role: optionalData?.role || 'usuario_comum',
    ...(optionalData?.cpf && { cpf: optionalData.cpf }),
    ...(optionalData?.telefone && { telefone: optionalData.telefone }),
    ...(optionalData?.profile_image_url && { profile_image_url: optionalData.profile_image_url }),
  };

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};

/*
COMO USAR NO SEU CÓDIGO:

// No arquivo registerClient/index.tsx, após o signUp bem-sucedido:

if (authData.user) {
  try {
    const userData = await createUserAfterAuth(authData.user.id, {
      name: nome,
      email: email,
      role: role as string,
      cpf: cpf,
      telefone: telefone,
    });
    
    console.log('Usuário criado na tabela users:', userData);
  } catch (error) {
    console.error('Erro ao criar usuário na tabela:', error);
    // Aqui você pode decidir se cancela o cadastro ou continua
  }
}
*/