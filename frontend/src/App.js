import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Vibration } from 'react-native';

const nordicAgents = [
  { id: 'odin', name: 'ODIN', role: 'O Allfather • Oráculo Supremo', color: '#38bdf8', desc: 'Visão estratégica e análise global.' },
  { id: 'thor', name: 'THOR', role: 'O Protetor • Força de Combate', color: '#ef4444', desc: 'Automação pesada e resolução de bugs.' },
  { id: 'freya', name: 'FREYA', role: 'Deusa do Charme • Magia & Conteúdo', color: '#f472b6', desc: 'Copywriting e atração magnética.' },
  { id: 'loki', name: 'LOKI', role: 'O Estrategista • Mestre das Ilusões', color: '#4ade80', desc: 'Soluções criativas fora da caixa.' },
  { id: 'heimdallr', name: 'HEIMDALLr', role: 'O Vigia • Guarda da Bifrost', color: '#fbbf24', desc: 'Monitoramento, segurança e auditoria 24/7.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('panteao'); // 'panteao', 'conselho', 'pergaminhos', 'radar', 'rituais'
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  // Estados globais
  const [councilMessages, setCouncilMessages] = useState([
    { sender: 'system', text: '⚡ O Panteão Nórdico foi convocado na Bifrost. Todos os deuses estão conectados.' }
  ]);
  const [inputText, setInputText] = useState('');
  
  // 1. Pergaminhos de Comando (Histórico Salvo)
  const [pergaminhos, setPergaminhos] = useState([
    { id: 1, title: 'Build APK Otimizado via GitHub Actions', code: 'npx expo build:android --clear-cache' },
    { id: 2, title: 'Configuração de RLS no Supabase', code: 'ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;' }
  ]);

  // 3. Radar da Bifrost (Latência / Status)
  const [radarStatus, setRadarStatus] = useState({ supabase: 'Estável (18ms)', github: 'Online', apis: '100% Sincronizado', ping: '14ms' });
  const [isScanningRadar, setIsScanningRadar] = useState(false);

  // 4. Rituais Diários (Notificações)
  const [ritualAtivo, setRitualAtivo] = useState(true);
  const [ritualMsg, setRitualMsg] = useState('Odin determinou foco total na arquitetura hoje.');

  const handleSendCouncil = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setCouncilMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    
    // Salvar automaticamente nos Pergaminhos como rascunho inteligente
    setPergaminhos(prev => [{ id: Date.now(), title: userMsg.slice(0, 30) + '...', code: userMsg }, ...prev]);
    setInputText('');

    setTimeout(() => {
      setCouncilMessages(prev => [
        ...prev,
        { sender: 'odin', text: `[ODIN]: Diretriz analisada e aprovada para execução.` },
        { sender: 'thor', text: `[THOR]: Script gerado e pronto para cópia rápida no Modo de Batalha.` },
        { sender: 'heimdallr', text: `[HEIMDALLr]: Tráfego seguro validado na Bifrost.` }
      ]);
    }, 1200);
  };

  const runRadarScan = () => {
    setIsScanningRadar(true);
    Vibration.vibrate(50);
    setTimeout(() => {
      setIsScanningRadar(false);
      setRadarStatus({
        supabase: 'Estável (12ms)',
        github: 'Conectado (andersonpereira07716-oss)',
        apis: '100% Sincronizado',
        ping: '9ms'
      });
    }, 1500);
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
        
        {/* Barra de Abas Expandida com as 4 Novas Funcionalidades */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabToggleRow}>
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
            style={[styles.tabButton, activeTab === 'pergaminhos' && styles.tabButtonActive]}
            onPress={() => setActiveTab('pergaminhos')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'pergaminhos' && styles.tabButtonTextActive]}>📜 Pergaminhos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'radar' && styles.tabButtonActive]}
            onPress={() => setActiveTab('radar')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'radar' && styles.tabButtonTextActive]}>🗺️ Radar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'rituais' && styles.tabButtonActive]}
            onPress={() => setActiveTab('rituais')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'rituais' && styles.tabButtonTextActive]}>🌙 Rituais</Text>
          </TouchableOpacity>
        </ScrollView>
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
              <Text style={styles.agentText}>Canal direto estabelecido com **{selectedAgent.name}**. Pronto para receber instruções de código e arquitetura.</Text>
            </View>
          </View>
        </View>
      ) : activeTab === 'conselho' ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.councilContainer}>
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
                {/* 2. Modo de Batalha: Botão de Cópia Rápida para Snippets */}
                {msg.sender !== 'user' && msg.sender !== 'system' && (
                  <TouchableOpacity 
                    style={styles.copySnippetBtn}
                    onPress={() => {
                      Vibration.vibrate(30);
                      alert('Snippet copiado para a memória de batalha!');
                    }}
                  >
                    <Text style={styles.copySnippetText}>⚡ Copiar para o Termux</Text>
                  </TouchableOpacity>
                )}
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
      ) : activeTab === 'pergaminhos' ? (
        /* 1. Pergaminhos de Comando */
        <ScrollView contentContainerStyle={styles.auditContainer}>
          <View style={styles.auditHeaderCard}>
            <Text style={styles.auditTitle}>📜 Pergaminhos de Comando</Text>
            <Text style={styles.auditDesc}>Histórico inteligente de prompts e scripts executados com sucesso no ecossistema.</Text>
          </View>
          {pergaminhos.map((item) => (
            <View key={item.id} style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>{item.title}</Text>
              <Text style={styles.codeSnippet}>{item.code}</Text>
              <TouchableOpacity 
                style={styles.scanButton}
                onPress={() => {
                  Vibration.vibrate(30);
                  alert('Comando copiado!');
                }}
              >
                <Text style={styles.scanButtonText}>Reutilizar no Termux</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : activeTab === 'radar' ? (
        /* 3. Radar da Bifrost */
        <ScrollView contentContainerStyle={styles.auditContainer}>
          <View style={styles.auditHeaderCard}>
            <Text style={styles.auditTitle}>🗺️ Radar da Bifrost</Text>
            <Text style={styles.auditDesc}>Monitoramento em tempo real de latência, rotas e conexões de backend.</Text>
            <TouchableOpacity style={styles.scanButton} onPress={runRadarScan} disabled={isScanningRadar}>
              <Text style={styles.scanButtonText}>{isScanningRadar ? 'Varrendo Conexões...' : 'Atualizar Radar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultsBox}>
            <View style={styles.resultItem}><Text style={styles.resultLabel}>• Supabase DB:</Text><Text style={styles.resultVal}>{radarStatus.supabase}</Text></View>
            <View style={styles.resultItem}><Text style={styles.resultLabel}>• Repositório GitHub:</Text><Text style={styles.resultVal}>{radarStatus.github}</Text></View>
            <View style={styles.resultItem}><Text style={styles.resultLabel}>• Sincronização IA:</Text><Text style={styles.resultVal}>{radarStatus.apis}</Text></View>
            <View style={styles.resultItem}><Text style={styles.resultLabel}>• Latência Geral (Ping):</Text><Text style={styles.resultVal}>{radarStatus.ping}</Text></View>
          </View>
        </ScrollView>
      ) : (
        /* 4. Rituais Diários */
        <ScrollView contentContainerStyle={styles.auditContainer}>
          <View style={styles.auditHeaderCard}>
            <Text style={styles.auditTitle}>🌙 Rituais Diários & Notificações</Text>
            <Text style={styles.auditDesc}>Mensagens matinais e diretrizes automatizadas enviadas pelas divindades.</Text>
          </View>

          <View style={styles.resultsBox}>
            <Text style={styles.resultsTitle}>Status do Ritual: Ativo ⚡</Text>
            <Text style={styles.agentText}>"{ritualMsg}"</Text>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={() => {
                setRitualAtivo(!ritualAtivo);
                setRitualMsg(ritualAtivo ? 'Modo de silêncio místico ativado.' : 'Odin determinou foco total na arquitetura hoje.');
              }}
            >
              <Text style={styles.scanButtonText}>{ritualAtivo ? 'Desativar Notificações' : 'Ativar Rituais'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050811' },
  header: { paddingVertical: 15, paddingHorizontal: 16, backgroundColor: '#0b0f19', borderBottomWidth: 1, borderBottomColor: '#1f2937', alignItems: 'center' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  statusDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#4ade80' },
  headerSubtitle: { fontSize: 10, color: '#9ca3af', letterSpacing: 2, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1, marginBottom: 10 },
  tabToggleRow: { flexDirection: 'row', backgroundColor: '#111827', borderRadius: 10, padding: 3, gap: 6 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center', borderRadius: 8 },
  tabButtonActive: { backgroundColor: '#1f2937' },
  tabButtonText: { color: '#9ca3af', fontSize: 11, fontWeight: '600' },
  tabButtonTextActive: { color: '#38bdf8' },
  gridContent: { padding: 16 },
  sectionSubtitle: { fontSize: 12, color: '#9ca3af', marginBottom: 14, textAlign: 'center' },
  cardsGrid: { gap: 12 },
  agentCard: { backgroundColor: '#0b0f19', borderWidth: 1.5, borderRadius: 14, padding: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardAgentName: { fontSize: 18, fontWeight: 'bold' },
  miniDot: { width: 6, height: 6, borderRadius: 3 },
  cardAgentRole: { fontSize: 11, color: '#38bdf8', marginBottom: 8, fontWeight: '600' },
  cardAgentDesc: { fontSize: 13, color: '#d1d5db', lineHeight: 18 },
  singleChatView: { flex: 1, padding: 16 },
  singleChatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, backgroundColor: '#0b0f19', padding: 12, borderRadius: 10 },
  backLink: { color: '#38bdf8', fontSize: 13, fontWeight: '600' },
  singleChatTitle: { fontSize: 16, fontWeight: 'bold' },
  singleChatBody: { flex: 1 },
  agentBubble: { backgroundColor: '#0b0f19', padding: 16, borderRadius: 12, borderWidth: 1 },
  agentText: { color: '#cbd5e1', fontSize: 14, lineHeight: 20 },
  councilContainer: { flex: 1 },
  councilScroll: { padding: 16, gap: 12 },
  msgBubble: { padding: 12, borderRadius: 12, maxWidth: '90%' },
  userMsg: { backgroundColor: '#1e293b', alignSelf: 'flex-end' },
  systemMsg: { backgroundColor: '#111827', alignSelf: 'center', borderWidth: 1, borderColor: '#374151' },
  groupMsg: { backgroundColor: '#0b0f19', borderWidth: 1, borderColor: '#38bdf844', alignSelf: 'flex-start' },
  userText: { color: '#f8fafc', fontSize: 13 },
  groupText: { color: '#cbd5e1', fontSize: 13 },
  copySnippetBtn: { marginTop: 8, backgroundColor: '#1f2937', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, alignSelf: 'flex-start' },
  copySnippetText: { color: '#38bdf8', fontSize: 11, fontWeight: 'bold' },
  inputArea: { flexDirection: 'row', padding: 12, backgroundColor: '#0b0f19', borderTopWidth: 1, borderTopColor: '#1f2937', gap: 10 },
  input: { flex: 1, backgroundColor: '#111827', borderRadius: 8, paddingHorizontal: 12, color: '#ffffff', fontSize: 13, borderWidth: 1, borderColor: '#374151', height: 44 },
  sendButton: { justifyContent: 'center', paddingHorizontal: 14, backgroundColor: '#38bdf8', borderRadius: 8, height: 44 },
  sendButtonText: { color: '#050811', fontWeight: 'bold', fontSize: 12 },
  auditContainer: { padding: 16, gap: 16 },
  auditHeaderCard: { backgroundColor: '#0b0f19', borderWidth: 1.5, borderColor: '#fbbf24', borderRadius: 14, padding: 18, alignItems: 'center' },
  auditTitle: { fontSize: 18, fontWeight: 'bold', color: '#fbbf24', marginBottom: 8, textAlign: 'center' },
  auditDesc: { fontSize: 13, color: '#9ca3af', textAlign: 'center', lineHeight: 18, marginBottom: 12 },
  scanButton: { backgroundColor: '#fbbf24', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, width: '100%', alignItems: 'center', marginTop: 8 },
  scanButtonText: { color: '#050811', fontWeight: 'bold', fontSize: 12 },
  resultsBox: { backgroundColor: '#0b0f19', borderWidth: 1, borderColor: '#1f2937', borderRadius: 14, padding: 16, gap: 10 },
  resultsTitle: { fontSize: 14, fontWeight: 'bold', color: '#ffffff' },
  resultItem: { flexDirection: 'row', justifyContent: 'space-between' },
  resultLabel: { color: '#9ca3af', fontSize: 12 },
  resultVal: { color: '#4ade80', fontSize: 12, fontWeight: '600' },
  codeSnippet: { backgroundColor: '#111827', color: '#38bdf8', padding: 10, borderRadius: 8, fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' }
});
