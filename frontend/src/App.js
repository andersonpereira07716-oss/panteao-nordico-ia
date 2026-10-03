import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const nordicAgents = [
  { id: 'odin', name: 'ODIN', role: 'O Allfather • Oráculo Supremo', color: '#38bdf8', desc: 'Visão estratégica e análise global.' },
  { id: 'thor', name: 'THOR', role: 'O Protetor • Força de Combate', color: '#ef4444', desc: 'Automação pesada e resolução de bugs.' },
  { id: 'freya', name: 'FREYA', role: 'Deusa do Charme • Magia & Conteúdo', color: '#f472b6', desc: 'Copywriting e atração magnética.' },
  { id: 'loki', name: 'LOKI', role: 'O Estrategista • Mestre das Ilusões', color: '#4ade80', desc: 'Soluções criativas fora da caixa.' },
  { id: 'heimdallr', name: 'HEIMDALLr', role: 'O Vigia • Guarda da Bifrost', color: '#fbbf24', desc: 'Monitoramento e segurança em tempo real.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('panteao'); // 'panteao' ou 'conselho'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [councilMessages, setCouncilMessages] = useState([
    { sender: 'system', text: '⚡ O Panteão Nórdico foi convocado na Bifrost. Todos os deuses estão conectados.' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendCouncil = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setCouncilMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    // Resposta sincronizada do Panteão
    setTimeout(() => {
      setCouncilMessages(prev => [
        ...prev,
        { sender: 'odin', text: `[ODIN]: Analisei a diretriz "${userMsg}". A estratégia macro está traçada.` },
        { sender: 'thor', text: `[THOR]: Força de processamento alocada! Pronto para executar no ecossistema.` },
        { sender: 'heimdallr', text: `[HEIMDALLr]: Canais seguros e rotas da Bifrost monitoradas. Tudo limpo.` }
      ]);
    }, 1200);
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
            <Text style={[styles.tabButtonText, activeTab === 'panteao' && styles.tabButtonTextActive]}>Os 5 Deuses</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'conselho' && styles.tabButtonActive]}
            onPress={() => setActiveTab('conselho')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'conselho' && styles.tabButtonTextActive]}>Conselho Coletivo ⚡</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo dinâmico baseado na aba */}
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
              <Text style={styles.backLink}>← Voltar aos 5 Deuses</Text>
            </TouchableOpacity>
            <Text style={[styles.singleChatTitle, { color: selectedAgent.color }]}>{selectedAgent.name}</Text>
          </View>
          <View style={styles.singleChatBody}>
            <View style={[styles.agentBubble, { borderColor: selectedAgent.color + '44' }]}>
              <Text style={styles.agentText}>Saudações, criador. Eu sou **{selectedAgent.name}** ({selectedAgent.role}). Como posso auxiliar na sua missão hoje?</Text>
            </View>
          </View>
        </View>
      ) : (
        /* Aba de Conselho Coletivo (Todos juntos) */
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
              <Text style={styles.sendButtonText}>Invocar Todos</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    maxWidth: 320,
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
    fontSize: 12,
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
});
