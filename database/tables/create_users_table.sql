-- Criação da tabela public.users
-- Execute este script no SQL Editor do Supabase Dashboard

CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'usuario_comum',
  cpf VARCHAR(14), -- Format: 000.000.000-00
  telefone VARCHAR(20),
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- RLS (Row Level Security) - permite que usuários vejam apenas seus próprios dados
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam apenas seus próprios dados
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Política para permitir que usuários atualizem apenas seus próprios dados
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Política para permitir inserção (será usada pelo trigger)
CREATE POLICY "Enable insert for service role" ON public.users
  FOR INSERT WITH CHECK (true);

-- Comentários para documentação
COMMENT ON TABLE public.users IS 'Tabela de usuários da aplicação com dados complementares ao auth.users';
COMMENT ON COLUMN public.users.id IS 'UUID do usuário, referencia auth.users(id)';
COMMENT ON COLUMN public.users.name IS 'Nome completo do usuário';
COMMENT ON COLUMN public.users.email IS 'Email do usuário (sincronizado com auth.users)';
COMMENT ON COLUMN public.users.role IS 'Tipo de usuário: usuario_comum, colaborador_privado, etc.';
COMMENT ON COLUMN public.users.cpf IS 'CPF do usuário (formato: 000.000.000-00)';
COMMENT ON COLUMN public.users.telefone IS 'Telefone do usuário';
COMMENT ON COLUMN public.users.profile_image_url IS 'URL da imagem de perfil do usuário';