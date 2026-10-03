import React, { useState, useEffect } from 'react';

const listaAgentes = [
  { id: 'mimir', nome: 'Mímir', funcao: 'Ideias', cor: '#3b82f6', promptRapido: 'Quero ideias inovadoras para o nicho de:' },
  { id: 'freyja', nome: 'Freyja', funcao: 'Conteúdo', cor: '#a855f7', promptRapido: 'Cria uma linha editorial de 3 posts sobre:' },
  { id: 'bragi', nome: 'Bragi', funcao: 'Copywriter', cor: '#eab308', promptRapido: 'Escreve um copy de alta conversão (AIDA) para:' },
  { id: 'loki', nome: 'Loki', funcao: 'Reels', cor: '#ef4444', promptRapido: 'Cria um roteiro viral para Reels com gancho forte sobre:' },
  { id: 'odin', nome: 'Odin', funcao: 'Estrategista', cor: '#06b6d4', promptRapido: 'Analisa o posicionamento estratégico para o projeto:' },
  { id: 'idun', nome: 'Idun', funcao: 'Produtos', cor: '#ec4899', promptRapido: 'Estrutura um infoproduto / e-book rentável sobre:' },
  { id: 'thor', nome: 'Thor', funcao: 'Prompts', cor: '#22c55e', promptRapido: 'Cria um prompt avançado e estruturado para a tarefa:' },
];

