import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';

const nordicAgents = [
  { name: 'ODIN', role: 'O Allfather • Oráculo Supremo', color: '#38bdf8', desc: 'Sabedoria ancestral, visão estratégica profunda e análise global de dados e caminhos.' },
  { name: 'THOR', role: 'O Protetor • Força de Combate', color: '#ef4444', desc: 'Poder bruto, automação de alta performance e superação de barreiras técnicas.' },
  { name: 'FREYA', role: 'Deusa do Charme • Magia e Conteúdo', color: '#f472b6', desc: 'Atração magnética, copywriting persuasivo e conexões visuais de alto impacto.' },
  { name: 'LOKI', role: 'O Estrategista • Mestre das Ilusões', color: '#4ade80', desc: 'Soluções criativas fora da caixa, engenharia de prompts avançada e adaptabilidade.' },
  { name: 'HEIMDALLr', role: 'O Vigia • Guarda da Bifrost', color: '#fbbf24', desc: 'Monitoramento em tempo real, segurança de sistemas e vigilância de performance.' },
];

export default function App() {
  const [selectedAgent, setSelectedAgent] = useState(nordicAgents[0]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050811" />
      
      {/* Cabeçalho Nórdico */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>PANTEÃO NÓRDICO • IA 24/7</Text>
        <Text style={styles.headerTitle}>{selectedAgent.name}</Text>
        <Text style={styles.headerRole}>{selectedAgent.role}</Text>
      </View>

      {/* Carrossel de Deuses / Agentes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll} contentContainerStyle={styles.navContainer}>
        {nordicAgents.map((agent) => (
          <TouchableOpacity 
            key={agent.name}
            style={[styles.navButton, selectedAgent.name === agent.name && { borderColor: agent.color, backgroundColor: '#111827' }]}
            onPress={() => setSelectedAgent(agent)}
          >
            <Text style={[styles.navText, selectedAgent.name === agent.name && { color: agent.color, fontWeight: 'bold' }]}>
              {agent.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Painel do Agente Nórdico */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { borderColor: selectedAgent.color }]}>
          <Text style={[styles.cardTitle, { color: selectedAgent.color }]}>{selectedAgent.name}</Text>
          <Text style={styles.cardDesc}>{selectedAgent.desc}</Text>
          
          <View style={styles.featureBox}>
            <Text style={styles.featureText}>⚡ Conexão direta com Supabase & Gemini API</Text>
            <Text style={styles.featureText}>⚡ Processamento otimizado no ecossistema mobile</Text>
            <Text style={styles.featureText}>⚡ Pronto para automações e escala de projetos</Text>
          </View>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: selectedAgent.color }]}>
            <Text style={styles.actionButtonText}>Invocar {selectedAgent.name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050811',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0b0f19',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    letterSpacing: 2,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  headerRole: {
    fontSize: 13,
    color: '#38bdf8',
    marginTop: 4,
    textAlign: 'center',
  },
  navScroll: {
    maxHeight: 70,
    backgroundColor: '#090d16',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  navContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 10,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#0f172a',
    height: 40,
    justifyContent: 'center',
  },
  navText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
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
    maxWidth: 400,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: '#d1d5db',
    lineHeight: 22,
    marginBottom: 20,
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
    fontSize: 14,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#050811',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
