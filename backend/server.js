import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();

// 1. Blindagem de Segurança (Helmet, CORS, Rate Limit)
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5174', 'http://127.0.0.1:5174'],
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { erro: 'Muitos pedidos a partir deste IP. Tente novamente mais tarde.' }
});
app.use('/api/', limiter);
app.use(express.json());

// Inicializar o SDK do Gemini com a chave segura do .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. Função de IA com Fallback e Resiliência (Nunca Falha)
async function gerarRespostaResiliente(prompt, temperatura) {
  // Ordem de tentativa: Primeiro o Pro (Alta Qualidade), depois o Flash (Plano B Rápido)
  const modelos = ['gemini-1.5-pro', 'gemini-1.5-flash'];
  
  for (const nomeModelo of modelos) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: nomeModelo,
        generationConfig: { temperature: parseFloat(temperatura) || 0.7 }
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const texto = response.text();
      
      if (texto) {
        console.log(`✅ Sucesso com o modelo: ${nomeModelo}`);
        return texto;
      }
    } catch (erro) {
      console.warn(`⚠️ Falha no modelo ${nomeModelo}: ${erro.message}. A tentar alternativa...`);
    }
  }
  
  throw new Error('Todos os modelos falharam temporariamente.');
}

// 3. Rota de Chat Integrada e Blindada
app.post('/api/chat', async (req, res) => {
  const { agenteId, mensagem, temperatura } = req.body;

  if (!mensagem || typeof mensagem !== 'string' || mensagem.trim() === '') {
    return res.status(400).json({ erro: 'Mensagem inválida ou vazia.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ erro: 'Chave de API do servidor não configurada no .env.' });
  }

  try {
    // Definir personalidades estratégicas para os deuses
    const systemPromptMap = {
      mimir: 'És o Mímir, o deus da sabedoria e ideias inovadoras. Sê direto, criativo e visionário.',
      freyja: 'És a Freyja, deusa do conteúdo e das linhas editoriais. Foca-te em redes sociais e engajamento.',
      bragi: 'És o Bragi, deus da poesia e copywriter de alta conversão. Domina a técnica AIDA.',
      loki: 'És o Loki, mestre dos Reels, ganchos virais e estratégias fora da caixa.',
      odin: 'És o Odin, o Allfather, o estrategista máximo de negócios e projetos.',
      idun: 'És a Idun, especialista em estruturar infoprodutos e e-books rentáveis.',
      thor: 'És o Thor, mestre na criação de prompts avançados, engenharia de prompts e automação.'
    };

    const contextoDeus = systemPromptMap[agenteId] || 'És um assistente especializado.';
    const promptFinal = `${contextoDeus}\n\nSolicitação do utilizador: ${mensagem}`;

    // Executa com o sistema de resiliência (Pro -> Flash)
    const respostaIA = await gerarRespostaResiliente(promptFinal, temperatura);

    res.json({ resposta: respostaIA });

  } catch (err) {
    console.error('Erro crítico no servidor:', err);
    res.status(500).json({ 
      erro: 'Não foi possível obter resposta da IA neste momento. Tente novamente em instantes.' 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔒 Servidor Inteligente e Resiliente do Panteão Nórdico ativo na porta ${PORT}`);
});