export default function App() {
  const [agenteAtivo, setAgenteAtivo] = useState(listaAgentes[0]);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [temperatura, setTemperatura] = useState(0.7);
  const [gravando, setGravando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('chat'); // 'chat' ou 'favoritos'
  const [modoZen, setModoZen] = useState(false);

  const [historicos, setHistoricos] = useState(() => {
    const salvo = localStorage.getItem('panteao_historicos');
    return salvo ? JSON.parse(salvo) : {};
  });

  const [favoritos, setFavoritos] = useState(() => {
    const salvo = localStorage.getItem('panteao_favoritos');
    return salvo ? JSON.parse(salvo) : [];
  });

  const historicoAtual = historicos[agenteAtivo.id] || [];

  useEffect(() => {
    localStorage.setItem('panteao_historicos', JSON.stringify(historicos));
  }, [historicos]);

  useEffect(() => {
    localStorage.setItem('panteao_favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.log('SW erro:', err));
    }
  }, []);

  const mostrarToast = (texto) => {
    setToastMsg(texto);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const enviarMensagem = async (textoPersonalizado) => {
    const textoParaEnviar = textoPersonalizado || mensagem;
    if (!textoParaEnviar.trim()) return;

    const novaMensagemUsuario = { remetente: 'usuario', texto: textoParaEnviar };
    const novoHistorico = [...historicoAtual, novaMensagemUsuario];

    setHistoricos({ ...historicos, [agenteAtivo.id]: novoHistorico });
    if (!textoPersonalizado) setMensagem('');
    setCarregando(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          agenteId: agenteAtivo.id, 
          mensagem: textoParaEnviar,
          temperatura: temperatura 
        })
      });
      const dados = await res.json();
      
      const historicoComResposta = [...novoHistorico, { remetente: 'agente', texto: dados.resposta }];
      setHistoricos(prev => ({ ...prev, [agenteAtivo.id]: historicoComResposta }));
    } catch (err) {
      console.error(err);
      const historicoComErro = [...novoHistorico, { 
        remetente: 'agente', 
        texto: '⚠️ Erro de ligação ao servidor Node.js.', 
        erroEnvio: true, 
        textoOriginal: textoParaEnviar 
      }];
      setHistoricos(prev => ({ ...prev, [agenteAtivo.id]: historicoComErro }));
    } finally {
      setCarregando(false);
    }
  };

  const tentarNovamente = (textoOriginal) => {
    const historicoFiltrado = historicoAtual.slice(0, -1);
    setHistoricos({ ...historicos, [agenteAtivo.id]: historicoFiltrado });
    enviarMensagem(textoOriginal);
  };

  const iniciarGravacao = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('O teu navegador não suporta reconhecimento de voz.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-PT';
    recognition.onstart = () => setGravando(true);
    recognition.onresult = (event) => {
      setMensagem(event.results[0][0].transcript);
      setGravando(false);
    };
    recognition.onerror = () => setGravando(false);
    recognition.onend = () => setGravando(false);
    recognition.start();
  };

  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto);
    mostrarToast('Texto copiado com sucesso!');
  };

  const falarTexto = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-PT';
      window.speechSynthesis.speak(utterance);
    }
  };

  const alternarFavorito = (msg, agenteNome) => {
    const jaExiste = favoritos.some(f => f.texto === msg.texto);
    if (jaExiste) {
      setFavoritos(favoritos.filter(f => f.texto !== msg.texto));
      mostrarToast('Removido dos favoritos');
    } else {
      setFavoritos([...favoritos, { ...msg, agenteNome }]);
      mostrarToast('Adicionado aos favoritos! ⭐');
    }
  };

  const enviarParaWebhook = async (texto, agenteNome) => {
    try {
      await fetch('http://localhost:3000/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, agenteNome })
      });
      mostrarToast('Enviado para o Webhook/Automação!');
    } catch (e) {
      mostrarToast('Erro ao enviar webhook.');
    }
  };

  const exportarFavoritosEmMassa = () => {
    if (favoritos.length === 0) return;
    const conteudo = favoritos.map(f => `[Deus: ${f.agenteNome}]\n${f.texto}\n\n-----------------------------------\n\n`).join('');
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `panteao_favoritos_massa.txt`;
    link.click();
    mostrarToast('Favoritos exportados com sucesso!');
  };

  const limparHistoricoAtual = () => {
    if (window.confirm(`Tens a certeza que queres limpar a conversa com ${agenteAtivo.nome}?`)) {
      setHistoricos({ ...historicos, [agenteAtivo.id]: [] });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#030712', color: '#f9fafb', fontFamily: 'sans-serif', overflow: 'hidden', position: 'relative' }}>
      
      {/* Toast Flutuante */}
      {toastMsg && (
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#d97706', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          {toastMsg}
        </div>
      )}

      {/* Cabeçalho */}
      <div style={{ padding: '8px 10px', borderBottom: '1px solid #1f2937', backgroundColor: '#111827', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: modoZen ? '0' : '6px' }}>
          <h1 style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>PANTEÃO NÓRDICO IA</h1>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button onClick={() => setModoZen(!modoZen)} style={{ background: modoZen ? '#d97706' : 'transparent', border: '1px solid #4b5563', color: '#fff', fontSize: '12px', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}>
              {modoZen ? '🧘 Zen Ativo' : '🧘 Modo Zen'}
            </button>
            <button onClick={() => setAbaAtiva('chat')} style={{ background: abaAtiva === 'chat' ? '#374151' : 'transparent', border: '1px solid #4b5563', color: '#fff', fontSize: '12px', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}>Chat</button>
            <button onClick={() => setAbaAtiva('favoritos')} style={{ background: abaAtiva === 'favoritos' ? '#374151' : 'transparent', border: '1px solid #4b5563', color: '#fff', fontSize: '12px', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}>⭐ Fav ({favoritos.length})</button>
          </div>
        </div>

        {/* Grelha de Deuses */}
        {!modoZen && abaAtiva === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
            {listaAgentes.map((agente, index) => {
              const estaAtivo = agenteAtivo.id === agente.id;
              const aProcessar = carregando && estaAtivo;
              return (
                <button
                  key={agente.id}
                  onClick={() => setAgenteAtivo(agente)}
                  style={{
                    background: estaAtivo ? '#1f2937' : '#030712',
                    border: `1px solid ${estaAtivo ? agente.cor : '#374151'}`,
                    color: '#fff',
                    padding: '6px 4px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    gridColumn: index === 6 ? 'span 3' : 'span 1',
                    opacity: aProcessar ? 0.6 : 1,
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {aProcessar ? '⏳ A pensar...' : agente.nome}
                  </div>
                  <div style={{ fontSize: '10px', opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agente.funcao}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Barra de Controlo e Ações */}
      {abaAtiva === 'chat' && (
        <div style={{ padding: '6px 10px', backgroundColor: '#1f2937', borderBottom: '1px solid #374151', flexShrink: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: agenteAtivo.cor }}>Ativo: {agenteAtivo.nome}</span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#9ca3af' }}>Criatividade:</span>
            <select 
              value={temperatura} 
              onChange={(e) => setTemperatura(e.target.value)}
              style={{ background: '#030712', color: '#fff', border: '1px solid #4b5563', fontSize: '11px', borderRadius: '4px', padding: '2px' }}
            >
              <option value="0.2">Preciso</option>
              <option value="0.7">Equilibrado</option>
              <option value="1.0">Criativo</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '3px' }}>
            {historicoAtual.length > 0 && (
              <button onClick={limparHistoricoAtual} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', fontSize: '11px', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Limpar</button>
            )}
          </div>
        </div>
      )}

      {/* Atalhos Rápidos de Prompt */}
      {abaAtiva === 'chat' && (
        <div style={{ padding: '6px 10px', backgroundColor: '#0b0f19', borderBottom: '1px solid #1f2937', display: 'flex', gap: '6px', overflowX: 'auto', flexShrink: 0 }}>
          <button 
            onClick={() => setMensagem(agenteAtivo.promptRapido + ' ')}
            style={{ background: '#1f2937', border: `1px solid ${agenteAtivo.cor}`, color: '#fff', fontSize: '11px', padding: '5px 10px', borderRadius: '12px', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            ⚡ {agenteAtivo.promptRapido}
          </button>
          <button 
            onClick={() => setMensagem(`Gera 3 opções avançadas com base na perspetiva de ${agenteAtivo.nome}: `)}
            style={{ background: '#1f2937', border: '1px solid #374151', color: '#d1d5db', fontSize: '11px', padding: '5px 10px', borderRadius: '12px', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >
            💡 Gerar 3 Opções
          </button>
        </div>
      )}

      {/* Conteúdo Principal (Chat ou Favoritos) */}
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {abaAtiva === 'chat' ? (
          <>
            {historicoAtual.length === 0 && (
              <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '30px', fontSize: '14px' }}>
                Inicie a tua estratégia com {agenteAtivo.nome}.
              </div>
            )}
            {historicoAtual.map((h, index) => {
              const ehFavorito = favoritos.some(f => f.texto === h.texto);
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: h.remetente === 'usuario' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '88%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    lineHeight: '1.45',
                    backgroundColor: h.remetente === 'usuario' ? '#d97706' : '#1f2937',
                    color: '#fff',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {h.texto}
                  </div>
                  {h.remetente === 'agente' && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {h.erroEnvio ? (
                        <button onClick={() => tentarNovamente(h.textoOriginal)} style={{ background: '#ef4444', border: 'none', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🔄 Tentar Novamente</button>
                      ) : (
                        <>
                          <button onClick={() => copiarTexto(h.texto)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '11px', cursor: 'pointer' }}>📋 Copiar</button>
                          <button onClick={() => falarTexto(h.texto)} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '11px', cursor: 'pointer' }}>🔊 Ouvir</button>
                          <button onClick={() => alternarFavorito(h, agenteAtivo.nome)} style={{ background: 'none', border: 'none', color: ehFavorito ? '#f59e0b' : '#9ca3af', fontSize: '11px', cursor: 'pointer' }}>{ehFavorito ? '⭐ Guardado' : '☆ Guardar'}</button>
                          <button onClick={() => enviarParaWebhook(h.texto, agenteAtivo.nome)} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '11px', cursor: 'pointer' }}>🚀 Webhook</button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {carregando && <div style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>Consultando {agenteAtivo.nome}...</div>}
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '15px', color: '#f59e0b', margin: 0 }}>Favoritos Salvos</h2>
              {favoritos.length > 0 && (
                <button onClick={exportarFavoritosEmMassa} style={{ background: '#d97706', border: 'none', color: '#fff', fontSize: '11px', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>📥 Exportar Todos (.txt)</button>
              )}
            </div>
            {favoritos.length === 0 && <div style={{ fontSize: '14px', color: '#9ca3af' }}>Ainda não tens favoritos salvos.</div>}
            {favoritos.map((fav, i) => (
              <div key={i} style={{ backgroundColor: '#1f2937', padding: '10px 12px', borderRadius: '8px', border: '1px solid #374151' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>Deus: {fav.agenteNome}</div>
                <div style={{ fontSize: '14px', color: '#fff', whiteSpace: 'pre-wrap', marginBottom: '8px' }}>{fav.texto}</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => copiarTexto(fav.texto)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '11px', cursor: 'pointer' }}>📋 Copiar</button>
                  <button onClick={() => setFavoritos(favoritos.filter(f => f.texto !== fav.texto))} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer' }}>🗑️ Remover</button>
                </div>
              </div>
            ))}
          </>
        )}

      </div>

      {/* Caixa de Texto Fixa em Baixo */}
      {abaAtiva === 'chat' && (
        <form onSubmit={(e) => { e.preventDefault(); enviarMensagem(); }} style={{ padding: '8px 10px', borderTop: '1px solid #1f2937', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={iniciarGravacao}
              style={{
                backgroundColor: gravando ? '#ef4444' : '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                padding: '0 12px',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                height: '40px'
              }}
              title="Falar por voz"
            >
              {gravando ? '🔴' : '🎤'}
            </button>
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder={gravando ? 'A ouvir a tua fala...' : `Falar com ${agenteAtivo.nome}...`}
              style={{
                flex: 1,
                backgroundColor: '#030712',
                border: '1px solid #374151',
                borderRadius: '6px',
                padding: '0 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                height: '40px'
              }}
            />
            <button type="submit" style={{
              backgroundColor: '#d97706',
              color: '#fff',
              border: 'none',
              padding: '0 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              height: '40px'
            }}>
              Enviar
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '2px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>{mensagem.length} carateres</span>
          </div>
        </form>
      )}
    </div>
  );
}
