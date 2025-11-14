# Configuração da Tabela de Usuários e Triggers no Supabase

Este diretório contém os scripts SQL necessários para configurar automaticamente a criação de usuários na tabela `public.users` quando eles se cadastrarem via Supabase Auth.

## 📋 Pré-requisitos

- Acesso ao Dashboard do Supabase
- Permissões de administrador no projeto

## 🚀 Passos para Configuração

### 1. Criar a Tabela `public.users`

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Vá para **SQL Editor**
3. Execute o script `database/tables/create_users_table.sql`

### 2. Criar os Triggers

1. No mesmo **SQL Editor**
2. Execute o script `database/triggers/create_user_trigger.sql`

### 3. Verificar a Configuração

Após executar os scripts, você pode testar:

1. Cadastre um novo usuário pelo app
2. Verifique na aba **Table Editor** > **users** se o usuário foi criado automaticamente

## 📊 Estrutura da Tabela `public.users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Chave primária, referencia `auth.users(id)` |
| `name` | VARCHAR(255) | Nome completo do usuário |
| `email` | VARCHAR(255) | Email do usuário |
| `role` | VARCHAR(50) | Tipo de usuário (`usuario_comum`, `colaborador_privado`) |
| `cpf` | VARCHAR(14) | CPF do usuário |
| `telefone` | VARCHAR(20) | Telefone do usuário |
| `profile_image_url` | TEXT | URL da imagem de perfil (opcional) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## ⚡ Como Funciona o Trigger

1. **Cadastro**: Usuário preenche o formulário no app
2. **Auth**: Dados são enviados para `supabase.auth.signUp()` com `raw_user_meta_data`
3. **Trigger**: Automaticamente executa quando um novo registro é inserido em `auth.users`
4. **Criação**: Usuário é criado na tabela `public.users` com todos os dados

## 🐛 Troubleshooting

### Erro de Permissão
Se der erro de permissão, verifique se você está executando os scripts como administrador do projeto.

### Trigger não Funciona
1. Verifique se a função `handle_new_user()` foi criada
2. Confirme se o trigger `on_auth_user_created` está ativo
3. Veja os logs no Dashboard do Supabase

### Dados não Aparecem
1. Verifique se os dados estão sendo enviados no `raw_user_meta_data`
2. Confirme se a estrutura da tabela está correta
3. Teste com um novo cadastro

## 📝 Notas Importantes

- ✅ O trigger funciona automaticamente após a configuração
- ✅ Não é necessário alterar o código da aplicação
- ✅ Funciona tanto para confirmação de email habilitada quanto desabilitada
- ✅ Inclui trigger de atualização para sincronizar mudanças