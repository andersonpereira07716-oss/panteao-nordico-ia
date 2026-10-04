import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

export default function PanteaoEcossistemaTotal() {
  const [abaAtiva, setAbaAtiva] = useState('Conselho');
  const [deusSelecionado, setDeusSelecionado] = useState(null);
  const [mensagemChat, setMensagemChat] = useState('');
  const [historicoChat, setHistoricoChat] = useState([]);
  
  // Estados para os módulos integrados
  const [bugThor, setBugThor] = useState('');
  const [listaBugs, setListaBugs] = useState([]);
  const [missoes, setMissoes] = useState([
    { id: 1, deus: 'ODIN', titulo: 'Análise Estratégica Global', status: 'Pendente' },
    { id: 2, deus: 'THOR', titulo: 'Varredura de Bugs Críticos', status: 'Em Progresso' },
    { id: 3, deus: 'HEIMDALLR', titulo: 'Auditoria de Conexão 24/7', status: 'Ativo' }
  ]);

  const divindades = [
    { id: 'ODIN', nome: 'ODIN', subtitulo: 'O Allfather • Oráculo Supremo', desc: 'Visão estratégica e análise global.', cor: '#38bdf8' },
    { id: 'THOR', nome: 'THOR', subtitulo: 'O Protetor • Força de Combate', desc: 'Automação pesada e relatórios de bugs.', cor: '#f87171' },
    { id: 'FREYA', nome: 'FREYA', subtitulo: 'Deusa do Charme • Magia & Conteúdo', desc: 'Copywriting e atração magnética.', cor: '#f472b6' },
    { id: 'LOKI', nome: 'LOKI', subtitulo: 'O Estrategista • Mestre das Ilusões', desc: 'Soluções criativas fora da caixa.', cor: '#4ade80' },
    { id: 'HEIMDALLR', nome: 'HEIMDALLR', subtitulo: 'O Vigia • Guarda da Bifrost', desc: 'Monitoramento, segurança e auditoria 24/7.', cor: '#facc15' },
  ];

  const enviarMensagem = () => {
    if (!mensagemChat.trim()) return;
    setHistoricoChat([
      ...historicoChat, 
      { remetente: 'Você', texto: mensagemChat }, 
      { remetente: deusSelecionado?.nome, texto: `Resposta sagrada de ${deusSelecionado?.nome}: Recebido e processado no panteão!` }
    ]);
    setMensagemChat('');
  };

  const reportarBugThor = () => {
    if (!bugThor.trim()) return;
    setListaBugs([...listaBugs, { id: Date.now(), texto: bugThor, plano: 'Thor analisou: Isolar componente, corrigir rotas e retestar build.' }]);
    setBugThor('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDot}>●</Text>
        <Text style={styles.headerTitle}> PANTEÃO NÓRDICO • IA 24/7</Text>
      </View>
      <Text style={styles.mainTitle}>SALA DO TRONO UNIFICADA</Text>

      {/* Abas Superiores Funcionais */}
      <View style={styles.tabsContainer}>
        {['Conselho', 'Pergaminhos', 'Radar', 'Rituais'].map((aba) => (
          <TouchableOpacity 
            key={aba} 
            onPress={() => { setAbaAtiva(aba); setDeusSelecionado(null); }} 
            style={[styles.tabButton, abaAtiva === aba && styles.tabButtonActive]}
          >
            <Text style={[styles.tabText, abaAtiva === aba && styles.tabTextActive]}>{aba}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {deusSelecionado ? (
          /* Ecrã de Chat Individual com a Divindade */
          <View style={styles.chatContainer}>
            <TouchableOpacity onPress={() => setDeusSelecionado(null)} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Voltar à Sala do Trono</Text>
            </TouchableOpacity>
            <View style={[styles.deusCard, { borderColor: deusSelecionado.cor }]}>
              <Text style={[styles.deusNome, { color: deusSelecionado.cor }]}>{deusSelecionado.nome}</Text>
              <Text style={styles.deusSub}>{deusSelecionado.subtitulo}</Text>
            </View>

            <View style={styles.chatBox}>
              {historicoChat.length === 0 ? (
                <Text style={styles.chatEmpty}>Canal aberto com {deusSelecionado.nome}. Envie sua diretiva.</Text>
              ) : (
                historicoChat.map((msg, idx) => (
                  <View key={idx} style={msg.remetente === 'Você' ? styles.msgUser : styles.msgDeus}>
                    <Text style={styles.msgText}><Text style={{fontWeight: 'bold'}}>{msg.remetente}:</Text> {msg.texto}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.inputArea}>
              <TextInput 
                style={styles.input} 
                placeholder="Digite sua mensagem..." 
                placeholderTextColor="#888" 
                value={mensagemChat} 
                onChangeText={setMensagemChat} 
              />
              <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : abaAtiva === 'Conselho' ? (
          /* Sala do Trono / Lista de Divindades */
          <View>
            <Text style={styles.subtitle}>Toque em uma divindade para abrir o canal individual direto:</Text>
            {divindades.map((deus) => (
              <TouchableOpacity 
                key={deus.id} 
                style={[styles.deusCard, { borderColor: deus.cor }]} 
                onPress={() => setDeusSelecionado(deus)}
              >
                <View style={styles.rowHeader}>
                  <Text style={[styles.deusNome, { color: deus.cor }]}>{deus.nome}</Text>
                  <Text style={[styles.dotIndicator, { color: deus.cor }]}>●</Text>
                </View>
                <Text style={styles.deusSub}>{deus.subtitulo}</Text>
                <Text style={styles.deusDesc}>{deus.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : abaAtiva === 'Pergaminhos' ? (
          /* Pergaminhos / Missões */
          <View>
            <Text style={styles.subtitle}>📜 Missões e Diretivas Táticas do Panteão</Text>
            {missoes.map((m) => (
              <View key={m.id} style={styles.moduloCard}>
                <Text style={styles.moduloTitulo}>{m.titulo}</Text>
                <Text style={styles.moduloSub}>Atribuído por: {m.deus} | Estado: {m.status}</Text>
              </View>
            ))}
          </View>
        ) : abaAtiva === 'Radar' ? (
          /* Radar / Relatório de Bugs do Thor */
          <View>
            <Text style={styles.subtitle}>⚡ Radar de Bugs do Thor</Text>
            <TextInput 
              style={styles.inputBug} 
              placeholder="Descreva o bug ou falha técnica..." 
              placeholderTextColor="#888" 
              value={bugThor} 
              onChangeText={setBugThor} 
            />
            <TouchableOpacity style={styles.thorButton} onPress={reportarBugThor}>
              <Text style={styles.thorButtonText}>Gerar Plano de Correção com Thor</Text>
            </TouchableOpacity>
            {listaBugs.map((b) => (
              <View key={b.id} style={styles.bugCard}>
                <Text style={styles.bugText}>🐞 Bug: {b.texto}</Text>
                <Text style={styles.bugPlano}>🛠️ {b.plano}</Text>
              </View>
            ))}
          </View>
        ) : (
          /* Rituais / Auditoria Heimdallr */
          <View>
            <Text style={styles.subtitle}>🛡️️ Auditoria 24/7 de Heimdallr</Text>
            <View style={styles.moduloCard}>
              <Text style={styles.moduloTitulo}>Status da Bifrost: Seguro</Text>
              <Text style={styles.moduloSub}>Última verificação de integridade: Concluída sem anomalias no sistema.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 4 },
  headerDot: { color: '#22c55e', fontSize: 12, marginRight: 6 },
  headerTitle: { color: '#94a3b8', fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  mainTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 12 },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 16 },
  tabButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginRight: 8, backgroundColor: '#1e293b' },
  tabButtonActive: { backgroundColor: '#334155' },
  tabText: { color: '#94a3b8', fontSize: 13 },
  tabTextActive: { color: '#ffffff', fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 30 },
  subtitle: { color: '#cbd5e1', fontSize: 14, marginBottom: 12 },
  deusCard: { backgroundColor: '#1e293b', borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deusNome: { fontSize: 16, fontWeight: 'bold' },
  dotIndicator: { fontSize: 14 },
  deusSub: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  deusDesc: { color: '#e2e8f0', fontSize: 13, marginTop: 6 },
  chatContainer: { flex: 1 },
  backButton: { marginBottom: 10 },
  backButtonText: { color: '#38bdf8', fontSize: 14 },
  chatBox: { backgroundColor: '#1e293b', borderRadius: 12, padding: 12, height: 250, marginBottom: 12, justifyContent: 'flex-end' },
  chatEmpty: { color: '#64748b', textAlign: 'center' },
  msgUser: { backgroundColor: '#334155', padding: 8, borderRadius: 8, marginBottom: 6, alignSelf: 'flex-end' },
  msgDeus: { backgroundColor: '#0f172a', padding: 8, borderRadius: 8, marginBottom: 6, alignSelf: 'flex-start' },
  msgText: { color: '#f8fafc', fontSize: 13 },
  inputArea: { flexDirection: 'row' },
  input: { flex: 1, backgroundColor: '#1e293b', color: '#fff', padding: 10, borderRadius: 8, marginRight: 8, borderWidth: 1, borderColor: '#334155' },
  sendButton: { backgroundColor: '#3b82f6', justifyContent: 'center', paddingHorizontal: 16, borderRadius: 8 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  inputBug: { backgroundColor: '#1e293b', color: '#fff', padding: 10, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#334155' },
  thorButton: { backgroundColor: '#ef4444', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  thorButtonText: { color: '#fff', fontWeight: 'bold' },
  bugCard: { backgroundColor: '#1e293b', padding: 10, borderRadius: 8, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: '#ef4444' },
  bugText: { color: '#fff', fontSize: 13 },
  bugPlano: { color: '#cbd5e1', fontSize: 12, marginTop: 4 },
  moduloCard: { backgroundColor: '#1e293b', padding: 12, borderRadius: 8, marginBottom: 8 },
  moduloTitulo: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  moduloSub: { color: '#94a3b8', fontSize: 12, marginTop: 4 }
});
