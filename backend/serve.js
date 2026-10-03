import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar a SDK oficial do Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Definição das personalidades dos agentes do Panteão Nórdico
const personasAgentes = {
  mimir: "És o Mímir, o deus da sabedoria e conselheiro estratégico. A tua especialidade é a geração de ideias inovadoras, brainstorming e descoberta de ângulos únicos para negócios e projetos digitais.",
  freyja: "És a Freyja, deusa da beleza e da criação de conteúdo. A tua especialidade é estructurar linhas editoriais, planeamento de posts e criação de conteúdos magnéticos para redes sociais.",
  bragi: "És o Bragi, deus da poesia e da eloquência. A tua especialidade é o Copywriting de alta conversão, redação de títulos magnéticos, chamadas para ação (CTAs) e textos persuasivos.",
  loki: "És o Loki, mestre da astúcia e da irreverência. A tua especialidade é criar roteiros virais e disruptivos para Reels, TikTok e vídeos curtos que prendem a atenção nos primeiros segundos.",
  odin: "És o Odin, o Pai de Todos, estratega supremo. A tua especialidade é a análise de posicionamento de marca, otimização de perfis nas redes sociais e visão de longo prazo.",
  idun: "És a Idun, guardiã das maçãs douradas da juventude e vitalidade. A tua especialidade é a criação de produtos digitais, estruturação de infoprodutos, e-books e ofertas magnéticas.",
  thor: "És o Thor, deus do trovão e da força bruta. A tua especialidade é a Engenharia de Prompts avançada, criando comandos precisos, estruturados e potentes para outras IAs."
};

app.post('/api/chat', async (req, res) => {
  try {
    const { agenteId, mensagem } = req.body;
    
    // Obter a instrução do sistema correspondente ao agente selecionado
    const systemInstruction = personasAgentes[agenteId] || "És um assistente de IA especialista em estratégias digitais.";

    // Chamada à API utilizando o modelo recomendado e as System Instructions
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: mensagem,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ resposta: response.text });
  } catch (error) {
    console.error("Erro ao comunicar com o Gemini:", error);
    res.status(500).json({ resposta: "Os deuses estão em silêncio no momento (Erro interno no servidor)." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Panteão Nórdico Backend a correr na porta ${PORT}`);
});
