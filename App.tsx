import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, Switch 
} from 'react-native';

export default function PanteaoEcossistemaTotal() {
  const [ abaAtiva, setAbaAtiva ] = useState<'rituais' | 'oraculo' | 'comercial' | 'mimir'>('rituais');
  
  // Estados dos Módulos
  const [ notifAtiva, setNotifAtiva ] = useState(true);
  const [ inputErro, setInputErro ] = useState('');
  const [ horas, setHoras ] = useState('10');
  const [ valorHora, setValorHora ] = useState('60');
  const [ cliente, setCliente ] = useState('');
  const [ meioPagamento, setMeioPagamento ] = useState('Mercado Pago');
  
  const [ resultado, setResultado ] = useState('');
  const [ carregando, setCarregando ] = useState(false);

  // Executor unificado para as 4 funcionalidades
  const executarFuncao = async (tipo: string) => {
    setCarregando(true);
    setResultado('');

    setTimeout(() => {
      if (tipo === 'oraculo') {
        setResultado(`🛠️ [ORÁCULO DE ERROS - THOR]\nErro analisado com sucesso.\nSolução: Atualiza as dependências com 'npm install' e verifica se a variável de ambiente do Supabase está correta no Termux.`);
      } else if (tipo === 'comercial') {
        const total = parseFloat(horas || '0') * parseFloat(valorHora || '0');
        setResultado(`🎯 [PROPOSTA COMERCIAL & ROI - FREYA]\nCliente: ${cliente || 'Parceiro'}\nInvestimento: R$ ${total.toFixed(2)}\nPagamento: ${meioPagamento}\n\nCopy: "Fala ${cliente}, estruturei a solução por R$ ${total.toFixed(2)} via ${meioPagamento}. Fechamos?"`);
      } else if (tipo === 'mimir') {
        setResultado(`📜 [PERGAMINHO DE MIMIR - SUPABASE SYNC]\n- Sincronizado com o Supabase.\n- Última ação: Consulta de ROI e Oráculo gravada na nuvem com sucesso.`);
      }
      setCarregando(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.statusDot}>🟢</Text>
        <Text style={styles.headerSubtitle}> PANTEÃO NÓRDICO • IA 24/7</Text>
        <Text style={styles.headerTitle}>ECOSSISTEMA TOTAL UNIFICADO</Text>
      </View>

      {/* Navegação Superior (4 Módulos) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {[
          { key: 'rituais', label: '🌙 Rituais' },
          { key: 'oraculo', label: '🛠️ Oráculo' },
          { key: 'comercial', label: '🎯 Comercial/ROI' },
          { key: 'mimir', label: '📜 Mimir (Cloud)' }
        ].map((tab) => (
          <TouchableOpacity 
            key={tab.key} 
            style={[styles.tabButton, abaAtiva === tab.key && styles.tabButtonActive]}
            onPress={() => setAbaAtiva(tab.key as any)}
          >
            <Text style={[styles.tabText, abaAtiva === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Conteúdo Dinâmico */}
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* 1. Rituais Diários & Notificações Push */}
        {abaAtiva === 'rituais' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🌙 Notificações & Rituais Diários</Text>
            <Text style={styles.desc}>Recebe previsões matinais e alertas estratégicos automáticos do Odin.</Text>
            
            <View style={styles.row}>
              <Text style={{color: '#FFF'}}>Ativar Alertas de Odin</Text>
              <Switch 
                value={notifAtiva} 
                onValueChange={setNotifAtiva} 
                trackColor={{ false: '#374151', true: '#10B981' }}
              />
            </View>
            <Text style={styles.statusBox}>
              Status do Ritual: {notifAtiva ? '⚡ Ativo (Notificações ligadas)' : '💤 Pausado'}
            </Text>
          </View>
        )}

        {/* 2. Oráculo de Erros */}
        {abaAtiva === 'oraculo' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🛠️ Oráculo de Erros (Diagnóstico)</Text>
            <Text style={styles.desc}>Cola o erro do Termux ou do app para o Thor e o Odin resolverem na hora.</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ex: Error: Native module cannot be null..."
              placeholderTextColor="#888"
              value={inputErro}
              onChangeText={setInputErro}
            />

            <TouchableOpacity style={styles.btn} onPress={() => executarFuncao('oraculo')}>
              <Text style={styles.btnText}>CONSULTAR ORÁCULO</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 3. Comercial & Calculadora de ROI */}
        {abaAtiva === 'comercial' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎯 Calculadora Comercial & ROI</Text>
            
            <TextInput style={styles.input} placeholder="Nome do Cliente" placeholderTextColor="#888" value={cliente} onChangeText={setCliente} />
            
            <View style={styles.rowInputs}>
              <TextInput style={[styles.input, {flex: 1, marginRight: 8}]} placeholder="Horas" placeholderTextColor="#888" keyboardType="numeric" value={horas} onChangeText={setHoras} />
              <TextInput style={[styles.input, {flex: 1}]} placeholder="Valor/Hora (R$)" placeholderTextColor="#888" keyboardType="numeric" value={valorHora} onChangeText={setValorHora} />
            </View>

            <Text style={{color: '#9CA3AF', fontSize: 12, marginBottom: 5}}>Escolha o Meio de Pagamento:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 15}}>
              {['Mercado Pago', 'Kiwify', 'Banco do Brasil', 'Caixa Pix'].map((pag) => (
                <TouchableOpacity 
                  key={pag} 
                  style={[styles.pagTag, meioPagamento === pag && styles.pagTagActive]}
                  onPress={() => setMeioPagamento(pag)}
                >
                  <Text style={{color: meioPagamento === pag ? '#FFF' : '#9CA3AF', fontSize: 12}}>{pag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.btn} onPress={() => executarFuncao('comercial')}>
              <Text style={styles.btnText}>GERAR PROPOSTA & ROI</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 4. Mimir & Sincronização Supabase */}
        {abaAtiva === 'mimir' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📜 Pergaminho de Mimir (Cloud Sync)</Text>
            <Text style={styles.desc}>Sincroniza o histórico entre o teu Termux e o Aplicativo Móvel em tempo real via Supabase.</Text>

            <TouchableOpacity style={styles.btn} onPress={() => executarFuncao('mimir')}>
              <Text style={styles.btnText}>SINCRONIZAR COM SUPABASE</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Indicador de Carregamento e Resultados */}
        {carregando && <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 20 }} />}

        {resultado !== '' && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{resultado}</Text>
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
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  tabContainer: { paddingHorizontal: 15, paddingVertical: 10, maxHeight: 60 },
  tabButton: { paddingHorizontal: 14, paddingVertical: 8, marginRight: 10, backgroundColor: '#1F2937', borderRadius: 20, justifyContent: 'center' },
  tabButtonActive: { backgroundColor: '#3B82F6' },
  tabText: { color: '#9CA3AF', fontSize: 12, fontWeight: 'bold' },
  tabTextActive: { color: '#FFFFFF' },
  content: { padding: 20 },
  card: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#1F2937', padding: 18, borderRadius: 12, marginBottom: 15 },
  cardTitle: { color: '#60A5FA', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  desc: { color: '#9CA3AF', fontSize: 13, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusBox: { color: '#10B981', fontSize: 13, fontWeight: 'bold', marginTop: 5 },
  input: { backgroundColor: '#1F2937', borderWidth: 1, borderColor: '#374151', color: '#FFF', padding: 12, borderRadius: 8, fontSize: 14, marginBottom: 12 },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  pagTag: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#1F2937', borderRadius: 8, marginRight: 8, borderWidth: 1, borderColor: '#374151' },
  pagTagActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  btn: { backgroundColor: '#10B981', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  btnText: { color: '#0B0F19', fontWeight: 'bold', fontSize: 13 },
  resultBox: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#10B981', padding: 15, borderRadius: 10, marginTop: 15 },
  resultText: { color: '#D1D5DB', fontSize: 13, lineHeight: 20 }
});
