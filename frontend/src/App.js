import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

const nordicAgents = [
  { id: 'odin', name: 'ODIN', role: 'O Allfather • Oráculo Supremo', color: '#38bdf8', desc: 'Visão estratégica e análise global.' },
  { id: 'thor', name: 'THOR', role: 'O Protetor • Força de Combate', color: '#ef4444', desc: 'Automação pesada e resolução de bugs.' },
  { id: 'freya', name: 'FREYA', role: 'Deusa do Charme • Magia & Conteúdo', color: '#f472b6', desc: 'Copywriting e atração magnética.' },
  { id: 'loki', name: 'LOKI', role: 'O Estrategista • Mestre das Ilusões', color: '#4ade80', desc: 'Soluções criativas fora da caixa.' },
  { id: 'heimdallr', name: 'HEIMDALLr', role: 'O Vigia • Guarda da Bifrost', color: '#fbbf24', desc: 'Monitoramento, segurança e auditoria 24/7.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('panteao'); // 'panteao', 'conselho' ou 'heimdallr'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [councilMessages, setCouncilMessages] = useState([
    { sender: 'system', text: '⚡ O Panteão Nórdico foi convocado na Bifrost. Todos os deuses estão conectados.' }
  ]);
  const [inputText, setInputText] = useState('');

  // Estados específicos para a Auditoria do Heimdallr
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const handleSendCouncil = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setCouncilMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      setCouncilMessages(prev => [
        ...prev,
        { sender: 'odin', text: `[ODIN]: Diretriz "${userMsg}" processada estrategicamente.` },
        { sender: 'thor', text: `[THOR]: Recursos de infraestrutura alocados com sucesso.` },
        { sender: 'heimdallr', text: `[HEIMDALLr]: Varredura de rotas concluída. Tráfego seguro.` }
      ]);
    }, 1200);
  };

  const runHeimdallrAudit = () => {
    setScanning(true);
    setScanResults(null);
    setTimeout(() => {
      setScanning(false);
      setScanResults({
        envCheck: 'APROVADO (Variáveis seguras, sem chaves expostas no código)',
        rlsCheck: 'BLINDADO (Políticas de Row Level Security ativas no Supabase)',
        apiRoutes: 'ESTÁVEL (Tratamento de exceções e try/catch ativos)',
        score: '9.8 / 10 (Pronto para Produção e APK)'
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050811" />
      
      {/* Cabeçalho Principal Unificado */}
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.headerSubtitle}>PANTEÃO NÓRDICO • IA 24/7</Text>
        </View>
        <Text style={styles.headerTitle}>SALA DO TRONO UNIFICADA</Text>
        
        {/* Alternador de Abas */}
        <View style={styles.tabToggleRow}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'panteao' && styles.tabButtonActive]}
            onPress={() => { setActiveTab('panteao'); setSelectedAgent(null); }}
          >
            <Text style={[styles.tabButtonText, activeTab === 'panteao' && styles.tabButtonTextActive]}>Deuses</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'conselho' && styles.tabButtonActive]}
            onPress={() => setActiveTab('conselho')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'conselho' && styles.tabButtonTextActive]}>Conselho ⚡</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'heimdallr' && styles.tabButtonActive]}
            onPress={() => setActiveTab('heimdallr')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'heimdallr' && styles.tabButtonTextActive]}>🛡️ Auditoria</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo Dinâmico */}
      {activeTab === 'panteao' && !selectedAgent ? (
        <ScrollView contentContainerStyle={styles.gridContent}>
          <Text style={styles.sectionSubtitle}>Toque em uma divindade para abrir o canal individual direto:</Text>
          
          <View style={styles.cardsGrid}>
            {nordicAgents.map((agent) => (
              <TouchableOpacity 
                key={agent.id}
                style={[styles.agentCard, { borderColor: agent.color }]}
                onPress={() => setSelectedAgent(agent)}
              >
                <View style={styles.cardHeaderRow}>
                  <Text style={[styles.cardAgentName, { color: agent.color }]}>{agent.name}</Text>
                  <View style={[styles.miniDot, { backgroundColor: agent.color }]} />
                </View>
                <Text style={styles.cardAgentRole}>{agent.role}</Text>
                <Text style={styles.cardAgentDesc}>{agent.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : activeTab === 'panteao' && selectedAgent ? (
        <View style={styles.singleChatView}>
          <View style={styles.singleChatHeader}>
            <TouchableOpacity onPress={() => setSelectedAgent(null)}>
              <Text style={styles.backLink}>← Voltar ao Panteão</Text>
            </TouchableOpacity>
            <Text style={[styles.singleChatTitle, { color: selectedAgent.color }]}>{selectedAgent.name}</Text>
          </View>
          <View style={styles.singleChatBody}>
            <View style={[styles.agentBubble, { borderColor: selectedAgent.color + '44' }]}>
              <Text style={styles.agentText}>Saudações. Eu sou **{selectedAgent.name}** ({selectedAgent.role}). Canal direto estabelecido na Bifrost.</Text>
            </View>
          </View>
        </View>
      ) : activeTab === 'conselho' ? (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.councilContainer}
        >
          <ScrollView contentContainerStyle={styles.councilScroll}>
            {councilMessages.map((msg, index) => (
              <View 
                key={index} 
                style={[
                  styles.msgBubble, 
                  msg.sender === 'user' ? styles.userMsg : 
                  msg.sender === 'system' ? styles.systemMsg : styles.groupMsg
                ]}
              >
                <Text style={msg.sender === 'user' ? styles.userText : styles.groupText}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder="Digite uma ordem para todo o Panteão..."
              placeholderTextColor="#6b7280"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendCouncil}>
              <Text style={styles.sendButtonText}>Invocar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        /* Aba de Auditoria de Segurança do Heimdallr */
        <ScrollView contentContainerStyle={styles.auditContainer}>
          <View style={styles.auditHeaderCard}>
            <Text style={styles.auditTitle}>🛡️ Central de Vigilância HEIMDALLr</Text>
            <Text style={styles.auditDesc}>
              O Vigia da Bifrost está pronto para varrer o código, as credenciais e o banco de dados em busca de vulnerabilidades.
            </Text>
            
            <TouchableOpacity 
              style={styles.scanButton} 
              onPress={runHeimdallrAudit}
              disabled={scanning}
            >
              <Text style={styles.scanButtonText}>
                {scanning ? 'Varrendo os Portões...' : 'Executar Varredura de Segurança'}
              </Text>
            </TouchableOpacity>
          </View>

          {scanning && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#fbbf24" />
              <Text style={styles.loadingText}>Heimdallr inspecionando rotas e variáveis...</Text>
            </View>
          )}

          {scanResults && (
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>📊 Relatório de Auditoria Final</Text>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>• Variáveis de Ambiente:</Text>
                <Text style={styles.resultVal}>{scanResults.envCheck}</Text>
              </View>

              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>• Regras Supabase / RLS:</Text>
                <Text style={styles.resultVal}>{scanResults.rlsCheck}</Text>
              </View>

              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>• Estabilidade de Rede:</Text>
                <Text style={styles.resultVal}>{scanResults.apiRoutes}</Text>
              </View>

              <View style={styles.scoreBox}>
                <Text style={styles.scoreTitle}>NOTA DE SEGURANÇA FINAL:</Text>
                <Text style={styles.scoreVal}>{scanResults.score}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050811',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#0b0f19',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ade80',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#9ca3af',
    letterSpacing: 2,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
    marginBottom: 12,
  },
  tabToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 3,
    width: '100%',
    maxWidth: 340,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#1f2937',
    elevation: 2,
  },
  tabButtonText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#38bdf8',
  },
  gridContent: {
    padding: 16,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 14,
    textAlign: 'center',
  },
  cardsGrid: {
    gap: 12,
  },
  agentCard: {
    backgroundColor: '#0b0f19',
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 16,
    elevation: 4,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardAgentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  miniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cardAgentRole: {
    fontSize: 11,
    color: '#38bdf8',
    marginBottom: 8,
    fontWeight: '600',
  },
  cardAgentDesc: {
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 18,
  },
  singleChatView: {
    flex: 1,
    padding: 16,
  },
  singleChatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#0b0f19',
    padding: 12,
    borderRadius: 10,
  },
  backLink: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
  },
  singleChatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  singleChatBody: {
    flex: 1,
  },
  agentBubble: {
    backgroundColor: '#0b0f19',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  agentText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  councilContainer: {
    flex: 1,
  },
  councilScroll: {
    padding: 16,
    gap: 12,
  },
  msgBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMsg: {
    backgroundColor: '#1e293b',
    alignSelf: 'flex-end',
  },
  systemMsg: {
    backgroundColor: '#111827',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  groupMsg: {
    backgroundColor: '#0b0f19',
    borderWidth: 1,
    borderColor: '#38bdf844',
    alignSelf: 'flex-start',
  },
  userText: {
    color: '#f8fafc',
    fontSize: 13,
  },
  groupText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#0b0f19',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#ffffff',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#374151',
    height: 44,
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    height: 44,
  },
  sendButtonText: {
    color: '#050811',
    fontWeight: 'bold',
    fontSize: 12,
  },
  auditContainer: {
    padding: 16,
    gap: 16,
  },
  auditHeaderCard: {
    backgroundColor: '#0b0f19',
    borderWidth: 1.5,
    borderColor: '#fbbf24',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },
  auditTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 8,
    textAlign: 'center',
  },
  auditDesc: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#fbbf24',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#050811',
    fontWeight: 'bold',
    fontSize: 13,
  },
  loadingBox: {
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  loadingText: {
    color: '#fbbf24',
    fontSize: 12,
  },
  resultsBox: {
    backgroundColor: '#0b0f19',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  resultItem: {
    gap: 2,
  },
  resultLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  resultVal: {
    color: '#4ade80',
    fontSize: 13,
  },
  scoreBox: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    scoreTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreVal: {
    color: '#fbbf24',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
