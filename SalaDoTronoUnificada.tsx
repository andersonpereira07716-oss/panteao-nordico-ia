import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView 
} from 'react-native';

export default function SalaDoTronoUnificada() {
  const [ abaAtiva, setAbaAtiva ] = useState<'deuses' | 'conselho' | 'forja' | 'comercial' | 'radar'>('deuses');
  const [ inputUsuario, setInputUsuario ] = useState('');
  const [ resultadoIA, setResultadoIA ] = useState('');
  const [ carregando, setCarregando ] = useState(false);

  // Simulador de chamada unificada (Gemini API + Supabase sync)
  const executarAcaoDivina = async (tipo: string) => {
    if (!inputUsuario.trim()) return;
    setCarregando(true);
    setResultadoIA('');

    setTimeout(() => {
      if (tipo === 'conselho') {
        setResultadoIA(`🔥 [CONSELHO SUPREMO]\nOdin: Alinha a estratégia para alta performance.\nThor: Estrutura o código no Supabase com RLS.\nFreya: Aplica o gatilho de conversão comercial.`);
      } else if (tipo === 'forja') {
        setResultadoIA(`⚡ [FORJA DE THOR - CÓDIGO GERADO]\n// Componente gerado para: ${inputUsuario}\nimport React from 'react';\nimport { View, Text } from 'react-native';\n\nexport default function ComponenteForjado() {\n  return (<View><Text>Valhalla Ativo</Text></View>);\n}`);
      } else if (tipo === 'comercial') {
        setResultadoIA(`🎯 [PROPOSTA COMERCIAL & ROI]\nServiço: ${inputUsuario}\nInvestimento: R$ 1.500,00\nCheckout: Integrado via Mercado Pago / Pix (Banco do Brasil / Caixa).`);
      }
      setCarregando(false);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.statusDot}>🟢</Text>
        <Text style={styles.headerSubtitle}> PANTEÃO NÓRDICO • IA 24/7</Text>
        <Text style={styles.headerTitle}>SALA DO TRONO UNIFICADA</Text>
      </View>

      {/* Navegação por Abas (Menu Superior) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {['deuses', 'conselho', 'forja', 'comercial', 'radar'].map((aba) => (
          <TouchableOpacity 
            key={aba} 
            style={[styles.tabButton, abaAtiva === aba && styles.tabButtonActive]}
            onPress={() => setAbaAtiva(aba as any)}
          >
            <Text style={[styles.tabText, abaAtiva === aba && styles.tabTextActive]}>
              {aba.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Conteúdo Dinâmico por Aba */}
      <ScrollView contentContainerStyle={styles.content}>
        {abaAtiva === 'deuses' && (
          <View>
            <Text style={styles.instructions}>Toque em uma divindade para canalizar o poder direto no app:</Text>
            {['ODIN (Estratégia)', 'THOR (Arquitetura & Bugs)', 'FREYA (Copy & Vendas)', 'LOKI (Inovação)', 'HEIMDALL (Monitoramento)'].map((deus, index) => (
              <TouchableOpacity key={index} style={styles.cardDeus}>
                <Text style={styles.cardTitle}>{deus}</Text>
                <Text style={styles.cardDesc}>Canal de conexão unificada com IA e Supabase.</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {(abaAtiva === 'conselho' || abaAtiva === 'forja' || abaAtiva === 'comercial') && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              {abaAtiva === 'conselho' && '🧠 Conselho Supremo das Divindades'}
              {abaAtiva === 'forja' && '⚡ Forja de Thor (Gerador de Código)'}
              {abaAtiva === 'comercial' && '🎯 Calculadora Comercial & Checkout'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Descreva o desafio, código ou cliente..."
              placeholderTextColor="#888"
              value={inputUsuario}
              onChangeText={setInputUsuario}
            />

            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => executarAcaoDivina(abaAtiva)}
            >
              <Text style={styles.actionButtonText}>EXECUTAR COMANDO</Text>
            </TouchableOpacity>

            {carregando && <ActivityIndicator size="large" color="#00E676" style={{ marginTop: 20 }} />}

            {resultadoIA !== '' && (
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>{resultadoIA}</Text>
              </View>
            )}
          </View>
        )}

        {abaAtiva === 'radar' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>🗺️ Radar & Sincronização Supabase</Text>
            <Text style={styles.instructions}>Todos os dados gerados no Termux e no App estão sincronizados em tempo real.</Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Status: Conectado com sucesso ao banco de dados do Panteão.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1F2937' },
  statusDot: { fontSize: 12, marginBottom: 2 },
  headerSubtitle: { color: '#00E676', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  tabContainer: { paddingHorizontal: 15, paddingVertical: 10, maxHeight: 60 },
  tabButton: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 10, backgroundColor: '#1F2937', borderRadius: 20, justifyContent: 'center' },
  tabButtonActive: { backgroundColor: '#3B82F6' },
  tabText: { color: '#9CA3AF', fontSize: 12, fontWeight: 'bold' },
  tabTextActive: { color: '#FFFFFF' },
  content: { padding: 20 },
  instructions: { color: '#9CA3AF', fontSize: 14, marginBottom: 15 },
  cardDeus: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#1F2937', padding: 16, borderRadius: 12, marginBottom: 12 },
  cardTitle: { color: '#60A5FA', fontSize: 16, fontWeight: 'bold' },
  cardDesc: { color: '#9CA3AF', fontSize: 13, marginTop: 4 },
  sectionContainer: { marginTop: 10 },
  sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#374151', color: '#FFF', padding: 14, borderRadius: 10, fontSize: 14, marginBottom: 15 },
  actionButton: { backgroundColor: '#10B981', padding: 15, borderRadius: 10, alignItems: 'center' },
  actionButtonText: { color: '#0B0F19', fontWeight: 'bold', fontSize: 14 },
  resultBox: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#059669', padding: 15, borderRadius: 10, marginTop: 20 },
  resultText: { color: '#D1D5DB', fontSize: 13, lineHeight: 20 }
});
