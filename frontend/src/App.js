import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const nordicAgents = [
  { id: 'odin', name: 'ODIN', role: 'O Allfather • Oráculo Supremo', color: '#38bdf8', desc: 'Sabedoria ancestral, visão estratégica profunda e análise global de dados e caminhos.' },
  { id: 'thor', name: 'THOR', role: 'O Protetor • Força de Combate', color: '#ef4444', desc: 'Poder bruto, automação de alta performance e superação de barreiras técnicas.' },
  { id: 'freya', name: 'FREYA', role: 'Deusa do Charme • Magia e Conteúdo', color: '#f472b6', desc: 'Atração magnética, copywriting persuasivo e conexões visuais de alto impacto.' },
  { id: 'loki', name: 'LOKI', role: 'O Estrategista • Mestre das Ilusões', color: '#4ade80', desc: 'Soluções criativas fora da caixa, engenharia de prompts avançada e adaptabilidade.' },
  { id: 'heimdallr', name: 'HEIMDALLr', role: 'O Vigia • Guarda da Bifrost', color: '#fbbf24', desc: 'Monitoramento em tempo real, segurança de sistemas e vigilância de performance.' },
];

export default function App() {
  const [selectedAgent, setSelectedAgent] = useState(nordicAgents[0]);
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Saudações, mortal. Estou conectado à rede e pronto para atuar.' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsgs = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMsgs);
    setInputText('');
    
    // Resposta simulada imersiva do agente
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'agent', text: `[${selectedAgent.name}] Processando sua diretriz através dos reinos... Comando executado com sucesso.` }
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050811" />
      
      {/* Cabeçalho Nórdico */}
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: selectedAgent.color }]} />
          <Text style={styles.headerSubtitle}>PANTEÃO NÓRDICO • IA 24/7</Text>
        </View>
        <Text style={styles.headerTitle}>{selectedAgent.name}</Text>
        <Text style={styles.headerRole}>{selectedAgent.role}</Text>
      </View>

      {/* Carrossel de Deuses / Agentes Corrigido (Sem cortes) */}
      <View style={styles.navWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.navContainer}
        >
          {nordicAgents.map((agent) => (
            <TouchableOpacity 
              key={agent.id}
              style={[
                styles.navButton, 
                selectedAgent.id === agent.id && { borderColor: agent.color, backgroundColor: '#111827', shadowColor: agent.color }
              ]}
              onPress={() => {
                setSelectedAgent(agent);
                setChatActive(false);
                setMessages([{ sender: 'agent', text: `Saudações. Eu sou ${agent.name}. Como posso auxiliar em sua jornada hoje?` }]);
              }}
            >
              <Text style={[styles.navText, selectedAgent.id === agent.id && { color: agent.color, fontWeight: 'bold' }]}>
                {agent.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Conteúdo Principal ou Chat Ativo */}
      {!chatActive ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.card, { borderColor: selectedAgent.color }]}>
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.cardTitle, { color: selectedAgent.color }]}>{selectedAgent.name}</Text>
              <View style={[styles.tagContainer, { backgroundColor: selectedAgent.color + '22', borderColor: selectedAgent.color }]}>
                <Text style={[styles.tagText, { color: selectedAgent.color }]}>ONLINE</Text>
              </View>
            </View>

            <Text style={styles.cardDesc}>{selectedAgent.desc}</Text>
            
            <View style={styles.featureBox}>
              <Text style={styles.featureText}>⚡ Conexão direta com Supabase & Gemini API</Text>
              <Text style={styles.featureText}>⚡ Processamento otimizado no ecossistema mobile</Text>
              <Text style={styles.featureText}>⚡ Pronto para automações e escala de projetos</Text>
            </View>

            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: selectedAgent.color }]}
              onPress={() => setChatActive(true)}
            >
              <Text style={styles.actionButtonText}>Invocar {selectedAgent.name}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.chatContainer}
        >
          <View style={styles.chatHeaderBar}>
            <TouchableOpacity onPress={() => setChatActive(false)}>
              <Text style={styles.backText}>← Voltar ao Panteão</Text>
            </TouchableOpacity>
            <Text style={[styles.chatActiveTitle, { color: selectedAgent.color }]}>Canal com {selectedAgent.name}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.chatScroll}>
            {messages.map((msg, index) => (
              <View 
                key={index} 
                style={[
                  styles.messageBubble, 
                  msg.sender === 'user' ? styles.userBubble : [styles.agentBubble, { borderColor: selectedAgent.color + '44' }]
                ]}
              >
                <Text style={msg.sender === 'user' ? styles.userText : styles.agentText}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder={`Digite sua ordem para ${selectedAgent.name}...`}
              placeholderTextColor="#6b7280"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity 
              style={[styles.sendButton, { backgroundColor: selectedAgent.color }]}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Enviar</Text>
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
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#0b0f19',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#9ca3af',
    letterSpacing: 2,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  headerRole: {
    fontSize: 13,
    color: '#38bdf8',
    marginTop: 2,
    textAlign: 'center',
  },
  navWrapper: {
    backgroundColor: '#090d16',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    paddingVertical: 10,
  },
  navContainer: {
    paddingHorizontal: 15,
    gap: 10,
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#0f172a',
    height: 42,
    justifyContent: 'center',
    elevation: 3,
  },
  navText: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#0b0f19',
    borderWidth: 2,
    borderRadius: 20,
    padding: 22,
    width: '100%',
    maxWidth: 420,
    elevation: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardDesc: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
    marginBottom: 18,
  },
  featureBox: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  featureText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  actionButtonText: {
    color: '#050811',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#050811',
  },
  chatHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#0b0f19',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  backText: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '600',
  },
  chatActiveTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  chatScroll: {
    padding: 15,
    gap: 12,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#1e293b',
    alignSelf: 'flex-end',
  },
  agentBubble: {
    backgroundColor: '#0b0f19',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  userText: {
    color: '#f8fafc',
    fontSize: 14,
  },
  agentText: {
    color: '#cbd5e1',
    fontSize: 14,
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
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#374151',
    height: 44,
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 44,
  },
  sendButtonText: {
    color: '#050811',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
