import React, { useState } from 'react';

const listaAgentes = [
  { id: 'mimir', nome: 'Mímir', funcao: 'Gerador de Ideias', cor: 'border-blue-500 text-blue-400' },
  { id: 'freyja', nome: 'Freyja', funcao: 'Criadora de Conteúdo', cor: 'border-purple-500 text-purple-400' },
  { id: 'bragi', nome: 'Bragi', funcao: 'Copywriter', cor: 'border-yellow-500 text-yellow-400' },
  { id: 'loki', nome: 'Loki', funcao: 'Roteirista de Reels', cor: 'border-red-500 text-red-400' },
  { id: 'odin', nome: 'Odin', funcao: 'Estrategista de Perfil', cor: 'border-cyan-500 text-cyan-400' },
  { id: 'idun', nome: 'Idun', funcao: 'Criadora de Produtos', cor: 'border-pink-500 text-pink-400' },
  { id: 'thor', nome: 'Thor', funcao: 'Engenheiro de Prompts', cor: 'border-green-500 text-green-400' },
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
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Barra Lateral com os Agentes Nórdicos */}
      <div className="w-80 border-r border-gray-800 p-4 flex flex-col gap-2 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4 text-center tracking-wider text-amber-500">PANTÃO NÓRDICO IA</h1>
        {listaAgentes.map((agente) => (
          <button
            key={agente.id}
            onClick={() => { setAgenteAtivo(agente); setHistorico([]); }}
            className={`p-3 rounded-xl border text-left transition-all ${agenteAtivo.id === agente.id ? `${agente.cor} bg-gray-900` : 'border-gray-800 text-gray-400 hover:bg-gray-900'}`}
          >
            <div className="font-bold">{agente.nome}</div>
            <div className="text-xs opacity-75">{agente.funcao}</div>
          </button>
        ))}
      </div>

      {/* Janela de Chat */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-4 border-b border-gray-800 bg-gray-900/50">
          <h2 className="text-lg font-semibold">{agenteAtivo.nome}</h2>
          <p className="text-xs text-gray-400">{agenteAtivo.funcao}</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {historico.length === 0 && (
            <div className="text-center text-gray-600 mt-20">
              Inicie uma conversa com {agenteAtivo.nome} para moldar sua estratégia.
            </div>
          )}
          {historico.map((h, index) => (
            <div key={index} className={`flex ${h.remetente === 'usuario' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-3 rounded-2xl text-sm whitespace-pre-wrap ${h.remetente === 'usuario' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                {h.texto}
              </div>
            </div>
          ))}
          {carregando && <div className="text-sm text-gray-500 animate-pulse">Consultando os deuses...</div>}
        </div>

        <form onSubmit={enviarMensagem} className="p-4 border-t border-gray-800 bg-gray-900 flex gap-2">
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder={`Digite sua solicitação para ${agenteAtivo.nome}...`}
            className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500"
          />
          <button type="submit" className="bg-amber-600 px-6 py-2 rounded-xl font-bold hover:bg-amber-500 transition-colors">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
