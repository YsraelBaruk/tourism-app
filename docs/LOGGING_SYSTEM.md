# Sistema de Logging - Tourism App

## 📋 Visão Geral

O sistema de logging foi implementado para registrar todas as ações importantes dos usuários, especialmente cadastros e logins. Isso permite monitoramento em tempo real e debugging eficiente.

## 🚀 Funcionalidades

### ✅ Logs Implementados

1. **Cadastro de Usuários**
   - ✅ Tentativa de cadastro (`REGISTRATION_ATTEMPT`)
   - ✅ Cadastro bem-sucedido (`USER_REGISTRATION`)
   - ✅ Erros de validação (`REGISTRATION_ERROR`)
   - ✅ Erros do Supabase (`REGISTRATION_ERROR`)

2. **Login de Usuários**
   - ✅ Tentativa de login (`LOGIN_ATTEMPT`)
   - ✅ Login bem-sucedido (`USER_LOGIN`)
   - ✅ Erros de login (`LOGIN_ERROR`)
   - ✅ Validações (`LOGIN_VALIDATION_ERROR`)

3. **Sistema de Níveis**
   - 🟢 `info` - Informações gerais
   - 🟡 `warn` - Avisos
   - 🔴 `error` - Erros
   - ⚪ `debug` - Debugging

## 📱 Visualizador de Logs

### Acesso
- **Durante desenvolvimento**: Botão de analytics no header home (apenas em `__DEV__`)
- **Filtros disponíveis**: Todos, Cadastros, Logins, Erros
- **Atualização**: Tempo real (a cada 2 segundos)

### Informações Exibidas
- ⏰ Timestamp
- 👤 Nome do usuário
- 📧 Email
- 🎭 Tipo de usuário (role)
- ⚠️ Erros (quando aplicável)
- 📝 Descrição do evento

## 🛠️ Como Usar

### Exemplo Básico
```typescript
import { logger } from '@/utils/logger';

// Log de cadastro
logger.logUserRegistration({
  userId: 'user123',
  email: 'user@example.com',
  name: 'João Silva',
  role: 'usuario_comum',
});

// Log de login
logger.logUserLogin({
  userId: 'user123',
  email: 'user@example.com',
});

// Log personalizado
logger.log('CUSTOM_EVENT', 'info', {
  customData: 'valor',
  event_description: 'Descrição do evento',
});
```

### Exemplo de Erro
```typescript
logger.logRegistrationError({
  email: 'user@example.com',
  name: 'João Silva',
  role: 'usuario_comum',
  error: 'Email já existe no sistema',
});
```

## 📊 Dados Coletados

### Cadastros
- ID do usuário
- Email
- Nome
- Tipo de conta (role)
- CPF (quando fornecido)
- Telefone (quando fornecido)
- Timestamp
- Erros (quando aplicável)

### Logins
- ID do usuário
- Email
- Nome (do metadata)
- Timestamp
- Erros (quando aplicável)

## 🔧 Configurações

### Limites
- **Logs em memória**: 1000 (configurável)
- **Logs exibidos**: 50 mais recentes
- **Limpeza automática**: 7 dias (configurável)

### Integrações Futuras
O sistema está preparado para integrar com:
- 📊 Firebase Analytics
- 🐛 Sentry (monitoramento de erros)
- 📱 Crashlytics
- 💾 AsyncStorage (persistência local)

## 🎯 Benefícios

1. **Monitoramento em Tempo Real**
   - Visualização imediata de cadastros
   - Detecção rápida de problemas
   - Estatísticas de uso

2. **Debugging Eficiente**
   - Histórico completo de ações
   - Rastreamento de erros
   - Análise de fluxos de usuário

3. **Métricas de Negócio**
   - Taxa de conversão de cadastros
   - Tipos de usuários mais comuns
   - Principais pontos de falha

## 🔒 Privacidade

- **Senhas**: NUNCA são logadas
- **Dados sensíveis**: Apenas metadados são coletados
- **Retenção**: Configurável (padrão: 7 dias)
- **Acesso**: Apenas em modo desenvolvimento

## 📝 Exemplos de Logs

### Cadastro Bem-sucedido
```
🟢 [REGISTRO] Novo usuário cadastrado:
  userId: "auth_user_123"
  email: "joao@example.com"
  name: "João Silva"
  role: "usuario_comum"
  timestamp: "2025-11-13T15:30:00.000Z"
```

### Erro de Cadastro
```
🔴 [ERRO] Erro no cadastro:
  email: "joao@example.com"
  error: "Email já existe no sistema"
  timestamp: "2025-11-13T15:30:00.000Z"
```

### Login
```
🟡 [LOGIN] Usuário logou:
  userId: "auth_user_123"
  email: "joao@example.com"
  timestamp: "2025-11-13T15:30:00.000Z"
```

## 🚀 Próximos Passos

1. [ ] Integração com Analytics
2. [ ] Dashboard de métricas
3. [ ] Alertas por email
4. [ ] Exportação de relatórios
5. [ ] Integração com sistemas de monitoramento

---

✨ **Sistema implementado e funcionando!** ✨