import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('rituais');
  const [notifAtiva, setNotifAtiva] = useState(true);
  const [inputErro, setInputErro] = useState('');
  const [horas, setHoras] = useState('10');
  const [valorHora, setValorHora] = useState('60');
  const [cliente, setCliente] = useState('');
  const [meioPagamento, setMeioPagamento] = useState('Mercado Pago');
  const [resultado, setResultado] = useState('');
  const [carregando, setCarregando] = useState(false);

  const executarFuncao = (tipo) => {
    setCarregando(true);
    setResultado('');
    setTimeout(() => {
      if (tipo === 'oraculo') {
        setResultado("🛠️ [ORÁCULO DE ERROS - THOR]\nErro analisado.\nSolução: Atualiza as dependências e verifica as variáveis de ambiente.");
      } else if (tipo === 'comercial') {
        const total = parseFloat(horas || '0') * parseFloat(valorHora || '0');
        setResultado(`🎯 [PROPOSTA COMERCIAL - FREYA]\nCliente: ${cliente || 'Parceiro'}\nTotal: R$ ${total.toFixed(2)}\nPagamento: ${meioPagamento}`);
      } else if (tipo === 'mimir') {
        setResultado("📜 [MIMIR - SUPABASE SYNC]\n- Sincronizado com sucesso com a nuvem do Panteão.");
      }
      setCarregando(false);
    }, 800);
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#0B0F19', color: '#FFF', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #1F2937', paddingBottom: '15px' }}>
        <span style={{ color: '#00E676', fontSize: '12px', fontWeight: 'bold' }}>🟢 PANTEÃO NÓRDICO • IA 24/7</span>
        <h1 style={{ fontSize: '18px', margin: '5px 0 0 0' }}>ECOSSISTEMA TOTAL UNIFICADO</h1>
      </div>

      {/* Abas */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '5px' }}>
        {[
          { key: 'rituais', label: '🌙 Rituais' },
          { key: 'oraculo', label: '🛠️ Oráculo' },
          { key: 'comercial', label: '🎯 Comercial' },
          { key: 'mimir', label: '📜 Mimir' }
        ].map((tab) => (
          <button 
            key={tab.key}
            onClick={() => setAbaAtiva(tab.key)}
            style={{
              padding: '10px 16px',
              backgroundColor: abaAtiva === tab.key ? '#3B82F6' : '#1F2937',
              color: '#FFF',
              border: 'none',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1F2937', padding: '20px', borderRadius: '12px' }}>
        {abaAtiva === 'rituais' && (
          <div>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🌙 Notificações & Rituais Diários</h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Recebe previsões e alertas automáticos do Odin.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <span>Ativar Alertas de Odin</span>
              <button 
                onClick={() => setNotifAtiva(!notifAtiva)}
                style={{ padding: '8px 12px', backgroundColor: notifAtiva ? '#10B981' : '#374151', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
              >
                {notifAtiva ? 'Ativo ⚡' : 'Pausado 💤'}
              </button>
            </div>
          </div>
        )}

        {abaAtiva === 'oraculo' && (
          <div>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🛠️ Oráculo de Erros</h3>
            <textarea 
              placeholder="Cola o erro do Termux aqui..." 
              value={inputErro}
              onChange={(e) => setInputErro(e.target.value)}
              style={{ width: '100%', height: '80px', backgroundColor: '#1F2937', color: '#FFF', border: '1px solid #374151', borderRadius: '8px', padding: '10px', boxSizing: 'border-box', marginBottom: '10px' }}
            />
            <button onClick={() => executarFuncao('oraculo')} style={{ width: '100%', padding: '12px', backgroundColor: '#10B981', color: '#0B0F19', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              CONSULTAR ORÁCULO
            </button>
          </div>
        )}

        {abaAtiva === 'comercial' && (
          <div>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>🎯 Calculadora Comercial & ROI</h3>
            <input 
              type="text" 
              placeholder="Nome do Cliente" 
              value={cliente} 
              onChange={(e) => setCliente(e.target.value)}
              style={{ width: '100%', backgroundColor: '#1F2937', color: '#FFF', border: '1px solid #374151', borderRadius: '8px', padding: '10px', boxSizing: 'border-box', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input type="number" placeholder="Horas" value={horas} onChange={(e) => setHoras(e.target.value)} style={{ flex: 1, backgroundColor: '#1F2937', color: '#FFF', border: '1px solid #374151', borderRadius: '8px', padding: '10px' }} />
              <input type="number" placeholder="Valor/Hora (R$)" value={valorHora} onChange={(e) => setValorHora(e.target.value)} style={{ flex: 1, backgroundColor: '#1F2937', color: '#FFF', border: '1px solid #374151', borderRadius: '8px', padding: '10px' }} />
            </div>
            <button onClick={() => executarFuncao('comercial')} style={{ width: '100%', padding: '12px', backgroundColor: '#10B981', color: '#0B0F19', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              GERAR PROPOSTA & ROI
            </button>
          </div>
        )}

        {abaAtiva === 'mimir' && (
          <div>
            <h3 style={{ color: '#60A5FA', marginTop: 0 }}>📜 Pergaminho de Mimir</h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Sincronização de histórico em tempo real.</p>
            <button onClick={() => executarFuncao('mimir')} style={{ width: '100%', padding: '12px', backgroundColor: '#10B981', color: '#0B0F19', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            SINCRONIZAR COM SUPABASE
            </button>
          </div>
        )}

        {carregando && <p style={{ textAlign: 'center', color: '#10B981', marginTop: '15px' }}>Processando canal divino...</p>}

        {resultado && (
          <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#1F2937', border: '1px solid #10B981', borderRadius: '8px', color: '#D1D5DB', whiteSpace: 'pre-line', fontSize: '13px' }}>
            {resultado}
          </div>
        )}
      </div>
    </div>
  );
}
