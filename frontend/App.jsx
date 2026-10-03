import React, { useState } from 'react';

const listaAgentes = [
  { id: 'mimir', nome: 'Mímir', funcao: 'Gerador de Ideias', cor: '#3b82f6' },
  { id: 'freyja', nome: 'Freyja', funcao: 'Criadora de Conteúdo', cor: '#a855f7' },
  { id: 'bragi', nome: 'Bragi', funcao: 'Copywriter', cor: '#eab308' },
  { id: 'loki', nome: 'Loki', funcao: 'Roteirista de Reels', cor: '#ef4444' },
  { id: 'odin', nome: 'Odin', funcao: 'Estrategista de Perfil', cor: '#06b6d4' },
  { id: 'idun', nome: 'Idun', funcao: 'Criadora de Produtos', cor: '#ec4899' },
  { id: 'thor', nome: 'Thor', funcao: 'Engenheiro de Prompts', cor: '#22c55e' },
];

export default function App() {
  const [agenteAtivo, setAgenteAtivo] = useState(listaAgentes[0]);
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagemUsuario = { remetente: 'usuario', texto: mensagem };
    setHistorico((prev) => [...prev, novaMensagemUsuario]);
    setMensagem('');
    setCarregando(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agenteId: agenteAtivo.id, mensagem: novaMensagemUsuario.texto })
      });
      const dados = await res.json();
      setHistorico((prev) => [...prev, { remetente: 'agente', texto: dados.resposta }]);
    } catch (err) {
      console.error(err);
      setHistorico((prev) => [...prev, { remetente: 'agente', texto: 'Erro de ligação ao servidor Node.js na porta 3000.' }]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#030712', color: '#f9fafb', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* Cabeçalho / Seleção de Agentes com scroll horizontal */}
      <div style={{ padding: '10px', borderBottom: '1px solid #1f2937', backgroundColor: '#111827', flexShrink: 0 }}>
        <h1 style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'center', color: '#f59e0b', margin: '0 0 8px 0' }}>PANTEÃO NÓRDICO IA</h1>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {listaAgentes.map((agente) => (
            <button
              key={agente.id}
              onClick={() => { setAgenteAtivo(agente); setHistorico([]); }}
              style={{
                background: agenteAtivo.id === agente.id ? '#1f2937' : '#030712',
                border: `2px solid ${agenteAtivo.id === agente.id ? agente.cor : '#374151'}`,
                color: '#fff',
                padding: '6px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                minWidth: '115px',
                textAlign: 'left',
                flexShrink: 0
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{agente.nome}</div>
              <div style={{ fontSize: '9px', opacity: 0.7 }}>{agente.funcao}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Identidade do Agente Ativo */}
      <div style={{ padding: '8px 12px', backgroundColor: '#1f2937', borderBottom: '1px solid #374151', flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: '14px', color: agenteAtivo.cor }}>{agenteAtivo.nome}</h2>
        <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af' }}>{agenteAtivo.funcao}</p>
      </div>

      {/* Área de Conversa com Scroll */}
      <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {historico.length === 0 && (
          <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '30px', fontSize: '12px' }}>
            Inicie uma conversa com {agenteAtivo.nome} para moldar a sua estratégia.
          </div>
        )}
        {historico.map((h, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: h.remetente === 'usuario' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              lineHeight: '1.4',
              backgroundColor: h.remetente === 'usuario' ? '#d97706' : '#1f2937',
              color: '#fff',
              whiteSpace: 'pre-wrap'
            }}>
              {h.texto}
            </div>
          </div>
        ))}
        {carregando && <div style={{ fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' }}>Consultando os deuses...</div>}
      </div>

      {/* Caixa de Texto Fixa em Baixo */}
      <form onSubmit={enviarMensagem} style={{ padding: '10px', borderTop: '1px solid #1f2937', backgroundColor: '#111827', display: 'flex', gap: '8px', flexShrink: 0 }}>
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder={`Falar com ${agenteAtivo.nome}...`}
          style={{
            flex: 1,
            backgroundColor: '#030712',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '10px',
            color: '#fff',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#d97706',
          color: '#fff',
          border: 'none',
          padding: '0 16px',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '13px',
          cursor: 'pointer'
        }}>
          Enviar
        </button>
      </form>
    </div>
  );
}
