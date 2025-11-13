-- Trigger para criar automaticamente um usuário na tabela public.users
-- quando um novo usuário é criado na tabela auth.users

-- Primeiro, vamos criar a função que será chamada pelo trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insere um novo usuário na tabela public.users com os dados do auth.users
  INSERT INTO public.users (
    id,
    name,
    email,
    role,
    cpf,
    telefone,
    profile_image_url,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'usuario_comum'),
    NEW.raw_user_meta_data->>'cpf',
    NEW.raw_user_meta_data->>'telefone',
    NULL, -- profile_image_url será definida posteriormente
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Agora criamos o trigger que executa a função sempre que um novo usuário é inserido em auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Opcional: Trigger para atualizar a tabela public.users quando auth.users for atualizado
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
  -- Atualiza os dados na tabela public.users quando auth.users for atualizado
  UPDATE public.users 
  SET 
    name = COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    email = NEW.email,
    role = COALESCE(NEW.raw_user_meta_data->>'role', OLD.raw_user_meta_data->>'role', 'usuario_comum'),
    cpf = COALESCE(NEW.raw_user_meta_data->>'cpf', OLD.raw_user_meta_data->>'cpf'),
    telefone = COALESCE(NEW.raw_user_meta_data->>'telefone', OLD.raw_user_meta_data->>'telefone'),
    updated_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();