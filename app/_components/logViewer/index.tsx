import { LogEntry, logger } from '@/utils/logger';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface LogViewerProps {
  visible: boolean;
  onClose: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ visible, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'registration' | 'login' | 'error'>('all');

  useEffect(() => {
    if (visible) {
      refreshLogs();
      // Atualizar logs a cada 2 segundos quando o modal estiver aberto
      const interval = setInterval(refreshLogs, 2000);
      return () => clearInterval(interval);
    }
  }, [visible, filter]);

  const refreshLogs = () => {
    let filteredLogs = logger.getLogs();
    
    switch (filter) {
      case 'registration':
        filteredLogs = filteredLogs.filter(log => 
          log.event.includes('REGISTRATION') || log.event === 'USER_REGISTRATION'
        );
        break;
      case 'login':
        filteredLogs = filteredLogs.filter(log => 
          log.event.includes('LOGIN')
        );
        break;
      case 'error':
        filteredLogs = filteredLogs.filter(log => 
          log.level === 'error'
        );
        break;
      default:
        break;
    }
    
    setLogs(filteredLogs.slice(0, 50)); // Últimos 50 logs
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getEventIcon = (event: string, level: string): string => {
    if (event.includes('REGISTRATION')) return '👤';
    if (event.includes('LOGIN')) return '🔑';
    if (level === 'error') return '❌';
    if (level === 'warn') return '⚠️';
    return '📝';
  };

  const getEventColor = (level: string): string => {
    switch (level) {
      case 'error': return '#FF6B6B';
      case 'warn': return '#FFD93D';
      case 'info': return '#4ECDC4';
      case 'debug': return '#95A5A6';
      default: return '#34495E';
    }
  };

  const FilterButton: React.FC<{ 
    filterType: typeof filter, 
    label: string, 
    count: number 
  }> = ({ filterType, label, count }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: filter === filterType ? '#4A90E2' : '#E8F0FE',
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => setFilter(filterType)}
    >
      <Text style={{
        color: filter === filterType ? '#fff' : '#4A90E2',
        fontWeight: '600',
        fontSize: 12,
      }}>
        {label}
      </Text>
      {count > 0 && (
        <View style={{
          backgroundColor: filter === filterType ? 'rgba(255,255,255,0.3)' : '#4A90E2',
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 10,
          marginLeft: 6,
        }}>
          <Text style={{
            color: filter === filterType ? '#fff' : '#fff',
            fontSize: 10,
            fontWeight: 'bold',
          }}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const allLogs = logger.getLogs();
  const registrationCount = allLogs.filter(log => 
    log.event.includes('REGISTRATION') || log.event === 'USER_REGISTRATION'
  ).length;
  const loginCount = allLogs.filter(log => log.event.includes('LOGIN')).length;
  const errorCount = allLogs.filter(log => log.level === 'error').length;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#E8F0FE',
        }}>
          <TouchableOpacity onPress={onClose} style={{ marginRight: 15 }}>
            <Ionicons name="close" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2C3E50',
            flex: 1,
          }}>
            Logs do Sistema
          </Text>
          <TouchableOpacity onPress={refreshLogs}>
            <Ionicons name="refresh" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#E8F0FE',
        }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FilterButton filterType="all" label="Todos" count={allLogs.length} />
            <FilterButton filterType="registration" label="Cadastros" count={registrationCount} />
            <FilterButton filterType="login" label="Logins" count={loginCount} />
            <FilterButton filterType="error" label="Erros" count={errorCount} />
          </ScrollView>
        </View>

        {/* Lista de Logs */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 15 }}>
          {logs.length === 0 ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 50,
            }}>
              <Text style={{ color: '#95A5A6', fontSize: 16 }}>
                Nenhum log encontrado
              </Text>
            </View>
          ) : (
            logs.map((log) => (
              <View
                key={log.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 15,
                  marginBottom: 10,
                  borderLeftWidth: 4,
                  borderLeftColor: getEventColor(log.level),
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <Text style={{ fontSize: 16, marginRight: 8 }}>
                    {getEventIcon(log.event, log.level)}
                  </Text>
                  <Text style={{
                    fontWeight: 'bold',
                    color: '#2C3E50',
                    flex: 1,
                    fontSize: 14,
                  }}>
                    {log.event.replace(/_/g, ' ')}
                  </Text>
                  <Text style={{
                    color: '#95A5A6',
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                    {formatTimestamp(log.timestamp)}
                  </Text>
                </View>
                
                {log.data.email && (
                  <Text style={{
                    color: '#4A90E2',
                    fontSize: 13,
                    marginBottom: 4,
                  }}>
                    📧 {log.data.email}
                  </Text>
                )}
                
                {log.data.name && (
                  <Text style={{
                    color: '#27AE60',
                    fontSize: 13,
                    marginBottom: 4,
                  }}>
                    👤 {log.data.name}
                  </Text>
                )}
                
                {log.data.role && (
                  <Text style={{
                    color: '#8E44AD',
                    fontSize: 13,
                    marginBottom: 4,
                  }}>
                    🎭 {log.data.role}
                  </Text>
                )}
                
                {log.data.error && (
                  <Text style={{
                    color: '#E74C3C',
                    fontSize: 12,
                    fontStyle: 'italic',
                    marginTop: 5,
                    padding: 8,
                    backgroundColor: '#FADBD8',
                    borderRadius: 6,
                  }}>
                    ⚠️ {log.data.error}
                  </Text>
                )}

                {log.data.event_description && (
                  <Text style={{
                    color: '#7F8C8D',
                    fontSize: 12,
                    marginTop: 4,
                    fontStyle: 'italic',
                  }}>
                    {log.data.event_description}
                  </Text>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default LogViewer;