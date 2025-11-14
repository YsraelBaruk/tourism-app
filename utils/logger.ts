interface LogData {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  cpf?: string;
  telefone?: string;
  timestamp?: string;
  deviceInfo?: any;
  location?: string;
  [key: string]: any;
}

interface LogEntry {
  id: string;
  event: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  data: LogData;
  timestamp: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Máximo de logs em memória

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private createLogEntry(
    event: string, 
    level: 'info' | 'warn' | 'error' | 'debug', 
    data: LogData
  ): LogEntry {
    const logEntry: LogEntry = {
      id: this.generateId(),
      event,
      level,
      data: {
        ...data,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };

    // Adiciona à lista de logs em memória
    this.logs.unshift(logEntry);
    
    // Mantém apenas os logs mais recentes
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    return logEntry;
  }

  // Método para log de cadastro de usuário
  logUserRegistration(data: LogData): void {
    const logEntry = this.createLogEntry('USER_REGISTRATION', 'info', {
      ...data,
      event_description: 'Novo usuário registrado no sistema',
    });

    console.log('🟢 [REGISTRO] Novo usuário cadastrado:', {
      event: logEntry.event,
      userId: data.userId,
      email: data.email,
      name: data.name,
      role: data.role,
      timestamp: logEntry.timestamp,
    });

    // Aqui você pode adicionar integração com serviços externos
    this.sendToAnalytics(logEntry);
    this.saveToStorage(logEntry);
  }

  // Método para log de tentativa de cadastro
  logRegistrationAttempt(data: LogData): void {
    const logEntry = this.createLogEntry('REGISTRATION_ATTEMPT', 'info', {
      ...data,
      event_description: 'Tentativa de registro iniciada',
    });

    console.log('🔵 [TENTATIVA] Tentativa de cadastro:', {
      event: logEntry.event,
      email: data.email,
      role: data.role,
      timestamp: logEntry.timestamp,
    });
  }

  // Método para log de erro no cadastro
  logRegistrationError(data: LogData & { error: string }): void {
    const logEntry = this.createLogEntry('REGISTRATION_ERROR', 'error', {
      ...data,
      event_description: 'Erro durante o processo de cadastro',
    });

    console.log('🔴 [ERRO] Erro no cadastro:', {
      event: logEntry.event,
      email: data.email,
      error: data.error,
      timestamp: logEntry.timestamp,
    });

    // Para erros, você pode querer notificar sistemas de monitoramento
    this.sendErrorAlert(logEntry);
  }

  // Método para log de login
  logUserLogin(data: LogData): void {
    const logEntry = this.createLogEntry('USER_LOGIN', 'info', {
      ...data,
      event_description: 'Usuário fez login no sistema',
    });

    console.log('🟡 [LOGIN] Usuário logou:', {
      event: logEntry.event,
      userId: data.userId,
      email: data.email,
      timestamp: logEntry.timestamp,
    });
  }

  // Método genérico para logs personalizados
  log(event: string, level: 'info' | 'warn' | 'error' | 'debug', data: LogData): void {
    const logEntry = this.createLogEntry(event, level, data);
    
    const emoji = {
      info: '🔵',
      warn: '🟡',
      error: '🔴',
      debug: '⚪'
    }[level];

    console.log(`${emoji} [${event}]`, {
      event: logEntry.event,
      level,
      data,
      timestamp: logEntry.timestamp,
    });
  }

  // Método para obter logs
  getLogs(limit?: number): LogEntry[] {
    return limit ? this.logs.slice(0, limit) : this.logs;
  }

  // Método para filtrar logs por evento
  getLogsByEvent(event: string): LogEntry[] {
    return this.logs.filter(log => log.event === event);
  }

  // Método para filtrar logs por nível
  getLogsByLevel(level: 'info' | 'warn' | 'error' | 'debug'): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  // Método privado para salvar no AsyncStorage (opcional)
  private async saveToStorage(logEntry: LogEntry): Promise<void> {
    try {
      // Implementar salvamento local se necessário
      // const AsyncStorage = require('@react-native-async-storage/async-storage');
      // await AsyncStorage.setItem(`log_${logEntry.id}`, JSON.stringify(logEntry));
    } catch (error) {
      console.warn('Erro ao salvar log no storage:', error);
    }
  }

  // Método privado para enviar para analytics (opcional)
  private sendToAnalytics(logEntry: LogEntry): void {
    try {
      // Aqui você pode integrar com Firebase Analytics, Mixpanel, etc.
      // analytics().logEvent(logEntry.event, logEntry.data);
    } catch (error) {
      console.warn('Erro ao enviar para analytics:', error);
    }
  }

  // Método privado para alertas de erro (opcional)
  private sendErrorAlert(logEntry: LogEntry): void {
    try {
      // Aqui você pode integrar com Sentry, Bugsnag, etc.
      // crashlytics().recordError(new Error(logEntry.data.error));
    } catch (error) {
      console.warn('Erro ao enviar alerta:', error);
    }
  }

  // Método para limpar logs antigos
  clearOldLogs(daysToKeep: number = 7): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    this.logs = this.logs.filter(log => 
      new Date(log.timestamp) > cutoffDate
    );

    console.log(`🧹 Logs antigos removidos. Mantendo logs dos últimos ${daysToKeep} dias.`);
  }
}

// Instância singleton do logger
export const logger = new Logger();

// Exports dos tipos para uso em outros arquivos
export type { LogData, LogEntry };
